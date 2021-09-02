import { Color, ColorCode, ExtensionCode, color_map, color_codes, extension_map } from './colors'
import { Player } from './useUsers'


/*
* Player Data
*/

export function calculateLevelFromEXP(exp: number) {
    return (Math.sqrt(exp + 15312.5) - (125 / Math.sqrt(2))) / (25 * Math.sqrt(2))
}

export function roundTo2Digits(number: number) {
  return Math.round(number * 100) / 100
}

export function commaify(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function existsOrZero(stat: any) {
  return stat ? stat : 0
}


/*
* Shortcut function for existsOrZero()
*/

export function _(stat: any) {
  return existsOrZero(stat)
}

/*
* Settings
*/

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

/*
* Color
*/

export function colorCodesToJSX(colorCodeString: string) {
  let currentColor: ColorCode | null = null
  let appliedExtensionStyles: ExtensionCode[] = []

  let segments: JSX.Element[] = []

  const splitColorCodeString = colorCodeString?.split('&')

  splitColorCodeString?.forEach((segment: string, index: number) => {
      const color: string = ("&" + segment[0])
      
      if (extension_map.hasOwnProperty(color)) {
        if (color === '&r') {
          appliedExtensionStyles = []
          currentColor = null
        } else {
          appliedExtensionStyles.push(extension_map[color as ExtensionCode] as ExtensionCode)
        }
      } else {
        currentColor = color as ColorCode
      }

      
      let tmp = currentColor
      let extTmp = appliedExtensionStyles.map(style => extension_map[style])

      if (currentColor === null) tmp = '&f'
      segments.push(<span style={{
        color: color_codes[tmp as ColorCode],
        fontWeight: extTmp.includes('bold') ? 'bold' : 'normal',
        fontStyle: extTmp.includes('italic') ? 'italic' : 'normal',

      }}>{ segment.slice(1) }</span>)
  })

  return (
    <>
    {
      segments.map(segment => segment)
    }
    </>
  )
}

export function getRank(player: Player) {
  console.log(player)
  if (player.stats?.player?.rank) {
    // Check for special ranks (YOUTUBE, ADMIN, etc.)
    if (player.stats.player.rank === 'YOUTUBER') {
      return '&c[&fYOUTUBE&c] ' + player.username
    } else if (player.stats.player.rank === 'ADMIN') {
      return '&c[ADMIN] ' + player.username
    } else if (player.stats.player.rank === 'MOJANG') {
      return '&6[MOJANG] ' + player.username
    } else {
      return '&7' + player.username
    }
  } else if (
    player.stats?.player?.monthlyPackageRank &&
    player.stats?.player?.monthlyPackageRank !== 'NONE'
  ) {
    // Check if MVP++
    let plusColor: Color = player.stats.player.rankPlusColor
    if (!plusColor) plusColor = 'RED'

    return '&6[MVP' + color_map[plusColor] + "++&6] " + player.username
  } else if (player.stats?.player?.newPackageRank) {
    // Check if VIP...MVP+
    const rank = player.stats.player.newPackageRank.replace('_PLUS', '+')

    switch (rank) {
      case 'VIP':
        return '&a[VIP] ' + player.username
      case 'VIP+':
        return '&a[VIP&6+&a] ' + player.username
      case 'MVP':
        return '&b[MVP] ' + player.username
      case 'MVP+':
        let plusColor: Color = player.stats.player.rankPlusColor
        if (!plusColor) plusColor = 'RED'

        return '&b[MVP' + color_map[plusColor] + '+&b] ' + player.username
    }
  } else {
    // No rank
    return '&7' + player.username
  }
}

export function getRankJSX(player: Player) {
  if (player.nick) return <span className="nick">{ player.username }</span>

  /*
  Unnecessary, but I'm not about to rewrite this 
  just to make the CSS override the inline className
  */
  // if (!player.stats.player) return <span className="error">{ player.username }</span>

  const rank = getRank(player)

  return colorCodesToJSX(rank === undefined ? '&7' + player.username : rank)
}

export interface LooseObject {
  [key: string]: any
}