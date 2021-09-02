import { logsPath } from './main'
import { Installation } from './settings'

const path = require('path')
const os = require('os')


export function getGameDirectory(installation: Installation) {
    switch (installation) {
      case 'vanilla':
        return logsPath.replaceAll('\\', '/')
      case 'lunar':
        return path
          .join(os.homedir(), '/.lunarclient/offline/1.8/logs')
          .replaceAll('\\', '/')
      case 'badlion':
        return path.join(logsPath, 'blclient/minecraft').replaceAll('\\', '/')
      case 'pvplounge':
        return path
          .join(logsPath, '../../.pvplounge/logs')
          .replaceAll('\\', '/')
      case 'none':
        return null
    }
}