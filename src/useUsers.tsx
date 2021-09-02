import { useState, useEffect, useContext } from 'react'

import { API } from './api'
import { CacheContext } from './App'

import { LooseObject } from './helpers'

import UnknownFace from '../assets/images/Overlays/unknown.png'

// TODO FIX /WHO TOO!!!!!!!!!!!!!!!!

export interface Player {
    username: string
    nick: boolean
    skin: JSX.Element,
    stats: LooseObject
}

export function useUsers() {
    // Just in case useState doesn't work again:
    // https://ozmoroz.com/2018/11/why-my-setstate-doesnt-work/


    const [
        UUIDCacheGet, UUIDCacheAdd, UUIDCacheIncludes,
        SkinCacheGet, SkinCacheAdd, SkinCacheIncludes,
        NickCacheAdd, NickCacheIncludes
    ] = useContext(CacheContext)


    const [users, setUsers] = useState<Player[]>([])

    const api = new API( window.Main.getSetting('api-key') )

    const clearUsers = () => {
        setUsers([])
    }

    const checkStats = async (user: string): Promise<Player> => {
            let stats: Player = {
                username: user,
                nick: false,
                skin: <img src={ UnknownFace } height={ 25 } />,
                stats: {}
            }

            let uuid
            let nick = false
            let skin: JSX.Element = <img src={ UnknownFace } height={ 25 } />

            if (UUIDCacheIncludes(user)) {
                uuid = UUIDCacheGet(user)
                console.log('Fetched ' + user + "'s UUID from cache.")
            } else {
                if (!NickCacheIncludes(user)) {
                    const userIsNickOrUUID: boolean | string = await api.checkNickOrUUID(user)
                    console.log(userIsNickOrUUID)
                    console.log(`Checked if ${ user } is a nicked player. [${ typeof userIsNickOrUUID === 'string' ? false : true }]`)
    
                    nick = true
                    if (typeof userIsNickOrUUID !== 'boolean') {
                        nick = false
    
                        uuid = userIsNickOrUUID
                        console.log('Fetched ' + user + "'s UUID.")
                        UUIDCacheAdd({ username: user, uuid: uuid })
                    } else {
                        NickCacheAdd(user)
                    }
                } else {
                    nick = true
                }
            }

            if (!nick) {
                if (SkinCacheIncludes(user)) {
                    skin = SkinCacheGet(user)
                    console.log('Fetched ' + user + "'s skin from cache.")
                } else {
                    console.log('Fetched ' + user + "'s skin.")
                    skin = await api.getSkinImage(uuid, 25)
                    SkinCacheAdd({ username: user, skin: skin})
                }

                stats.stats = await api.getStats(uuid)
                console.log('Fetched ' + user + "'s stats.")
            }


            // Adding custom property for username, so that
            // we know the name of nicks and we can display it
            stats.username = user
            stats.nick = nick
            stats.skin = skin

            return stats
    }

    useEffect(() => {
        window.Main.on('server_change', (e: Electron.IpcRendererEvent) => {
            clearUsers()
        })

        window.Main.on('who', async (e: Electron.IpcRendererEvent, Users: string[]) => {
            const usersInArray = users.map(u => u.username)
            const notInUsersArray = usersInArray.filter(U => !usersInArray.includes(U))
            for (const u of notInUsersArray) {
                new Promise(async (resolve, reject) => {
                    const stats = await checkStats(u)

                    resolve(stats)
                }).then((stats) => setUsers(u => [...u, stats as Player]), () => console.log('Did not update stats.'))
            }
        })

        window.Main.on('join', async (e: Electron.IpcRendererEvent, user: string) => {
            new Promise(async (resolve, reject) => {
                const stats = await checkStats(user)

                resolve(stats)
            }).then(stats => setUsers(u => [...u, stats as Player]), () => console.log('Did not update stats.'))
        })

        window.Main.on('leave', (e: Electron.IpcRendererEvent, user: string) => {
            setUsers(u => u.filter(i => i.username !== user))
        })

        return () => {
            window.Main.removeListener('server_change')
            window.Main.removeListener('who')
            window.Main.removeListener('join')
            window.Main.removeListener('leave')
        }
    }, [])

    return { users: users, clearUsers: clearUsers }
}