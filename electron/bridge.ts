import { contextBridge, ipcRenderer } from 'electron'

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

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)
