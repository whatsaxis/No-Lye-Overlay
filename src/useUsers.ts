import { useState, useEffect, useContext } from 'react'

import { API } from './api'

import { LooseObject } from './helpers'

import { CacheContext } from './App'


export function useUsers() {
    // Just in case useState doesn't work again:
    // https://ozmoroz.com/2018/11/why-my-setstate-doesnt-work/

    const [users, setUsers] = useState<any[]>([])

    const api = new API( window.Main.getSetting('api_key') )
    const [get, add, includes] = useContext(CacheContext)

    useEffect(() => {
        window.Main.on('server_change', (e: Electron.IpcRendererEvent) => {
            setUsers([])
        })
        
        window.Main.on('join', async (e: Electron.IpcRendererEvent, user: string) => {
            let stats: LooseObject = {}

            let uuid
            let nick = false

            if (includes(user)) {
                uuid = get(user)
            } else {
                const userIsNick: boolean = await api.checkNick(user)

                nick = true
                if (!userIsNick) {
                    nick = false

                    uuid = await api.getUUID(user)
                    add({ username: user, uuid: uuid })
                }
            }

            if (!nick) {
                stats = await api.getStats(uuid)
            }


            // Adding custom property for username, so that
            // we know the name of nicks and we can display it
            stats._internalUsername = user
            stats._internalNick = nick

            setUsers(u => u.concat(stats))
        })
        
        window.Main.on('leave', (e: Electron.IpcRendererEvent, user: string) => {
            setUsers(u => u.filter(i => i.player.displayname !== user))
        })

        return () => {
            window.Main.removeListener('server_change')
            window.Main.removeListener('join')
            window.Main.removeListener('leave')
        }
    }, [])

    return users
}