// https://api.hypixel.net/player?name=whatsaxis&key=2e464480-4967-40e9-bcd6-a255e578392b

export const colors = {
  DARK_RED: '#AA0000',
  RED: '#FF5555',
  GOLD: '#FFAA00',
  YELLOW: '#FFFF55',
  DARK_GREEN: '#00AA00',
  GREEN: '#55FF55',
  AQUA: '#55FFFF',
  DARK_AQUA: '#00AAAA',
  DARK_BLUE: '#0000AA',
  BLUE: '#5555FF',
  LIGHT_PURPLE: '#FF55FF',
  DARK_PURPLE: '#AA00AA',
  WHITE: '#FFFFFF',
  GRAY: '#AAAAAA',
  DARK_GREY: '#555555',
  BLACK: '#000000',
}

export const color_codes = {
  '&0': '#000000',
  '&1': '#0000AA',
  '&2': '#00AA00',
  '&3': '#00AAAA',
  '&4': '#AA0000',
  '&5': '#AA00AA',
  '&6': '#FFAA00',
  '&7': '#AAAAAA',
  '&8': '#555555',
  '&9': '#5555FF',
  '&a': '#55FF55',
  '&b': '#55FFFF',
  '&c': '#FF5555',
  '&d': '#FF55FF',
  '&e': '#FFFF55',
  '&f': '#FFFFFF',
}

export const color_map = {
  DARK_RED: '&4',
  RED: '&c',
  GOLD: '&6',
  YELLOW: '&e',
  DARK_GREEN: '&2',
  GREEN: '&a',
  AQUA: '&b',
  DARK_AQUA: '&3',
  DARK_BLUE: '&1',
  BLUE: '&9',
  LIGHT_PURPLE: '&d',
  DARK_PURPLE: '&5',
  WHITE: '&f',
  GRAY: '&7',
  DARK_GRAY: '&8',
  BLACK: '&0',
}

export type Color =
  | 'DARK_RED'
  | 'RED'
  | 'GOLD'
  | 'YELLOW'
  | 'DARK_GREEN'
  | 'GREEN'
  | 'AQUA'
  | 'DARK_AQUA'
  | 'DARK_BLUE'
  | 'BLUE'
  | 'LIGHT_PURPLE'
  | 'DARK_PURPLE'
  | 'GRAY'
  | 'DARK_GRAY'
  | 'BLACK'
  | 'WHITE'

export type ColorCode =
  | '&0'
  | '&1'
  | '&2'
  | '&3'
  | '&4'
  | '&5'
  | '&6'
  | '&7'
  | '&8'
  | '&9'
  | '&a'
  | '&b'
  | '&c'
  | '&d'
  | '&e'
  | '&f'