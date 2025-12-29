import type { Artists } from "./artists"

export interface Tracks {
    id: string,
    name: string
    artists: Artists[]
}