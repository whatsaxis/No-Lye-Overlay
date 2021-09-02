import { contextBridge, ipcRenderer } from 'electron'


import { Installation, StorageKey } from './settings'


export const api = {
  // Window Control API

  closeWindow: () => {
    ipcRenderer.send('close-window')
  },

  reframeWindow: () => {
    ipcRenderer.send('reframe-window')
  },

  minimizeWindow: () => {
    ipcRenderer.send('minimize-window')
  },

  // Settings API

  setSetting: (setting: StorageKey) => {
    ipcRenderer.send('set-setting', setting)
  },

  getSetting: (setting: string) => {
    // For future reference:
    // https://betterprogramming.pub/how-to-return-a-response-from-asynchronous-calls-in-javascript-d20e6f49651b

    let response = ipcRenderer.sendSync('get-setting', setting)
    return response
  },

  checkGameDirectory: async (installation: Installation) => {
      // For future reference:
      // https://betterprogramming.pub/how-to-return-a-response-from-asynchronous-calls-in-javascript-d20e6f49651b

      ipcRenderer.send('check-game-dir', installation)

      let response

      async function awaitResponse() {
        return new Promise((resolve, reject) => {
          ipcRenderer.once('check-game-dir-reply', (event, data) => {
            resolve(data)
          })
        })
      }

      response = await awaitResponse()

      return response
  },

  getGameDirectory: async (installation: Installation) => {
    ipcRenderer.send('get-game-dir', installation)

      let response

      async function awaitResponse() {
        return new Promise((resolve, reject) => {
          ipcRenderer.once('get-game-dir-reply', (event, data) => {
            resolve(data)
          })
        })
      }

      response = await awaitResponse()

      return response
  },

  // Appearance

  setTransparency: (transparency: number) => {
    ipcRenderer.send('set-transparency', transparency)
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_: Electron.IpcRendererEvent, data: any) => callback(_, data))
  },

  removeListener: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
  }
}

contextBridge.exposeInMainWorld('Main', api)