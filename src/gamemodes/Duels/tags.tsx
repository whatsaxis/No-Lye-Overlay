import { ColumnImplemenetation } from '../../columns'

import { Tag, ClassTags } from '../../tags'

import {
  calculateLevelFromEXP,
  getRankJSX,
  _,
} from '../../helpers'

import { Player } from '../../useUsers'
import { getTitleJSX } from './title'


enum Column {
  HEAD = 'HEAD',
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

      const wins = _(player.stats?.player?.stats?.Duels?.wins)

      if (
        calculateLevelFromEXP(player.stats?.player?.networkExp) <= 15 &&
        wins <= 50
      )
        return Tag.SNIPER

      const score = calculateScore(player)

      if (score < 3) return Tag.NONE
      if (score <= 5) return Tag.VERY_LOW
      if (score <= 10) return Tag.LOW
      if (score <= 15) return Tag.MEDIUM
      if (score <= 25) return Tag.HIGH
      if (score <= 50) return Tag.VERY_HIGH
      if (score > 50) return Tag.EXTREME

      return Tag.ERROR
    },
    getClassName: (player: Player) => {
      if (player.nick === true) return ClassTags.NICK

      const wins = _(player.stats?.player?.stats?.Duels?.wins)

      if (
        calculateLevelFromEXP(player.stats?.player?.networkExp) <= 15 &&
        wins <= 50
      )
        return ClassTags.SNIPER

      const score = calculateScore(player)

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
    getValue: (player: Player) => {
      return getRankJSX(player)
    },
  },
  [Column.WINS]: {
    displayName: 'Wins',
    getValue: (player: Player) => {
      return _(player.stats?.player?.stats?.Duels?.wins)
    },
    thresholds: [500, 1000, 2500, 7500, 12500, 20000],
    format: true,
  },
  [Column.KILLS]: {
    displayName: 'Kills',
    getValue: (player: Player) => {
      return _(player.stats?.player?.stats?.Duels?.kills)
    },
    thresholds: [500, 1000, 2500, 7500, 10000, 17500],
    format: true,
  },
  [Column.WLR]: {
    displayName: 'WLR',
    getValue: (player: Player) => {
      const wins = _(player.stats?.player?.stats?.Duels?.wins)
      const losses = player.stats?.player?.stats?.Duels?.losses

      return wins / (losses ? losses : 1)
    },
    thresholds: [1, 2.5, 4.5, 6, 12.5, 15],
    format: true,
  },
  [Column.KDR]: {
    displayName: 'KDR',
    getValue: (player: Player) => {
      const kills = _(player.stats?.player?.stats?.Duels?.kills)
      const deaths = player.stats?.player?.stats?.Duels?.deaths

      return kills / (deaths ? deaths : 1)
    },
    thresholds: [1.5, 2.5, 4.5, 6, 8.5, 15],
    format: true,
  },
  [Column.WS]: {
    displayName: 'WS',
    getValue: (player: Player) => {
      return _(player.stats?.player?.stats?.Duels?.current_winstreak)
    },
    thresholds: [5, 10, 15, 30, 80, 150],
    format: true,
  },
  [Column.BWS]: {
    displayName: 'BWS',
    getValue: (player: Player) => {
      return _(player.stats?.player?.stats?.Duels?.best_overall_winstreak)
    },
    thresholds: [10, 20, 40, 75, 120, 200],
    format: true,
  },
  [Column.TITLE]: {
    displayName: 'Title',
    getValue: (player: Player) => {
      return getTitleJSX(_(player.stats?.player?.stats?.Duels?.wins))
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
  const duelsStats = player.stats?.player?.stats?.Duels

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
  if (player.nick === false) {
    score = (wins / losses) * ((wins < 1250 && wlr >= 6) || (wins < 5000 && wlr >= 4.5)
        ? (wlr + kdr) / 3
        : wlr + kdr)
  }

  return score
}
