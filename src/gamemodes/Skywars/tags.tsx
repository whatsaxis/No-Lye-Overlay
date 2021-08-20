import { getStarJSX } from './stars'
import { calculateLevelFromEXP, roundTo2Digits, commaify, playerDataExists } from '../../helpers'


enum tags {
    NICK = "NICK",

    EXTREME = "EXTREME",
    VERY_HIGH = "HIGH+",
    HIGH = "HIGH",
    MEDIUM = "MED",
    LOW = "LOW",
    VERY_LOW = "LOW-",
    NONE = "",

    ERROR = "ERROR"
}

enum classTags {
    NICK = "nick",

    EXTREME = "extreme",
    VERY_HIGH = "very-high",
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low",
    VERY_LOW = "very-low",
    NONE = "none",

    ERROR = "error"
}

function filter(playerStats: any) {
    const duelsStats = playerStats?.player?.stats?.SkyWars

    return duelsStats
}

function calculateScore(stats: any) {
    const filtered = filter(stats)

    if (filtered === undefined) return null
    
    let score: number = 0

    const wins = filtered.wins ? filtered.wins : 0
    const kills = filtered.kills ? filtered.kills : 0

    const losses = filtered.losses ? filtered.losses : 1
    const deaths = filtered.deaths ? filtered.deaths : 1


    const wlr = (wins / losses)
    const kdr = (kills / deaths)

    // TODO make for sw
    if (filtered) score = (wins / losses) * ((wlr * 3) + (kdr * 2))

    return { filteredStats: filtered, score: score }
}

function getRowThreatColors(stats: any) {
    // Auto-Filters stats

    const filtered = filter(stats)

    let colors = { winsColor: 'none', killsColor: 'none', wlrColor: 'none', kdrColor: 'none' }

    if (!stats._internalNick) {
        const wins = Number(filtered?.wins)
        const kills = Number(filtered?.kills)
    
        const wlr = (filtered?.wins / filtered?.losses)
        const kdr = (filtered?.kills / filtered?.deaths)

        // Wins

        if (wins <= 100) colors.winsColor = 'very-low'
        else if (wins <= 500) colors.winsColor = 'low'
        else if (wins <= 2000) colors.winsColor = 'medium'
        else if (wins <= 8000) colors.winsColor = 'high'
        else if (wins <= 15000) colors.winsColor = 'very-high'
        else if (wins > 15000) colors.winsColor = 'extreme'
    
        // Kills
        if (kills <= 500) colors.killsColor = 'very-low'
        else if (kills <= 1000) colors.killsColor = 'low'
        else if (kills <= 5000) colors.killsColor = 'medium'
        else if (kills <= 20000) colors.killsColor = 'high'
        else if (kills <= 100000) colors.killsColor = 'very-high'
        else if (kills > 100000) colors.killsColor = 'extreme'
    
        // WLR
        if (wlr <= 0.05) colors.wlrColor = 'very-low'
        else if (wlr <= 0.1) colors.wlrColor = 'low'
        else if (wlr <= 0.25) colors.wlrColor = 'medium'
        else if (wlr <= 0.4) colors.wlrColor = 'high'
        else if (wlr <= 1) colors.wlrColor = 'very-high'
        else if (wlr > 1) colors.wlrColor = 'extreme'
    
        // KDR
        if (kdr <= 1) colors.kdrColor = 'very-low'
        else if (kdr <= 1.5) colors.kdrColor = 'low'
        else if (kdr <= 2) colors.kdrColor = 'medium'
        else if (kdr <= 4) colors.kdrColor = 'high'
        else if (kdr <= 8) colors.kdrColor = 'very-high'
        else if (kdr > 8) colors.kdrColor = 'extreme'
    } 

    return colors
}

export function getTag(stats: any) {
    const rowColors = getRowThreatColors(stats)

    const base = { wins: '', kills: '', wlr: '', kdr: '', star: '', score: '', ...rowColors }

    if (!/^[a-zA-Z0-9_]*$/.test(stats._internalUsername) || stats.success === false) return { tag: tags.ERROR, classTag: classTags.ERROR, ...base }
    if (stats._internalNick === true) return { tag: tags.NICK, classTag: classTags.NICK, ...base }

    if (playerDataExists(stats)) {
        const scoreFunc = calculateScore(stats)

        // Checking if its null in case none of the stats don't exist
        if (scoreFunc === null) return { tag: tags.ERROR, classTag: classTags.ERROR, ...base }


        const filteredStats = scoreFunc?.filteredStats
        const score = scoreFunc?.score

        const wins = filteredStats.wins ? filteredStats.wins : 0
        const kills = filteredStats.kills ? filteredStats.kills : 0

        const losses = filteredStats.losses ? filteredStats.losses : 1
        const deaths = filteredStats.deaths ? filteredStats.deaths : 1

        const wlr = (wins / losses)
        const kdr = (kills / deaths)

        const star = getStarJSX(filteredStats.levelFormatted)

        // Base object
        const base2 = { wins: commaify(wins), kills: commaify(kills), wlr: commaify(roundTo2Digits(wlr)), kdr: commaify(roundTo2Digits(kdr)), score: commaify(roundTo2Digits(score)), star: star, ...rowColors }
        
        // Threat check
        if (score <= 0.2) return { tag: tags.NONE, classTag: classTags.NONE, ...base2 }
        else if (score <= 0.6) return { tag: tags.VERY_LOW, classTag: classTags.VERY_LOW, ...base2 }
        else if (score <= 1.4) return { tag: tags.LOW, classTag: classTags.LOW, ...base2 }
        else if (score <= 2) return { tag: tags.MEDIUM, classTag: classTags.MEDIUM, ...base2 }
        else if (score <= 3.5) return { tag: tags.HIGH, classTag: classTags.HIGH, ...base2 }
        else if (score <= 8) return { tag: tags.VERY_HIGH, classTag: classTags.VERY_HIGH, ...base2 }
        else if (score > 8  ) return { tag: tags.EXTREME, classTag: classTags.EXTREME, ...base2 }
        else return { tag: tags.ERROR, classTag: classTags.ERROR, ...base2 }  // For safety - unlikely this will get executed!
    } 
}