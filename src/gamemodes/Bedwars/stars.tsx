
import { Color, color_map } from '../../colors'
import { colorCodesToJSX } from '../../helpers'


interface Prestige {
    min: number
    max: number
    color: Color | Function
}

const prestiges: Prestige[] = [
    {
        min: 0,
        max: 99,
        color: "GRAY"
    },
    {
        min: 100,
        max: 199,
        color: "WHITE"
    },
    {
        min: 200,
        max: 299,
        color: "GOLD"
    },
    {
        min: 300,
        max: 399,
        color: "AQUA"
    },
    {
        min: 400,
        max: 499,
        color: "DARK_GREEN"
    },
    {
        min: 500,
        max: 599,
        color: "DARK_AQUA"
    },
    {
        min: 600,
        max: 699,
        color: "DARK_RED"
    },
    {
        min: 700,
        max: 799,
        color: "LIGHT_PURPLE"
    },
    {
        min: 800,
        max: 899,
        color: "DARK_BLUE"
    },
    {
        min: 900,
        max: 999,
        color: "DARK_PURPLE"
    },
    {
        min: 999,
        max: Infinity,
        color: (star: number) => {
            const colors = [
                color_map.RED,
                color_map.GOLD,
                color_map.YELLOW,
                color_map.GREEN,
                color_map.AQUA,
                color_map.LIGHT_PURPLE,
                color_map.DARK_PURPLE
            ]

            const format = `[${ star }✫]`

            const split = [...format]

            let splitCounter = 0
            let colorCounter = 0

            for (const char of split) {
                if (colorCounter === colors.length - 1) colorCounter = 0

                split[splitCounter] = colors[colorCounter] + char

                splitCounter++
                colorCounter++
            }

            return split.join('')
        }
    },
]

export function getStarJSX(star: number) {
    for (const pres of prestiges) {
        if (star >= pres.min && star <= pres.max) {
            if (!(typeof pres.color === 'function')) {
                return colorCodesToJSX(color_map[pres.color] + `[${ star }✫]`)
            } else {
                return colorCodesToJSX(pres.color(star))
            }
        }
    }
}