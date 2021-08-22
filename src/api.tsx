import UnknownFace from '../assets/images/Overlays/unknown.png'


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

  async checkAPIKey(key: string) {
    const res = await fetch(`https://api.hypixel.net/key?key=${key}`)
    .then(data => data.json())
    .then(data => data.success)

    return res
  }

  async checkNick(username: string) {
    const res = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`)
      .then(data => data.json())

    if (res.code === 404) return true
    if (res.code === 400) return null
    return false
  }

  async getSkinImage(username: string, size: number) {
    if (await this.checkNick(username)) return <img src={ UnknownFace } height={ size } />
    const uuid = await this.getUUID(username)
    const face = await fetch(`https://crafatar.com/avatars/${ uuid }`)

    if (face.ok === true && face.status === 200) {
      return <img src={ face.url } height={ size } />
    }

    return <img src={ UnknownFace } height={ size } />
  }

  async getStats(uuid: string) {
    const url = `https://api.hypixel.net/player?uuid=${uuid}&key=${this.key}`

    let stats = await fetch(url).then(data => data.json())

    return stats
  }
}
