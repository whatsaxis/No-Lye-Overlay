import { ColumnImplemenetation } from '../../columns'

import { Tag, ClassTags } from '../../tags'

import {
  calculateLevelFromEXP,
  getRankJSX,
  _,
} from '../../helpers'

import { getTitleJSX } from './title'

enum Column {
  TAG = 'TAG',
  NAME = 'NAME',
  WINS = 'WINS',
  KILLS = 'KILLS',
  WLR = 'WLR',
  KDR = 'KDR',
  WS = 'WS',
  BWS = 'BWS',
  TITLE = 'TITLE',
  SCORE = 'SCORE',
}

export const columns: { [c: string]: ColumnImplemenetation } = {
  [Column.TAG]: {
    displayName: 'Tag',
    getValue: (stats: any) => {
      if (stats._internalNick === true) return Tag.NICK

      const wins = _(stats?.player?.stats?.Duels?.wins)

      if (
        calculateLevelFromEXP(stats?.player?.networkExp) <= 15 &&
        wins <= 50
      )
        return Tag.SNIPER

      const score = calculateScore(stats)

      if (score < 3) return Tag.NONE
      if (score <= 5) return Tag.VERY_LOW
      if (score <= 10) return Tag.LOW
      if (score <= 15) return Tag.MEDIUM
      if (score <= 25) return Tag.HIGH
      if (score <= 50) return Tag.VERY_HIGH
      if (score > 50) return Tag.EXTREME

      return Tag.ERROR
    },
    getClassName: (stats: any) => {
      if (stats._internalNick === true) return ClassTags.NICK

      const wins = _(stats?.player?.stats?.Duels?.wins)

      if (
        calculateLevelFromEXP(stats?.player?.networkExp) <= 15 &&
        wins <= 50
      )
        return ClassTags.SNIPER

      const score = calculateScore(stats)

      if (score < 3) return ClassTags.NONE
      if (score <= 5) return ClassTags.VERY_LOW
      if (score <= 10) return ClassTags.LOW
      if (score <= 15) return ClassTags.MEDIUM
      if (score <= 25) return ClassTags.HIGH
      if (score <= 50) return ClassTags.VERY_HIGH
      if (score > 50) return ClassTags.EXTREME

      return ClassTags.ERROR
    },
  },
  [Column.NAME]: {
    displayName: 'Name',
    getValue: (stats: any) => {
      return getRankJSX(stats)
    },
  },
  [Column.WINS]: {
    displayName: 'Wins',
    getValue: (stats: any) => {
      return _(stats?.player?.stats?.Duels?.wins)
    },
    thresholds: [500, 1000, 2500, 7500, 12500, 20000],
    format: true,
  },
  [Column.KILLS]: {
    displayName: 'Kills',
    getValue: (stats: any) => {
      return _(stats?.player?.stats?.Duels?.kills)
    },
    thresholds: [500, 1000, 2500, 7500, 10000, 17500],
    format: true,
  },
  [Column.WLR]: {
    displayName: 'WLR',
    getValue: (stats: any) => {
      const wins = _(stats?.player?.stats?.Bedwars?.wins_bedwars)
      const losses = stats?.player?.stats?.Bedwars?.losses_bedwars

      return wins / (losses ? losses : 1)
    },
    thresholds: [1, 2.5, 4.5, 6, 12.5, 15],
    format: true,
  },
  [Column.KDR]: {
    displayName: 'KDR',
    getValue: (stats: any) => {
      const kills = _(stats?.player?.stats?.Duels?.kills)
      const deaths = stats?.player?.stats?.Duels?.deaths

      return kills / (deaths ? deaths : 1)
    },
    thresholds: [1.5, 2.5, 4.5, 6, 8.5, 15],
    format: true,
  },
  [Column.WS]: {
    displayName: 'WS',
    getValue: (stats: any) => {
      return _(stats?.player?.stats?.Duels?.current_winstreak)
    },
    thresholds: [5, 10, 15, 30, 80, 150],
    format: true,
  },
  [Column.BWS]: {
    displayName: 'BWS',
    getValue: (stats: any) => {
      return _(stats?.player?.stats?.Duels?.best_overall_winstreak)
    },
    thresholds: [10, 20, 40, 75, 120, 200],
    format: true,
  },
  [Column.TITLE]: {
    displayName: 'Title',
    getValue: (stats: any) => {
      return getTitleJSX(_(stats?.player?.stats?.Duels?.wins))
    },
  },
  [Column.SCORE]: {
    displayName: 'Score',
    getValue: (stats: any) => {
      return calculateScore(stats)
    },
    format: true,
  },
}

function calculateScore(stats: any) {
  const duelsStats = stats?.player?.stats?.Duels

  let score: number = 0

  const wins = _(duelsStats?.wins)
  const losses = duelsStats?.losses
    ? duelsStats?.losses
    : 1

  const wlr = wins / losses

  const kills = _(duelsStats?.kills)
  const deaths = duelsStats?.deaths
    ? duelsStats?.deaths
    : 1

  const kdr = kills / deaths

  /*
  * Calculating Score
  * Score = (wins / losses) * (wlr + kdr OR (wlr + kdr) / 3 IF High WLR and low Wins)
  */
  if (stats) {
    score = (wins / losses) * ((wins < 1250 && wlr >= 6) || (wins < 5000 && wlr >= 4.5)
        ? (wlr + kdr) / 3
        : wlr + kdr)
  }

  return score
}
