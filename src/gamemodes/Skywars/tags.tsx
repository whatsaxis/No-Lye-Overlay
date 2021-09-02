import { ColumnImplemenetation } from '../../columns'

import { Tag, ClassTags } from '../../tags'

import {
  getRankJSX,
  _,
} from '../../helpers'

import { getStarJSX } from './stars'
import { Player } from '../../useUsers'


enum Column {
  HEAD = 'HEAD',
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
  [Column.HEAD]: {
    displayName: '',
    getValue: (player: Player) => {
      return player.skin
    }
  },
  [Column.TAG]: {
    displayName: 'Tag',
    getValue: (player: Player) => {
      if (player.nick === true) return Tag.NICK

      const score = calculateScore(player)

      if (score < 0.2) return Tag.NONE
      if (score <= 0.6) return Tag.VERY_LOW
      if (score <= 1.4) return Tag.LOW
      if (score <= 2.5) return Tag.MEDIUM
      if (score <= 6.5) return Tag.HIGH
      if (score <= 10) return Tag.VERY_HIGH
      if (score > 10) return Tag.EXTREME

      return Tag.ERROR
    },
    getClassName: (player: Player) => {
      if (player.nick === true) return ClassTags.NICK

      const score = calculateScore(player)

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
    getValue: (player: Player) => {
      return getRankJSX(player)
    },
  },
  [Column.WINS]: {
    displayName: 'Wins',
    getValue: (player: Player) => {
      return _(player.stats?.player?.stats?.SkyWars?.wins)
    },
    thresholds: [100, 500, 2500, 5000, 8000, 12500],
    format: true,
  },
  [Column.KILLS]: {
    displayName: 'Kills',
    getValue: (player: Player) => {
      return _(player.stats?.player?.stats?.SkyWars?.kills)
    },
    thresholds: [500, 1000, 5000, 15000, 30000, 75000],
    format: true,
  },
  [Column.WLR]: {
    displayName: 'WLR',
    getValue: (player: Player) => {
      const wins = _(player.stats?.player?.stats?.SkyWars?.wins)
      const losses = player.stats?.player?.stats?.SkyWars?.losses

      return wins / (losses ? losses : 1)
    },
    thresholds: [0.05, 0.1, 0.25, 0.4, 0.65, 1],
    format: true,
  },
  [Column.KDR]: {
    displayName: 'KDR',
    getValue: (player: Player) => {
      const kills = _(player.stats?.player?.stats?.SkyWars?.kills)
      const deaths = player.stats?.player?.stats?.SkyWars?.deaths

      return kills / (deaths ? deaths : 1)
    },
    thresholds: [1, 1.5, 4, 6, 8, 10],
    format: true,
  },
  [Column.WS]: {
    displayName: 'WS',
    getValue: (player: Player) => {
      return _(player.stats?.player?.stats?.SkyWars?.win_streak)
    },
    thresholds: [1, 3, 5, 8, 15, 25],
    format: true,
  },
  [Column.STAR]: {
    displayName: 'Star',
    getValue: (player: Player) => {
      return getStarJSX(player.stats?.player?.stats?.SkyWars?.levelFormatted)
    },
  },
  [Column.SCORE]: {
    displayName: 'Score',
    getValue: (player: Player) => {
      return calculateScore(player)
    },
    format: true,
  },
}

function calculateScore(player: Player) {
  const skywarsStats = player.stats?.player?.stats?.SkyWars

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
  if (player.nick === false) score = (wins / losses) * ((wlr * 3) + (kdr * 2))

  return score
}
