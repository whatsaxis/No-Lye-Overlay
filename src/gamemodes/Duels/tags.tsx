export enum tags {
    NICK,
    SNIPER,

    EXTREME,
    HIGH,

    ERROR
}

function filter(playerStats: any) {
    const duelsStats = playerStats.player.stats.duels

    return duelsStats
}

export function calculateScore(stats: any) {
    const filtered = filter(stats)

    console.log(filtered)

    let score: Number

    const wins = filtered.wins
    const losses = filtered.losses

    const wlr = (filtered.wins * filtered.losses)
    const kdr = (filtered.kills * filtered.deaths)

    score = (wins / losses) * (wlr * kdr)

    return score
}

export function getTag(stats: any) {
    if (stats._internalNick) return tags.NICK

    const score = calculateScore(stats)

    return score


}