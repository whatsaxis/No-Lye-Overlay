const EventEmitter = require('events')

const fs = require('fs')

class Logs extends EventEmitter {
  constructor(path: string) {
    super()

    this.path = path + '/latest.log'
    this.watch()
  }

  setPath = (path: string) => {
    fs.unwatchFile(this.path)
    this.path = path
    this.watch()
  }

  watch = () => {
    let lastLog: any[] = []
    let logs: any[] = []
    let changedLogs: any[] = []

    fs.watchFile(
      this.path,
      { persistent: true, interval: 4 },
      (curr: any, prev: any) => {
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

            if (/Sending you to (.*)!/.test(message)) {
              console.log(message)

              this.emit('server_change')
            }

            if (/(.*) joined \((\d)\/(\d)\)!/.test(message)) {
              const name = message.split(' ')[0]
              console.log(name + ' has joined!')

              this.emit('join', name)
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
