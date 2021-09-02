import { Color, color_map } from '../../colors'
import { colorCodesToJSX } from '../../helpers'


interface Title {
    name: string
    color: Color
    min: number
    increment: number,
    bold: boolean
}

const titles: Title[] = [
    {
        name: 'Rookie',
        color: 'DARK_GRAY',
        min: 50 * 2,
        increment: 10 * 2,
        bold: false
    },
    {
        name: 'Iron',
        color: 'WHITE',
        min: 100 * 2,
        increment: 30 * 2,
        bold: false
    },
    {
        name: 'Gold',
        color: 'GOLD',
        min: 250 * 2,
        increment: 50 * 2,
        bold: false
    },
    {
        name: 'Diamond',
        color: 'DARK_AQUA',
        min: 500 * 2,
        increment: 100 * 2,
        bold: false
    },
    {
        name: 'Master',
        color: 'DARK_GREEN',
        min: 1000 * 2,
        increment: 200 * 2,
        bold: false
    },
    {
        name: 'Legend',
        color: 'DARK_RED',
        min: 2000 * 2,
        increment: 600 * 2,
        bold: false
    },
    {
        name: 'Grandmaster',
        color: 'YELLOW',
        min: 5000 * 2,
        increment: 1000 * 2,
        bold: true
    },
    {
        name: 'Godlike',
        color: 'DARK_PURPLE',
        min: 10000 * 2,
        increment: Infinity,
        bold: true
    }
]

export function getTitleJSX(wins: number) {
    for (const t of titles) {
        const max = t.min + (t.increment * 5)

        if (wins >= t.min && wins < max) {
            const title = colorCodesToJSX(color_map.GOLD + "☆ " + color_map[t.color] + t.name)

            if (t.bold === true) {
                return <span style={{ fontWeight: "bold" }}>{ title }</span>
            } else return title
        }

        if (wins === max && titles.indexOf(t) !== titles.length - 1) {
            const next = titles[titles.indexOf(t) + 1]
            return colorCodesToJSX(color_map.GOLD + "☆ " + color_map[next.color] + next.name)
        }
    }
}