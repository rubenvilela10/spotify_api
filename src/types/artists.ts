import type { Tracks } from "./tracks"
import type { Albums } from "./albums"

export interface Artists {
    id: string
    name: string
    images?: {
        url: string
        height?: number
        width?: number
    }[]
    genres?: string[]
    followers: {
        total: number
    }
    popularity: number
    top_tracks?: Tracks[]
    albums?: Albums[]
}