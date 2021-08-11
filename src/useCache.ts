import { useState } from 'react'


interface UUID {
    [username: string]: string
}

interface UUIDEntry {
    username: string
    uuid: string
}

export function useCache() {
    const [cache, setCache] = useState<UUID>({})

    const includes = (username: string) => {
        if (Object.keys(cache).includes(username)) return true
        return false
    }

    const add = (entry: UUIDEntry) => {
        if (Object.keys(cache).includes(entry.username)) throw new Error('This UUID has already been cached!')

        setCache(c => {
            let tmp = c

            tmp[entry.username] = entry.uuid

            return tmp
        })
    }

    const get = (username: string) => {
        if (!Object.keys(cache).includes(username)) return null
        return cache[username]
    }

    return [get, add, includes]
}