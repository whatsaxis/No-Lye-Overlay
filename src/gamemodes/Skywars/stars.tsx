import { colorCodesToJSX } from '../../helpers'

export function getStarJSX(rankFormatted: string) {
    return colorCodesToJSX(rankFormatted.replaceAll("§", "&"))
}