import React, { createContext, useState, useRef, useEffect } from 'react';

import sop from '../Assets/SeaOfProblems.mp3';
import amp from '../Assets/AllMyPeople.mp3';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    //const [playlist, setPlaylist] = useState([sop, amp, "https://p.scdn.co/mp3-preview/b8372b1a0b8d09a5004388a654f29bef6bc37021?cid=bb898c85749e404793197d4f2fc2208b"]);
    const [playlist, setPlaylist] = useState([]);
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

    const Insert = (newTrack) => {
        if (!newTrack) return;
        let newIndex = currentTrackIndex + 1;
        if (playlist.length === 0)
        {
            newIndex = 0;
            setPlaylist([newTrack]);
        }
        else
        {
            playlist.splice(newIndex, 0, newTrack);
            setCurrentTrackIndex(newIndex);
        }
        
    };



    // Load new track when currentTrackIndex changes
    useEffect(() => {
        const currentAudio = audioRef.current;
        if (currentAudio && playlist[currentTrackIndex]) {
            currentAudio.src = playlist[currentTrackIndex];
            setCurrentTime(0);
            if (isPlaying) {
                currentAudio.play();
            }
        }
    }, [currentTrackIndex, playlist]);

    useEffect(() => {
        const currentAudio = audioRef.current;
        if (currentAudio) {
            const handleTimeUpdate = () => {
                if (!isFinite(currentAudio.duration)) return;
                const newCurrentTime = (currentAudio.currentTime / currentAudio.duration) * 100;
                setCurrentTime(newCurrentTime);
            };

            const handleEnded = () => {
                setCurrentTime(0);
                setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
            };

            currentAudio.addEventListener('timeupdate', handleTimeUpdate);
            currentAudio.addEventListener('ended', handleEnded);

            return () => {
                currentAudio.removeEventListener('timeupdate', handleTimeUpdate);
                currentAudio.removeEventListener('ended', handleEnded);
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
            Insert,
            currentTrackIndex,
            setCurrentTrackIndex
        }}>
            <audio ref={audioRef} hidden />
            {children}
        </MusicContext.Provider>
    );
};
