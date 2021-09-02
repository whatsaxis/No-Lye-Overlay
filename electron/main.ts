// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
// } from 'electron-devtools-installer'

import { app, BrowserWindow, ipcMain } from 'electron'

const Store = require('electron-store')
import readline from 'readline'
import TailFile from '@logdna/tail-file'

import { Installation, StorageKey } from './settings'
import { getGameDirectory } from './helpers'

const isDev = require('electron-is-dev')
console.log(isDev)
/*
File stuff
*/

const path = require('path')
const { promises: fs } = require('fs')
const os = require('os')

export const logsPath = path.join(require('minecraft-folder-path'), 'logs')

// Initialize Storage

const schema = {
  'username': {
    type: 'string',
    default: '',
  },
  'client': {
    type: 'string',
    default: 'none',
  },
  'api-key': {
    type: 'string',
    default: '',
  },
  'transparency': {
    type: 'number',
    maximum: 1,
		minimum: 0,
		default: 0.9
  }
}

/*
Initialize Storage

This array is so that we cannot set random settings that
won't be used and will help avoid mis-spellings
*/

export const storage = new Store({ schema })

// Initialize Logs

let logFileTail: TailFile | null = null
let logFileReadline: readline.Interface | null = null

// Initialize Electron Window

let mainWindow: BrowserWindow | null = null 

const gotTheLock = app.requestSingleInstanceLock()
    
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, '../assets', 'icon.png'),
    title: 'No Lye Overlay',
    width: 1250,
    height: 700,
    minWidth: 600,
    minHeight: 600,
    backgroundColor: '#03030F',
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: isDev ? path.resolve(__dirname, 'bridge.js') : path.resolve(__dirname, '../../../', 'app/bridge.js'),
    },
  })

  mainWindow.loadFile(isDev ? path.join('../', 'public/index.html') : path.join('../../', 'public/index.html'))
  mainWindow.setOpacity(storage.get('transparency'))

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function startLogging() {
  // Reset logging
  logFileReadline?.close()
  logFileReadline = null

  await logFileTail?.quit()
  logFileTail = null

  console.log(path.join(getGameDirectory(storage.get('client')), 'latest.log'))

  // Restart it
  logFileTail = new TailFile( path.join(getGameDirectory(storage.get('client')), 'latest.log') )
  await logFileTail.start()

  logFileReadline = readline.createInterface({
    input: logFileTail
  })

  if (logFileTail !== null) {
    await logFileTail.start()

    logFileReadline.on('line', (log) => {
      console.log(log)
      setImmediate(() => {
        if (/\[[^]*\] \[Client thread\/INFO\]: \[CHAT\] [^]*/.test(log)) {
          // console.log(log)
          mainWindow?.webContents.executeJavaScript(`console.log('${log}')`)
    
          const message = log.split('[CHAT] ')[1].trim()
    
          if (/Sending you to (.*)!/.test(message)) {
            console.log('════════════ Server Change ════════════')
            mainWindow?.webContents.send('server_change')
          }

          if (new RegExp(`${ storage.get('username') } has joined \\((\\d|\\d\\d)\\/(\\d|\\d\d)\\)!`).test(message)) {
            console.log('User joined lobby')
            mainWindow?.webContents.send('server_change')
          }
    
          if (/^ONLINE: ((?:(?:\[[A-Z+]+\] )?[A-Za-z0-9_]{1,16}(?:, )?)+)$/.test(message)) {
            console.log('Used /who!')
            const list = message.split(': ')[1]
            const users = list.split(', ')

            mainWindow?.webContents.send('who', users)
          }

          if (/(.*) has joined \((\d|\d\d)\/(\d|\d\d)\)!/.test(message)) {
            const name = message.split(' ')[0]
    
            console.log(name + ' has joined!')
    
            mainWindow?.webContents.send('join', name)
          }
    
          if (/(.*) has quit!/.test(message)) {
            const name = message.split(' ')[0]
            console.log(name + ' has left!')
    
            mainWindow?.webContents.send('leave', name)
          }
        }
      })
    })
  }
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

    /*
    Amazing "testing suite"
    */
   
    // const users = ['WhatsAxis', 'chbv', 'hypixel', 'Shrek', 'Espenode', 'anrie', 'lifelong', 'rrawrxd', 'BlackJaguar', 'xOleg', 'okdub', 'SkywarsKills', 'diboof', 'Lokesnoke', 'chbv', 'MCVisuals', 'Codies', 'Quadrupled', 'the_sad_sea', 'e-asdas87duy90asud0======']

    // for (const user of users) {
    //   mainWindow?.webContents.send('join', user)
    // }
  })

  ipcMain.on('minimize-window', event => {
    mainWindow?.minimize()
  })

  // Settings API

  ipcMain.on('set-setting', async (event, data: StorageKey) => {
    if (data.name === 'client' && data.value !== 'none') {
      storage.set(data.name, data.value)

      await startLogging()
    } else {
      storage.set(data.name, data.value)
    }
  })

  ipcMain.on('get-setting', (event, setting: StorageKey) => {
    event.returnValue = storage.get(setting)
  })

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
  })

  ipcMain.on('get-game-dir', async (event, installation: Installation) => {
    event.reply('get-game-dir-reply', getGameDirectory(installation))
  })

  // Appearance

  ipcMain.on('set-transparency', (event, transparency: number) => {
    mainWindow?.setOpacity(transparency)
  })

  // Logs API

  const client = storage.get('client') 
  if (client !== 'none') {
    await startLogging()
  }
}

  // function installReactDevTools() {
  //   installExtension(REACT_DEVELOPER_TOOLS)
  //     .then(name => console.log(`Added Extension:  ${name}`))
  //     .catch(err => console.log('An error occurred: ', err))
  // }

  app
    .on('ready', createWindow)
    .whenReady()
    .then(registerListeners)
    // .then(isDev ? installReactDevTools : () => {})
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
