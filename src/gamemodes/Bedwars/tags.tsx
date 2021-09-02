import { ColumnImplemenetation } from '../../columns'

import { Tag, ClassTags } from '../../tags'

import {
  calculateLevelFromEXP,
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
  FINAL_KILLS = 'F. KILLS',
  WLR = 'WLR',
  FKDR = 'FKDR',
  WS = 'WS',
  STAR = 'STAR',
  INDEX = 'INDEX',
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

      const wins = _(player.stats?.player?.stats?.Bedwars?.wins_bedwars)

      const fkills = _(player.stats?.player?.stats?.Bedwars?.final_kills_bedwars)
      const fdeaths = player.stats?.player?.stats?.Bedwars?.final_deaths_bedwars
      const fkdr = fkills / (fdeaths ? fdeaths : 1)

      if (
        calculateLevelFromEXP(player.stats?.player?.networkExp) <= 15 &&
        wins < 50 &&
        fkills < 100 &&
        fkdr <= 1
      )
        return Tag.SNIPER

      const index = calculateIndex(player)

      if (index < 250) return Tag.NONE
      if (index <= 750) return Tag.VERY_LOW
      if (index <= 1000) return Tag.LOW
      if (index <= 3500) return Tag.MEDIUM
      if (index <= 8500) return Tag.HIGH
      if (index <= 17500) return Tag.VERY_HIGH
      if (index > 17500) return Tag.EXTREME

      return Tag.ERROR
    },
    getClassName: (player: Player) => {
      if (player.nick === true) return ClassTags.NICK

      const wins = _(player.stats?.player?.stats?.Bedwars?.wins_bedwars)

      const fkills = _(player.stats?.player?.stats?.Bedwars?.final_kills_bedwars)
      const fdeaths = player.stats?.player?.stats?.Bedwars?.final_deaths_bedwars
      const fkdr = fkills / (fdeaths ? fdeaths : 1)

      if (
        calculateLevelFromEXP(player.stats?.player?.networkExp) <= 15 &&
        wins < 50 &&
        fkills < 100 &&
        fkdr <= 1
      )
        return ClassTags.SNIPER

      const index = calculateIndex(player)

      if (index < 250) return ClassTags.NONE
      if (index <= 750) return ClassTags.VERY_LOW
      if (index <= 1000) return ClassTags.LOW
      if (index <= 3500) return ClassTags.MEDIUM
      if (index <= 8500) return ClassTags.HIGH
      if (index <= 17500) return ClassTags.VERY_HIGH
      if (index > 17500) return ClassTags.EXTREME

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
      return _(player.stats?.player?.stats?.Bedwars?.wins_bedwars)
    },
    thresholds: [250, 750, 1500, 3000, 7500, 10000],
    format: true,
  },
  [Column.FINAL_KILLS]: {
    displayName: 'F. Kills',
    getValue: (player: Player) => {
      return _(player.stats?.player?.stats?.Bedwars?.final_kills_bedwars)
    },
    thresholds: [500, 1000, 3000, 7500, 10000, 25000],
    format: true,
  },
  [Column.WLR]: {
    displayName: 'WLR',
    getValue: (player: Player) => {
      const wins = _(player.stats?.player?.stats?.Bedwars?.wins_bedwars)
      const losses = player.stats?.player?.stats?.Bedwars?.losses_bedwars

      return wins / (losses ? losses : 1)
    },
    thresholds: [1, 1.5, 2, 5, 8, 12.5],
    format: true,
  },
  [Column.FKDR]: {
    displayName: 'FKDR',
    getValue: (player: Player) => {
      const fkills = _(player.stats?.player?.stats?.Bedwars?.final_kills_bedwars)
      const fdeaths = player.stats?.player?.stats?.Bedwars?.final_deaths_bedwars

      return fkills / (fdeaths ? fdeaths : 1)
    },
    thresholds: [0.8, 1.5, 2.5, 5, 8, 15],
    format: true,
  },
  [Column.WS]: {
    displayName: 'WS',
    getValue: (player: Player) => {
      return _(player.stats?.player?.stats?.Bedwars?.winstreak)
    },
    thresholds: [5, 10, 15, 30, 80, 150],
    format: true,
  },
  [Column.STAR]: {
    displayName: 'Star',
    getValue: (player: Player) => {
      const star = player.stats?.player?.achievements?.bedwars_level
      return getStarJSX(star ? star : 1)
    },
  },
  [Column.INDEX]: {
    displayName: 'Index',
    getValue: (player: Player) => {
      return calculateIndex(player)
    },
    format: true,
  },
}

function calculateIndex(player: Player) {
  const bwStats = player.stats?.player?.stats?.Bedwars

  let index: number = 0

  const fkills = _(bwStats?.final_kills_bedwars)
  const fdeaths = bwStats?.final_deaths_bedwars
    ? bwStats?.final_deaths_bedwars
    : 1

  const fkdr = fkills / fdeaths

  /*
  * Calculating Index
  * Index = Star * (FKDR ^ 2)
  */
  if (player.nick === false) index = player.stats?.player?.achievements?.bedwars_level * fkdr ** 2

  return index
}
