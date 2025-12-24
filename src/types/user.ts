export type User = {
    name: string
    email: string
    spotify_id: string
    avatar?: string
  }
  
  export type MeResponse = {
    user: User | null
  }