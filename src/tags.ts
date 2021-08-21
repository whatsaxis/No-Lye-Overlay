export enum Tag {
  NICK = 'NICK',
  SNIPER = 'SNPR',

  EXTREME = 'EXTREME',
  VERY_HIGH = 'HIGH+',
  HIGH = 'HIGH',
  MEDIUM = 'MED',
  LOW = 'LOW',
  VERY_LOW = 'LOW-',
  NONE = '',

  ERROR = 'ERROR',
}

export enum ClassTags {
  NICK = 'nick',
  SNIPER = 'sniper',

  EXTREME = 'extreme',
  VERY_HIGH = 'very-high',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  VERY_LOW = 'very-low',
  NONE = 'none',

  ERROR = 'error',
}

export enum ThreatLevels {
  EXTREME = 'extreme',
  VERY_HIGH = 'very-high',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  VERY_LOW = 'very-low',
  NONE = 'none',
}

export const threatLevelList = ['none', 'very-low', 'low', 'medium', 'high', 'very-high', 'extreme']