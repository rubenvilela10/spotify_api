import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Tracks } from "../types/tracks";


type PlayerContextType = {
    currentTrack: Tracks | null
    isPlaying: boolean
    play: (track: Tracks) => void
    pause: () => void
    toggle: () => void
  }

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export default function PlayerProvider({children}: {children:ReactNode}){
    const [currentTrack, setCurrentTrack] = useState<Tracks | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null) 

    const play = (track: Tracks) => {
        if(!audioRef.current) {
            audioRef.current = new Audio(track.preview_url || '')
        } else if(currentTrack?.id !== track.id) {
            audioRef.current.src = track.preview_url || ''
        }

        setCurrentTrack(track)
        audioRef.current.play()
        setIsPlaying(true)
    }

    const pause = () => {
        audioRef?.current?.pause()
        setIsPlaying(false)
    }

    const toggle = () => {
        if (!audioRef.current) return
        if(!isPlaying) {
            pause()
        } else {
            audioRef.current.play()
            setIsPlaying(true)
        }
    }
    useEffect(() => {
        const audio = audioRef.current
        if(!audio) return

        const endOfAudio = () => setIsPlaying(false)
        audio.addEventListener('ended', endOfAudio)

        return () => audio.removeEventListener('ended', endOfAudio)
    },
    [currentTrack]);

    return (
        <PlayerContext.Provider value={{ currentTrack, isPlaying, play, pause, toggle}}>
            {children}
        </PlayerContext.Provider>
    )
}

export function usePlayer() {
    const context = useContext(PlayerContext)
    if (!context) {
      throw new Error('usePlayer deve ser usado dentro de PlayerProvider')
    }
    return context
  }