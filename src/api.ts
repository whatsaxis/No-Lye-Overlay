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

  async getStats(username: string, filter: Function | null = null) {
    const uuid = await this.getUUID(username)

    const url = `https://api.hypixel.net/player?uuid=${uuid}&key=${this.key}`


    let stats = fetch(url).then(data => data.json())

    if (filter !== null) {
      stats = filter(stats)
    }

    return stats
  }
}
