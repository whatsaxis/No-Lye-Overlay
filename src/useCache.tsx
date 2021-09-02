import { useState } from 'react'

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
        if (Object.keys(UUIDCache).includes(username)) {
            return true
        }

        return false
    }

    const UUIDCacheAdd = (entry: UUIDEntry) => {
        if (Object.keys(UUIDCache).includes(entry.username)) throw new Error('This UUID has already been cached!')

        setUUIDCache(c => {
            let tmp = c

            tmp[entry.username] = entry.uuid

            return tmp
        })
    }

    
    const UUIDCacheGet = (username: string) => {
        if (!Object.keys(UUIDCache).includes(username)) {
            return null
        }
        
        return UUIDCache[username]
    }

    // Nick Cache

    const NickCacheIncludes = (username: string) => {
        if (NickCache.includes(username)) return true
        
        return false
    }

    const NickCacheAdd = (username: string) => {
        if (NickCache.includes(username)) {
            throw new Error('This nick has already been cached!')
        }

        setNickCache(c => [...c, username])
        
    }

    // Skin Cache

    const SkinCacheIncludes = (username: string) => {
        if (Object.keys(SkinCache).includes(username)) return true
        
        return false
    }

    const SkinCacheAdd = (entry: SkinEntry) => {
        if (Object.keys(SkinCache).includes(entry.username)) throw new Error('This skin has already been cached!')

        setSkinCache(c => {
            let tmp = c

            tmp[entry.username] = entry.skin

            return tmp
        })
        
    }
        
    const SkinCacheGet = (username: string) => {
        return SkinCache[username]
    }

    return [
            UUIDCacheGet, UUIDCacheAdd, UUIDCacheIncludes,
            SkinCacheGet, SkinCacheAdd, SkinCacheIncludes,
            NickCacheAdd, NickCacheIncludes
    ]
}