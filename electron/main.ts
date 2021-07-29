import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';  // Remove in production
import { app, BrowserWindow, ipcMain } from 'electron'

import { Installation } from './constants'

const Store = require('electron-store');

const path = require('path')
const fs = require('fs')
const os = require('os')


/*
File stuff
*/

const logsPath = path.join(require("minecraft-folder-path"), "logs")

const schema = {
  username: {
    type: 'string',
    default: ''
  },
  client: {
    type: 'string',
    default: 'vanilla'
  },
  logs_dir: {
    type: 'string',
    default: logsPath
  },
  api_key: {
    type: 'string',
    default: ''
  }
}

const storage = new Store({ schema });

/*
Electron Initialization
*/

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow () {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'assets', 'icon.png'),  // TODO fix this
    width: 1100,
    height: 700,
    minWidth: 800,
    minHeight: 400,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow.setOpacity(0.85);

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners () {
  // Window Control API

  ipcMain.on('close-window', (event) => {
    if (mainWindow) mainWindow.close();
  })

  ipcMain.on('reframe-window', (event) => {
    if (!mainWindow) return;

    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })
  
  ipcMain.on('minimize-window', (event) => {
    if (mainWindow) mainWindow.minimize();
  })

  // Settings API

  ipcMain.on('set-setting', (event, data) => {
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

  ipcMain.on('get-game-dir', (event, installation: Installation) => {
    if (installation === 'vanilla')   event.reply( 'get-game-dir-reply', logsPath.replaceAll("\\", "/") )
    if (installation === 'lunar')     event.reply( 'get-game-dir-reply', path.join(os.homedir(), "/.lunarclient/offline/1.8/logs").replaceAll("\\", "/") )
    if (installation === 'badlion')   event.reply( 'get-game-dir-reply', path.join(logsPath, "blclient/minecraft").replaceAll("\\", "/") )
    if (installation === 'pvplounge') event.reply( 'get-game-dir-reply', path.join(logsPath, "../../.pvplounge/logs").replaceAll("\\", "/") )
  })
}

function installReactDevTools () {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .then(installReactDevTools)  // Remove in production
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
