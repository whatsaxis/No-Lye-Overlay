import { ColumnImplemenetation } from '../../columns'

import { Tag, ClassTags } from '../../tags'

import {
  getRankJSX,
  _,
} from '../../helpers'

import { getStarJSX } from './stars'

enum Column {
  TAG = 'TAG',
  NAME = 'NAME',
  WINS = 'WINS',
  KILLS = 'KILLS',
  WLR = 'WLR',
  KDR = 'KDR',
  WS = 'WS',
  STAR = 'STAR',
  SCORE = 'SCORE',
}

export const columns: { [c: string]: ColumnImplemenetation } = {
  [Column.TAG]: {
    displayName: 'Tag',
    getValue: (stats: any) => {
      if (stats._internalNick === true) return Tag.NICK

      const score = calculateScore(stats)

      if (score < 0.2) return Tag.NONE
      if (score <= 0.6) return Tag.VERY_LOW
      if (score <= 1.4) return Tag.LOW
      if (score <= 2.5) return Tag.MEDIUM
      if (score <= 6.5) return Tag.HIGH
      if (score <= 10) return Tag.VERY_HIGH
      if (score > 10) return Tag.EXTREME

      return Tag.ERROR
    },
    getClassName: (stats: any) => {
      if (stats._internalNick === true) return ClassTags.NICK

      const score = calculateScore(stats)

      if (score < 0.2) return ClassTags.NONE
      if (score <= 0.6) return ClassTags.VERY_LOW
      if (score <= 1.4) return ClassTags.LOW
      if (score <= 2.5) return ClassTags.MEDIUM
      if (score <= 6.5) return ClassTags.HIGH
      if (score <= 10) return ClassTags.VERY_HIGH
      if (score > 10) return ClassTags.EXTREME

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
      return _(stats?.player?.stats?.SkyWars?.wins)
    },
    thresholds: [100, 500, 2500, 5000, 8000, 12500],
    format: true,
  },
  [Column.KILLS]: {
    displayName: 'Kills',
    getValue: (stats: any) => {
      return _(stats?.player?.stats?.SkyWars?.kills)
    },
    thresholds: [500, 1000, 5000, 15000, 30000, 75000],
    format: true,
  },
  [Column.WLR]: {
    displayName: 'WLR',
    getValue: (stats: any) => {
      const wins = _(stats?.player?.stats?.SkyWars?.wins)
      const losses = stats?.player?.stats?.SkyWars?.losses

      return wins / (losses ? losses : 1)
    },
    thresholds: [0.05, 0.1, 0.25, 0.4, 0.65, 1],
    format: true,
  },
  [Column.KDR]: {
    displayName: 'KDR',
    getValue: (stats: any) => {
      const kills = _(stats?.player?.stats?.SkyWars?.kills)
      const deaths = stats?.player?.stats?.SkyWars?.deaths

      return kills / (deaths ? deaths : 1)
    },
    thresholds: [1, 1.5, 4, 6, 8, 10],
    format: true,
  },
  [Column.WS]: {
    displayName: 'WS',
    getValue: (stats: any) => {
      return _(stats?.player?.stats?.SkyWars?.win_streak)
    },
    thresholds: [1, 3, 5, 8, 15, 25],
    format: true,
  },
  [Column.STAR]: {
    displayName: 'Star',
    getValue: (stats: any) => {
      return getStarJSX(stats?.player?.stats?.SkyWars?.levelFormatted)
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
  const skywarsStats = stats?.player?.stats?.SkyWars

  let score: number = 0

  const wins = _(skywarsStats?.wins)
  const losses = skywarsStats?.losses
    ? skywarsStats?.losses
    : 1

  const wlr = wins / losses

  const kills = _(skywarsStats?.kills)
  const deaths = skywarsStats?.deaths
    ? skywarsStats?.deaths
    : 1

  const kdr = kills / deaths

  /*
  * Calculating Score
  * Score = (wins / losses) * ((WLR * 3) + (KDR * 2))
  */
  if (stats) score = (wins / losses) * ((wlr * 3) + (kdr * 2))

  return score
}
