import { Color, ColorCode, color_map, color_codes } from './colors'


export function isNick(jsonResponse: any) {
  return jsonResponse?._internalNick
}

export function calculateLevelFromEXP(exp: number) {
    return (Math.sqrt(exp + 15312.5) - (125 / Math.sqrt(2))) / (25 * Math.sqrt(2))
}

export function roundTo2Digits(number: number) {
  return Math.round(number * 100) / 100
}

export function playerDataExists(user: object) {
  if (user.hasOwnProperty('player')) return true
  return false
}

export function commaify(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export async function checkAPIKey(key: string) {
  const res = await fetch(`https://api.hypixel.net/key?key=${key}`)
  .then(data => data.json())
  .then(data => data.success)

  return res
}

export function checkSettings() {
  const client = window.Main.getSetting('client')

  if (checkAPIKey(window.Main.getSetting('api-key')) && client !== 'none' && window.Main.checkGameDirectory(client)) return true
  return false
}

export function getRank(jsonResponse: any) {
  if (jsonResponse.player.rank) {
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
    jsonResponse.player.monthlyPackageRank &&
    jsonResponse.player.monthlyPackageRank !== 'NONE'
  ) {
    // Check if MVP++
    let plusColor: Color = jsonResponse.player.rankPlusColor
    if (!plusColor) plusColor = 'RED'

    return '&6[MVP' + color_map[plusColor] + "++&6] " + jsonResponse._internalUsername
  } else if (jsonResponse.player.newPackageRank) {
    // Check if VIP...MVP+
    const rank = jsonResponse.player.newPackageRank.replace('_PLUS', '+')

    switch (rank) {
      case 'VIP':
        return '&a[VIP] ' + jsonResponse._internalUsername
      case 'VIP+':
        return '&a[VIP&6+&a] ' + jsonResponse._internalUsername
      case 'MVP':
        return '&b[MVP] ' + jsonResponse._internalUsername
      case 'MVP+':
        let plusColor: Color = jsonResponse.player.rankPlusColor
        if (!plusColor) plusColor = 'RED'
        
        return '&b[MVP' + color_map[plusColor] + '+&b] ' + jsonResponse._internalUsername
    }
  } else {
    // No rank
    return '&7' + jsonResponse._internalUsername
  }
}

export function getRankJSX(user: any) {
  if (user._internalNick) return <span className="nick">{ user._internalUsername }</span>

  /*
  Unnecessary, but I'm not about to rewrite this 
  just to make the CSS override the inline className
  */
  if (!user.player) return <span className="error">{ user._internalUsername }</span>

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