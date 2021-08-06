import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer' // Remove in production
import { app, BrowserWindow, ipcMain } from 'electron'

const Store = require('electron-store')

import Logs from './logs'

import { Installation } from './settings'

/*
File stuff
*/

const path = require('path')
const fs = require('fs')
const os = require('os')

const logsPath = path.join(require('minecraft-folder-path'), 'logs')

const folderPath = path.join(os.homedir(), '/duels_overlay')
const configPath = path.join(folderPath, 'config.json')

// Initialize Storage

const schema = {
  username: {
    type: 'string',
    default: '',
  },
  client: {
    type: 'string',
    default: 'vanilla',
  },
  logs_dir: {
    type: 'string',
    default: logsPath,
  },
  api_key: {
    type: 'string',
    default: '',
  },
}

const storage = new Store({ schema })

// Initialize Logs

let users: string[] = []

const logs = new Logs(storage.get('logs_dir'))

// Initialize Electron Window

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'assets', 'icon.png'), // TODO fix this
    width: 1100,
    height: 700,
    minWidth: 800,
    minHeight: 400,
    // backgroundColor: '#191622',
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow.setOpacity(0.85)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })

  // Window Control API

  ipcMain.on('close-window', event => {
    mainWindow?.close()
  })

  ipcMain.on('reframe-window', event => {
    if (!mainWindow) return

    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })

  ipcMain.on('minimize-window', event => {
    mainWindow?.minimize()
  })

  // Settings API

  ipcMain.on('set-setting', (event, data) => {
    console.log(data)
    storage.set(data.setting, data.value)
  })

  ipcMain.on('get-setting', (event, setting: string) => {
    event.returnValue = storage.get(setting)
  })

  ipcMain.on('check-game-dir', (event, installation: Installation) => {
    if (installation === 'vanilla') {
      fs.access(logsPath.replaceAll("\\", "/"), (err: Error) => {
        event.reply( 'check-game-dir-reply', err ? false : true )
      })
    } else if (installation === 'lunar') {
      fs.access(path.join(os.homedir(), "/.lunarclient/offline/1.8/logs").replaceAll("\\", "/"), (err: Error) => {
        event.reply( 'check-game-dir-reply', err ? false : true )
      })
    } else if (installation === 'badlion') {
      fs.access(path.join(logsPath, "blclient/minecraft").replaceAll("\\", "/"), (err: Error) => {
        event.reply( 'check-game-dir-reply', err ? false : true )
      })
    } else if (installation === 'pvplounge') {
      fs.access(path.join(logsPath, "../../.pvplounge/logs").replaceAll("\\", "/"), (err: Error) => {
        event.reply( 'check-game-dir-reply', err ? false : true )
      })
    }
  })

  // ipcMain.on('check-game-dir', (event, installation: Installation) => {

  //   let installationExists: boolean

  //   switch (installation) {
  //     case 'vanilla':
  //       installationExists = fs.existsSync(
  //         path.join(logsPath, 'latest.log').replaceAll('\\', '/')
  //       )
  //     case 'lunar':
  //       installationExists = fs.existsSync(
  //         path
  //           .join(os.homedir(), '/.lunarclient/offline/1.8/logs/latest.log')
  //           .replaceAll('\\', '/')
  //       )
  //     case 'badlion':
  //       installationExists = fs.existsSync(
  //         path
  //           .join(logsPath, 'blclient/minecraft/latest.log')
  //           .replaceAll('\\', '/')
  //       )
  //     case 'pvplounge':
  //       installationExists = fs.existsSync(
  //         path
  //           .join(logsPath, '../../.pvplounge/logs/latest.log')
  //           .replaceAll('\\', '/')
  //       )
  //   }

  //   return installationExists
  // })

  ipcMain.on('get-game-dir', (event, installation: Installation) => {
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
    }
  })

  // Logs API

  logs.on('server_change', () => {
    users = []

    mainWindow?.webContents.send('server_change', users)
  })

  logs.on('join', (name: string) => {
    users.push(name)

    mainWindow?.webContents.send('join', users)
  })

  logs.on('leave', (name: string) => {
    users = users.filter(user => user != name)

    mainWindow?.webContents.send('leave', users)
  })
}

function installReactDevTools() {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err))
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .then(installReactDevTools) // Remove in production
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
