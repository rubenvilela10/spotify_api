import type { Artists } from "./artists"
export interface Tracks {
    id: string
    name: string
    artists: Artists[]
    album?: {
      id: string
      name: string
      images?: {
        url: string
        height?: number
        width?: number
      }[]
    }
  }