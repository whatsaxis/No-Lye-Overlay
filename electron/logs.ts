const EventEmitter = require('events')

const fs = require('fs')

import { storage } from './main'

class Logs extends EventEmitter {
  constructor(path: string) {
    super()

    this.path = path + '/latest.log'
    this.watch()
  }

  setPath = (path: string) => {
    fs.unwatchFile(this.path)
    console.log('Unwatched File: ' +  this.path)
    this.path = path + '/latest.log'
    console.log(this.path)
    this.watch()
  }

  watch = () => {
    if (this.path === 'null') return
    console.log('Watching File: ' + this.path)

    let lastLog: any[] = []
    let logs: any[] = []
    let changedLogs: any[] = []

    fs.watchFile(
      this.path,
      { persistent: false, interval: 4 },
      (curr: any, prev: any) => {
        if (this.path === 'null/latest.log') return

        console.log('Change in log file')
        const logFile = fs.readFileSync(this.path, { encoding: 'utf8' })

        logs = logFile.split('\n')

        if (lastLog.length > 0) {
          for (let i = 0; i < logs.length; i++) {
            if (logs[i] != lastLog[i]) {
              changedLogs.push(logs[i])
            }
          }
        }

        lastLog = logs

        for (const log of changedLogs) {
          if (/\[[^]*\] \[Client thread\/INFO\]: \[CHAT\] [^]*/.test(log)) {
            const message = log.split('[CHAT] ')[1].trim()

            console.log(message)
            // console.log(`${ storage.get('username') } joined the lobby!`)
            // console.log(`${ storage.get('username') } has joined \((\d)\/(\d)\)!`)
            if (/Sending you to (.*)!/.test(message)) {
              console.log(message)

              this.emit('server_change')
            }

            if (/(.*) has joined \((\d)\/(\d|\d\d)\)!/.test(message)) {
              const name = message.split(' ')[0]

              console.log(name + ' has joined!')

              this.emit('join', name)
            }

            if (message === "YOU WON! Want to play again? CLICK HERE!") {
              console.log('Game ended with win')
              this.emit('server_change')
            }

            if (/(.*) has quit!/.test(message)) {
              const name = message.split(' ')[0]
              console.log(name + ' has left!')

              this.emit('leave', name)
            }
          }
        }

        changedLogs = []
      }
    )
  }
}

export default Logs