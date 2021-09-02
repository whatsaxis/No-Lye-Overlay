import { ThreatLevels, threatLevelList } from './tags'
import { commaify, roundTo2Digits } from './helpers'
import { Player } from './useUsers'


export type ColumnImplemenetation = {
    displayName: string
    getValue: Function,
    getClassName?: Function,
    thresholds?: [
        number,
        number,
        number,
        number,
        number,
        number
    ],
    format?: boolean
}

export function generateFirstRow(columns: { [c: string]: ColumnImplemenetation }) {
    return (
        <tr>
            {
                Object.values(columns).map(column => <td key={ column.displayName }>{ column.displayName }</td>)
            }
        </tr>
    )
}

export function parseColumns(player: Player, columns: Record<string, ColumnImplemenetation>) {
    const dataValues = Object.values(columns).map(column => {
        let bracket: string = ThreatLevels.NONE
        let className: string | null = null

        const value = column.getValue(player)
        
        if (column.getClassName !== undefined) {
            className = column.getClassName(player)
        }

        if (column.thresholds !== undefined) {
            const thresholdMap = column.thresholds.map((threshold, i) => [threshold, i + 1])

            for (const [threshold, i] of thresholdMap.reverse()) {
                if (value >= threshold) {
                    bracket = threatLevelList[i as number]
                    break
                }
            }
        }

        return (
            <td className={ [bracket, className].join(" ") } key={ column.displayName }>
                {
                    column.format === true ?
                    commaify(roundTo2Digits(value))
                    :
                    value
                }
            </td>
        )
    })

    return (
        <tr>
            {
                dataValues.map(v => v)
            }
        </tr>
    )
}