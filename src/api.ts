export class API {
  key: string

  constructor(key: string) {
    this.key = key
  }

  set setKey(key: string) {
    this.key = key
  }

  async getUUID(username: string) {
    const res = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`)
    .then(data => data.json())
    .then(data => data.uuid)

    return res
  }

  async checkNick(username: string) {
    const res = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`)
    .then(data => data.json())

    if (res.code === 404) return true
    return false
  }

  async getStats(uuid: string) {
    const url = `https://api.hypixel.net/player?uuid=${uuid}&key=${this.key}`

    let stats = await fetch(url).then(data => data.json())

    return stats
  }
}
