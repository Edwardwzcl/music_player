import React, { createContext, useState, useRef, useEffect } from 'react';

import sop from '../Assets/SeaOfProblems.mp3';
import amp from '../Assets/AllMyPeople.mp3';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [realTime, setRealTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    // input
    const TogglePlay = () => {
        // if no source, return
        if (!playlist[currentTrackIndex] || !playlist[currentTrackIndex]['url'] || !audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const SeekTowards = (newTime) => {
        if (!playlist[currentTrackIndex] || !playlist[currentTrackIndex]['url'] || !audioRef.current) return;
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
            console.log(playlist);
            setCurrentTrackIndex(newIndex);
        }
    };

    const PlayNext = () => {
        if (!playlist[currentTrackIndex] || !audioRef.current) return;
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
    };

    const PlayPrev = () => {
        if (!playlist[currentTrackIndex] || !audioRef.current) return;
        const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        setCurrentTrackIndex(prevIndex);
    };



    // Load new track when currentTrackIndex changes
    useEffect(() => {
        const currentAudio = audioRef.current;
        if (!playlist[currentTrackIndex] || !playlist[currentTrackIndex]['url'] || !audioRef.current) return;
        console.log('Loading new track:', playlist[currentTrackIndex]['url']);
        if (currentAudio && playlist[currentTrackIndex]) {
            
            currentAudio.src = playlist[currentTrackIndex]['url'];
            setCurrentTime(0);
            if (isPlaying) {
                currentAudio.play();
            }
        }
    }, [currentTrackIndex]);

    useEffect(() => {
        console.log('Playlist changed:', playlist);
        setCurrentTrackIndex(0);
        const currentAudio = audioRef.current;
        if (playlist.length===0 || !playlist[currentTrackIndex] || !playlist[currentTrackIndex]['url'] || !audioRef.current) return;
        console.log('Loading new track:', playlist[currentTrackIndex]['url']);
        if (currentAudio && playlist[currentTrackIndex]) {
            
            currentAudio.src = playlist[currentTrackIndex]['url'];
            setCurrentTime(0);
            setIsPlaying(false)
        }
    }, [playlist]);

    useEffect(() => {
        const currentAudio = audioRef.current;
        currentAudio.addEventListener('timeupdate', handleTimeUpdate);
        currentAudio.addEventListener('ended', PlayNext);

        return () => {
            currentAudio.removeEventListener('timeupdate', handleTimeUpdate);
            currentAudio.removeEventListener('ended', PlayNext);
        };
    }, [])

    const handleTimeUpdate = () => {
        const currentAudio = audioRef.current;
        if (!isFinite(currentAudio.duration)) return;
        const newCurrentTime = (currentAudio.currentTime / currentAudio.duration) * 100;
        setCurrentTime(newCurrentTime);
        setRealTime(currentAudio.currentTime);
    };

    // const handleEnded = () => {
    //     setCurrentTime(0);
    //     setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    // };



    return (
        <MusicContext.Provider value={{ 
            isPlaying, 
            TogglePlay, 
            currentTime, 
            realTime,
            SeekTowards, 
            playlist,
            setPlaylist, 
            currentTrackIndex,
            Insert,
            PlayNext,
            PlayPrev
        }}>
            <audio ref={audioRef} hidden />
            {children}
        </MusicContext.Provider>
    );
};
