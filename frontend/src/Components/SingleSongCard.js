import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StyleSheets/SingleSongCard.css';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider

function SingleSongCard({ id, title, authors}) {
    const navigate = useNavigate();

    const navigateToSong = () => {
        Insert(id)
        // Perform action on click
        console.log(` ${title} clicked`);
        navigate(`/song`);
    };

    const {
        currSong, 
        isPlaying, 
        TogglePlay, 
        currentTime, 
        realTime,
        SeekTowards, 
        playlist,
        setPlaylist, 
        Insert,
        currentTrackIndex,
        setCurrentTrackIndex } = useContext(MusicContext);


    return (
        <div className='SingleSongCard'>
            <h2>
                <span onClick={navigateToSong}>{title}</span>
            </h2>
        </div>
    );
}

export default SingleSongCard;