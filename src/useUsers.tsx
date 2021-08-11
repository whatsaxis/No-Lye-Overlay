import { useState, useEffect, useContext } from 'react'

import { API } from './api'

import { LooseObject } from './helpers'

import { CacheContext } from './App'


export function useUsers() {
    // Just in case useState doesn't work again:
    // https://ozmoroz.com/2018/11/why-my-setstate-doesnt-work/

    const [users, setUsers] = useState<any[]>([])

    const [prevUsers, setPrevUsers] = useState<any[]>([])

    /*
    Setting the initial value of this state to [] prevents
    an undefined thingy showing up in the table on startup,
    because of the nature of .concat()
    */

    const [selectedStats, setSelectedStats] = useState<any>([])

    const [get, add, includes] = useContext(CacheContext)
    const api = new API( window.Main.getSetting('api_key') )

    useEffect(() => {
        window.Main.on('server_change', (e: Electron.IpcRendererEvent) => {
            setUsers([])
        })
        
        window.Main.on('join', async (e: Electron.IpcRendererEvent, user: string) => {
            console.log(user + ' joined!')

            let stats: LooseObject = {}

            let uuid
            let nick = false

            if (includes(user)) {
                uuid = get(user)
                console.log('Fetched ' + user + "'s UUID from cache.")
            } else {
                const userIsNick: boolean = await api.checkNick(user)
                console.log('Checked if ' + user + ' is a nicked player.')

                nick = true
                if (!userIsNick) {
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

            setUsers(u => {
                setPrevUsers(u)
                return users
            })

            setSelectedStats(stats)
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

    useEffect(() => {
        setUsers(prevUsers.concat(selectedStats))
    }, [prevUsers])

    return users
}