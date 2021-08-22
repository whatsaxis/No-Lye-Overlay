import { useState, useEffect, useContext } from 'react'

import { API } from './api'

import { LooseObject } from './helpers'

import { CacheContext } from './App'


export function useUsers() {
    // Just in case useState doesn't work again:
    // https://ozmoroz.com/2018/11/why-my-setstate-doesnt-work/


    const [get, add, includes] = useContext(CacheContext)


    const [users, setUsers] = useState<any[]>([])

    const api = new API( window.Main.getSetting('api-key') )

    const clearUsers = () => {
        setUsers([])
    }

    useEffect(() => {
        window.Main.on('server_change', (e: Electron.IpcRendererEvent) => {
            clearUsers()
            console.log('════════════ Server Change ════════════')
        })

        window.Main.on('who', async (e: Electron.IpcRendererEvent, Users: string[]) => {
            console.log('Used /who')
            for (const u of Users) {
                if (users.includes(u)) continue
                let stats: LooseObject = {}

                let uuid
                let nick = false

                if (includes(u)) {
                    uuid = get(u)
                    console.log('Fetched ' + useContext + "'s UUID from cache.")
                } else {
                    const userIsNick: boolean | null = await api.checkNick(u)
                    console.log(`Checked if ${ u } is a nicked player. [${ userIsNick }]`)
    
                    nick = true
                    if (userIsNick === false) {
                        nick = false
    
                        uuid = await api.getUUID(u)
                        console.log('Fetched ' + u + "'s UUID.")
                        add({ username: u, uuid: uuid })
                    }
                }
    
                if (!nick) {
                    stats = await api.getStats(uuid)
                    console.log('Fetched ' + u + "'s stats.")
                }
    
    
                // Adding custom property for username, so that
                // we know the name of nicks and we can display it
                stats._internalUsername = u
                stats._internalNick = nick
                stats._internalSkin = await api.getSkinImage(u, 25)
                
                console.log(stats._internalSkin)
    
                setUsers(u => [...u, stats])
            }
        })

        window.Main.on('join', async (e: Electron.IpcRendererEvent, user: string) => {
            let stats: LooseObject = {}

            let uuid
            let nick = false

            if (includes(user)) {
                uuid = get(user)
                console.log('Fetched ' + user + "'s UUID from cache.")
            } else {
                const userIsNick: boolean | null = await api.checkNick(user)
                console.log(`Checked if ${ user } is a nicked player. [${ userIsNick }]`)

                nick = true
                if (userIsNick === false) {
                    nick = false

                    uuid = await api.getUUID(user)
                    console.log('Fetched ' + user + "'s UUID.")
                    add({ username: user, uuid: uuid })
                }
            }

            if (!nick) {
                stats = await api.getStats(uuid)
                console.log('Fetched ' + user + "'s stats.")
            }


            // Adding custom property for username, so that
            // we know the name of nicks and we can display it
            stats._internalUsername = user
            stats._internalNick = nick
            stats._internalSkin = await api.getSkinImage(user, 25)

            console.log(stats._internalSkin)

            setUsers(u => [...u, stats])
        })

        window.Main.on('who', (e: Electron.IpcRendererEvent, users: string[]) => {
            setUsers(users)
            console.log('Used /who!')
        })

        window.Main.on('leave', (e: Electron.IpcRendererEvent, user: string) => {
            setUsers(u => u.filter(i => i._internalUsername !== user))
            console.log(user + ' left!')
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