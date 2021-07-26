import { contextBridge, ipcRenderer } from 'electron'

import { Installation } from './settings'


export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The API can accessed using `window.Main._____`
   */

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

  setSetting: (setting: string, value: any) => {
    ipcRenderer.send('set-setting', { setting: setting, value: value })
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

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },
}

contextBridge.exposeInMainWorld('Main', api)
