import type { Artists } from "./artists"
import type { Tracks } from "./tracks"

export interface Albums {
    id: string
    name: string
    images: {
      url: string
      height?: number
      width?: number
    }[]
    release_date: string
    artists: Artists[]
    tracks: Tracks[]
    total_tracks: number
  }