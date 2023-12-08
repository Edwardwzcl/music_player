import React, { createContext, useState, useRef, useEffect } from 'react';

import sop from '../Assets/SeaOfProblems.mp3';
import amp from '../Assets/AllMyPeople.mp3';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState(["https://p.scdn.co/mp3-preview/b8372b1a0b8d09a5004388a654f29bef6bc37021?cid=bb898c85749e404793197d4f2fc2208b"]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    // input
    const TogglePlay = () => {
        if (!playlist[currentTrackIndex] || !audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const SeekTowards = (newTime) => {
        if (!playlist[currentTrackIndex] || !audioRef.current || !isFinite(audioRef.current.duration)) return;
        const time = (audioRef.current.duration / 100) * newTime;
        audioRef.current.currentTime = time;
        setCurrentTime(newTime);
    };

    useEffect(() => {
        const currentAudio = audioRef.current;
    
        if (currentAudio) {
            const playAudio = () => {
                if (isPlaying) {
                    currentAudio.play().catch(e => console.error("Error playing audio:", e));
                }
            };
    
            // Add event listener for when audio is loaded
            currentAudio.addEventListener('loadeddata', playAudio);
    
            // Set new source
            currentAudio.src = playlist[currentTrackIndex];
    
            return () => {
                // Clean up event listener
                currentAudio.removeEventListener('loadeddata', playAudio);
            };
        }
    }, [currentTrackIndex, playlist, isPlaying]);
    
    useEffect(() => {
        const currentAudio = audioRef.current;
    
        if (currentAudio) {
            const handleTimeUpdate = () => {
                if (!isFinite(currentAudio.duration)) return;
                const newCurrentTime = (currentAudio.currentTime / currentAudio.duration) * 100;
                setCurrentTime(newCurrentTime);
            };
    
            currentAudio.addEventListener('timeupdate', handleTimeUpdate);
            currentAudio.addEventListener('ended', () => {
                setCurrentTime(0);
                setCurrentTrackIndex((currentTrackIndex + 1) % playlist.length);
            });
    
            return () => {
                currentAudio.removeEventListener('timeupdate', handleTimeUpdate);
                currentAudio.removeEventListener('ended', () => {
                    setCurrentTrackIndex((currentTrackIndex + 1) % playlist.length);
                });
            };
        }
    }, [currentTrackIndex, playlist.length]);
    

    




    return (
        <MusicContext.Provider value={{ 
            isPlaying, 
            TogglePlay, 
            currentTime, 
            SeekTowards, 
            playlist,
            setPlaylist, 
            currentTrackIndex,
            setCurrentTrackIndex
        }}>
            <audio ref={audioRef} hidden />
            {children}
        </MusicContext.Provider>
    );
};
