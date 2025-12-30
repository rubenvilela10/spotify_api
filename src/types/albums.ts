import type { Artists } from "./artists"

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
    total_tracks: number
  }