import { useState } from 'react'

import UnknownFace from '../assets/images/Overlays/unknown.png'


function c() {
    console.log('════════════════════════')
}

interface UUID {
    [username: string]: string
}

interface Skin {
    [username: string]: JSX.Element
}

interface UUIDEntry {
    username: string
    uuid: string
}

interface SkinEntry {
    username: string
    skin: JSX.Element
}

export function useCache() {
    const [UUIDCache, setUUIDCache] = useState<UUID>({})
    const [NickCache, setNickCache] = useState<string[]>([])
    const [SkinCache, setSkinCache] = useState<Skin>({})

    // UUID Cache

    const UUIDCacheIncludes = (username: string) => {
        c()
        console.log('[CALL] UUID Cache Includes')
        if (Object.keys(UUIDCache).includes(username)) {
            console.log(true)
            return true
        }
        console.log(false)
        c()
        return false
    }

    const UUIDCacheAdd = (entry: UUIDEntry) => {
        c()
        console.log('[CALL] UUID Cache Add')
        if (Object.keys(UUIDCache).includes(entry.username)) throw new Error('This UUID has already been cached!')

        console.log('Added ' + entry.uuid + ' to UUID cache.')

        setUUIDCache(c => {
            let tmp = c

            tmp[entry.username] = entry.uuid

            return tmp
        })

        c()
    }

    
    const UUIDCacheGet = (username: string) => {
        c()
        console.log('[CALL] UUID Cache Get')
        if (!Object.keys(UUIDCache).includes(username)) {
            console.log(null)
            return null
        }
        console.log(UUIDCache[username])
        c()
        return UUIDCache[username]
    }

    // Nick Cache

    const NickCacheIncludes = (username: string) => {
        c()
        if (NickCache.includes(username)) return true
        console.log('[CALL] Nick Cache Includes')
        console.log(NickCache.includes(username) ? true : false)
        c()
        return false
    }

    const NickCacheAdd = (username: string) => {
        c()
        console.log('[CALL] Nick Cache Add')
        if (NickCache.includes(username)) {
            console.log('[ERROR] Already cached')
            throw new Error('This nick has already been cached!')
        }
        console.log('[ADD] ' + username)
        setNickCache(c => [...c, username])
        c()
    }

    // Skin Cache

    const SkinCacheIncludes = (username: string) => {
        c()
        console.log('[CALL] Skin Cache Includes')
        console.log(Object.keys(SkinCache).includes(username) ? true : false)
        if (Object.keys(SkinCache).includes(username)) return true
        c()
        return false
    }

    const SkinCacheAdd = (entry: SkinEntry) => {
        c()
        if (Object.keys(SkinCache).includes(entry.username)) throw new Error('This skin has already been cached!')

        console.log('[CALL] Skin Cache Add')
        console.log('[ADD] ' + entry.username)
        console.log(entry.skin)

        setSkinCache(c => {
            let tmp = c

            tmp[entry.username] = entry.skin

            return tmp
        })
        c()
    }
        
    const SkinCacheGet = (username: string) => {
        c()
        console.log('[CALL] Skin Cache Get')
        console.log(SkinCache[username])
        c()
        return SkinCache[username]
    }

    return [
            UUIDCacheGet, UUIDCacheAdd, UUIDCacheIncludes,
            SkinCacheGet, SkinCacheAdd, SkinCacheIncludes,
            NickCacheAdd, NickCacheIncludes
    ]
}