import type { Albums } from "./albums"
import type { Artists } from "./artists"
import type { Tracks } from "./tracks"

export interface User {
    id: number,
    name: string
    email: string
    spotify_id: string
    avatar?: string
}
export interface HomeResponse {
    user: User
    top_artists: Artists[]
    top_tracks: Tracks[]
    top_albums: Albums[]
}