export class API {
  key: string

  constructor(key: string) {
    this.key = key
  }

  set setKey(key: string) {
    this.key = key
  }

  getUUID(username: string) {
    return fetch(`https://api.ashcon.app/mojang/v2/user/${username}`)
    .then(data => data.json())
    .then(data => data.uuid)
  }

  checkNick(username: string) {
    return fetch(`https://api.ashcon.app/mojang/v2/user/${username}`)
    .then(data => data.json())
    .then(data => {
      if (data.code === 404) {
        return true
      } else {
        return false
      }
    })
  }

  async getStats(uuid: string) {
    const url = `https://api.hypixel.net/player?uuid=${uuid}&key=${this.key}`

    console.log(url)
    let stats = fetch(url).then(data => data.json())

    return stats
  }
}
