import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';  // Remove in production
import { app, BrowserWindow, ipcMain } from 'electron'

import { Installation } from './settings'

/*
File stuff
*/

const path = require('path')
const fs = require('fs')
const os = require('os')


const logsPath = path.join(require("minecraft-folder-path"), "logs")

const folderPath = path.join(os.homedir(), "/duels_overlay")
const configPath = path.join(folderPath, "config.json")


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
    // backgroundColor: '#191622',
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
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })


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
    console.log(data)
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
