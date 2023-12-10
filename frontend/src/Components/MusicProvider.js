import React, { createContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import sop from '../Assets/SeaOfProblems.mp3';
import amp from '../Assets/AllMyPeople.mp3';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState([]);
    const [currSong, setCurrSong] = useState({});
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [realTime, setRealTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    // input
    const TogglePlay = () => {
        // if no source, return
        if (!playlist[currentTrackIndex] || !audioRef.current) return;
        if (!currSong.url) // alert
        {
            alert("This song is not available for preview");
            return;
        }
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
            console.log(playlist);
            PlayNext();
        }
    };

    const PlayNext = async () => {
        if (!playlist[currentTrackIndex] || !audioRef.current) return;
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
        console.log("index", nextIndex)
        const currentAudio = audioRef.current;
        if (!playlist[nextIndex] || !currentAudio) return;
        
        SeekTowards(0);
        setIsPlaying(false);
        audioRef.current.pause();

        const songURL = `http://3.138.175.21:4000/song/${playlist[nextIndex]}`;
        console.log('Fetching search results from:', songURL);

        try {
            const response = await axios.get(songURL);
            const songData = response.data.data;
            console.log('Server Response:', songData);

            setCurrSong({
                songId: songData.songId,
                songName: songData.songName,
                songImage: songData.cover,
                url: songData.url,
                artistId: songData.artistId,
                artistName: songData.artistName,
                artistImage: songData.cover,
                lyric: songData.lyric
                });

            currentAudio.src = songData.url;
            
        } catch (error) {
            console.error('Search Error:', error);
        }
        
    };

    const PlayPrev = async () => {
        if (!playlist[currentTrackIndex] || !audioRef.current) return;
        const nextIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        setCurrentTrackIndex(nextIndex);
        console.log("index", nextIndex)
        const currentAudio = audioRef.current;
        if (!playlist[nextIndex] || !currentAudio) return;
        
        SeekTowards(0);
        setIsPlaying(false);
        audioRef.current.pause();

        const songURL = `http://3.138.175.21:4000/song/${playlist[nextIndex]}`;
        console.log('Fetching search results from:', songURL);

        try {
            const response = await axios.get(songURL);
            const songData = response.data.data;
            console.log('Server Response:', songData);

            setCurrSong({
                songId: songData.songId,
                songName: songData.songName,
                songImage: songData.cover,
                url: songData.url,
                artistId: songData.artistId,
                artistName: songData.artistName,
                artistImage: songData.cover,
                lyric: songData.lyric
                });

            currentAudio.src = songData.url;
            
        } catch (error) {
            console.error('Search Error:', error);
        }
        
    };



    useEffect(() => {
        const fetchSongData = async () => {
            console.log("playList", playlist)
            const currentAudio = audioRef.current;
            if (!playlist[0]) return;
            SeekTowards(0);
            setIsPlaying(false);
            audioRef.current.pause();
    
            const songURL = `http://3.138.175.21:4000/song/${playlist[0]}`;
            console.log('Fetching search results from:', songURL);
    
            try {
                const response = await axios.get(songURL);
                const songData = response.data.data;
                console.log('Server Response:', songData);
    
                setCurrSong({
                    songId: songData.songId,
                    songName: songData.songName,
                    songImage: songData.cover,
                    url: songData.url,
                    artistId: songData.artistId,
                    artistName: songData.artistName,
                    artistImage: songData.cover,
                    lyric: songData.lyric
                  });
    
                currentAudio.src = songData.url;
            } catch (error) {
                console.error('Search Error:', error);
            }
        };
        setCurrentTrackIndex(0);
        fetchSongData();
    }, [playlist]);    

    useEffect(() => {
        const currentAudio = audioRef.current;
        currentAudio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            currentAudio.removeEventListener('timeupdate', handleTimeUpdate);
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
            currSong,
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
