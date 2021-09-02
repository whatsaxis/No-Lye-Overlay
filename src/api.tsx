import UnknownFace from '../assets/images/Overlays/unknown.png'


export class API {
  key: string

  constructor(key: string) {
    this.key = key
  }

  async checkAPIKey(key: string) {
    const res = await fetch(`https://api.hypixel.net/key?key=${key}`)
    .then(data => data.json())
    .then(data => data.success)

    return res
  }

  async checkNickOrUUID(username: string) {
    const res = await fetch(`https://api.ashcon.app/mojang/v2/user/${username}`)
      .then(data => data.json())

    console.log(`Called checkNickOrUUID [${ res.code === 404 || res.code === 400 ? true : res.uuid }]`)

    if (res.code === 404 || res.code === 400) return true
    return res.uuid
  }

  async getSkinImage(uuid: string | null, size: number) {
    if (uuid === null) return <img src={ UnknownFace } height={ size } />
    const face = await fetch(`https://crafatar.com/avatars/${ uuid }`)

    console.log(`https://crafatar.com/avatars/${ uuid }`)

    if (face.ok === true && face.status === 200) {
      return <img src={ face.url } height={ size } />
    }

    return <img src={ UnknownFace } height={ size } />
  }

  async getStats(uuid: string) {
    const url = `https://api.hypixel.net/player?uuid=${ uuid }&key=${ this.key }`
    console.log(url)
    let stats = await fetch(url).then(data => data.json())

    return stats
  }
}
