import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer' // Remove in production
import { app, BrowserWindow, ipcMain } from 'electron'

const Store = require('electron-store')

import Logs from './logs'

import { Installation, StorageKey } from './settings'
import { getGameDirectory } from './helpers'

/*
File stuff
*/

const path = require('path')
const { promises: fs } = require('fs')
const os = require('os')

export const logsPath = path.join(require('minecraft-folder-path'), 'logs')

// Initialize Storage

const schema = {
  username: {
    type: 'string',
    default: '',
  },
  client: {
    type: 'string',
    default: 'none',
  },
  'api-key': {
    type: 'string',
    default: '',
  },
}

/*
Initialize Storage

This array is so that we cannot set random settings that
won't be used and will help avoid mis-spellings
*/

export const storage = new Store({ schema })

// Initialize Logs

const logs = new Logs(getGameDirectory(storage.get('client')))

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
    icon: path.join(__dirname, '../assets', 'icon.png'), // TODO fix this
    width: 1100,
    height: 700,
    minWidth: 800,
    minHeight: 400,
    backgroundColor: '#03030F',
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow.setOpacity(0.85)

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners() {
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

    // mainWindow?.webContents.send('join', 'WhatsAxis')
    // mainWindow?.webContents.send('join', 'chbv')
    // mainWindow?.webContents.send('join', 'rrawrxd')
  })

  ipcMain.on('minimize-window', event => {
    mainWindow?.minimize()
  })

  // Settings API

  ipcMain.on('set-setting', (event, data: StorageKey) => {
    if (data.name === 'client' && data.value !== 'none') {
      storage.set(data.name, data.value)
      logs.setPath( getGameDirectory(data.value as Installation) )
    } else {
      storage.set(data.name, data.value)
    }
  })

  ipcMain.on('get-setting', (event, setting: StorageKey) => {
    event.returnValue = storage.get(setting)
  })

  // Fix this!
  ipcMain.on('check-game-dir', async (event, installation: Installation) => {
    const checkIfExists = async (path: string) => {
      let cleanPath = path.replaceAll('\\', '/')

      try {
        await fs.access(cleanPath)
        return true
      } catch {
        return false
      }
    }

    let exists

    switch (installation) {
      case 'vanilla':
        exists = await checkIfExists(logsPath)
        event.reply('check-game-dir-reply', exists)
        break
      case 'lunar':
        exists = await checkIfExists(path.join(os.homedir(), '/.lunarclient/offline/1.8/logs'))
        event.reply('check-game-dir-reply', exists)
        break
      case 'badlion':
        exists = await checkIfExists(path.join(logsPath, 'blclient/minecraft'))
        event.reply('check-game-dir-reply', exists)
        break
      case 'pvplounge':
        exists = await checkIfExists(path.join(logsPath, '../../.pvplounge/logs'))
        event.reply('check-game-dir-reply', exists)
        break
    }
    //   const exists = await checkIfExists(path.join(logsPath, 'latest.log'))
    //   event.reply('check-game-dir-reply', exists)
    // } else if (installation === 'lunar') {
    //   const exists = await checkIfExists(path.join(os.homedir(), '/.lunarclient/offline/1.8/logs/latest.log'))
    //   event.reply('check-game-dir-reply', exists)
    // } else if (installation === 'badlion') {
    //   const exists = await checkIfExists(path.join(logsPath, 'blclient/minecraft/latest.log'))
    //   event.reply('check-game-dir-reply', exists)
    // } else if (installation === 'pvplounge') {
    //   const exists = await checkIfExists(path.join(logsPath, '../../.pvplounge/logs/latest.log')))
    //   event.reply('check-game-dir-reply', exists)
    // }
  })

  ipcMain.on('get-game-dir', async (event, installation: Installation) => {
    event.reply('get-game-dir-reply', getGameDirectory(installation))
  })

  // Logs API

  logs.on('server_change', () => {
    mainWindow?.webContents.send('server_change')
  })

  logs.on('join', (name: string) => {
    mainWindow?.webContents.send('join', name)
  })

  logs.on('leave', (name: string) => {
    mainWindow?.webContents.send('leave', name)
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
