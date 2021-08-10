import { useState, useEffect } from 'react'

import { API } from './api'

export function useUsers(filter: Function | null = null) {
    // Just in case useState doesn't work again:
    // https://ozmoroz.com/2018/11/why-my-setstate-doesnt-work/

    const [users, setUsers] = useState<any[]>([])

    const api = new API( window.Main.getSetting('api_key') )

    useEffect(() => {
        window.Main.on('server_change', (e: Electron.IpcRendererEvent) => {
            setUsers([])
        })
        
        window.Main.on('join', async (e: Electron.IpcRendererEvent, user: string) => {
            const stats: object = await api.getStats(user, filter ? filter : null)

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