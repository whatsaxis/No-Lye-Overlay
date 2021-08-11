import { Color, ColorCode, color_map, color_codes } from './colors'


export function isNick(jsonResponse: any) {
  return jsonResponse?._internalNick
}

export function getRank(jsonResponse: any) {
  if (jsonResponse?.player?.rank) {
    // Check for special ranks (YOUTUBE, ADMIN, etc.)
    if (jsonResponse.player.rank === 'YOUTUBER') {
      return '&c[&fYOUTUBE&c] ' + jsonResponse._internalUsername
    } else if (jsonResponse.player.rank === 'ADMIN') {
      return '&c[ADMIN] ' + jsonResponse._internalUsername
    } else if (jsonResponse.player.rank === 'MOJANG') {
      return '&6[MOJANG] ' + jsonResponse._internalUsername
    } else {
      return '&7' + jsonResponse._internalUsername
    }
  } else if (
    jsonResponse?.player?.monthlyPackageRank &&
    jsonResponse?.player?.monthlyPackageRank !== 'NONE'
  ) {
    // Check if is MVP++
    const plusColor: Color = jsonResponse.player.rankPlusColor 
    return '&6[MVP' + color_map[plusColor] + "++&6] " + jsonResponse._internalUsername
  } else if (jsonResponse?.player?.newPackageRank) {
    // Check if is VIP...MVP+
    const rank = jsonResponse.player.newPackageRank.replace('_PLUS', '+')

    switch (rank) {
      case 'VIP':
        return '&a[VIP] ' + jsonResponse._internalUsername
      case 'VIP+':
        return '&a[VIP&6+&a] ' + jsonResponse._internalUsername
      case 'MVP':
        return '&b[MVP] ' + jsonResponse._internalUsername
      case 'MVP+':
        const plusColor: Color = jsonResponse.player.rankPlusColor 
        return '&b[MVP' + color_map[plusColor] + '+&b] ' + jsonResponse._internalUsername
    }
  } else {
    return '&7' + jsonResponse?._internalUsername
  }
}

export function getRankJSX(user: any) {
  const rank = getRank(user)

  let segments: JSX.Element[] = []
  rank?.split('&').forEach((segment: string) => {
      const color: ColorCode = "&" + segment[0] as ColorCode
      segments.push(<span style={{ color: color_codes[color] }}>{ segment.slice(1) }</span>)
  })

  return (
    <>
    {
      segments.map(segment => segment)
    }
    </>
  )
}

export interface LooseObject {
  [key: string]: any
}