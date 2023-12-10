import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'; // Make sure you have this
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import sop from '../Assets/SeaOfProblems.mp3';
import amp from '../Assets/AllMyPeople.mp3';


import { MusicContext } from './MusicProvider';

import '../StyleSheets/MusicPlayerBar.css'; // Make sure to import the CSS

function MusicPlayerBar() {
    const { 
        currSong,
        isPlaying, 
        TogglePlay, 
        currentTime, 
        SeekTowards, 
        playlist,
        setPlaylist, 
        Insert,
        PlayNext,
        PlayPrev } = useContext(MusicContext);

    const navigate = useNavigate();

    const validatedCurrentTime = isNaN(currentTime) ? 0 : currentTime;
 
    const [isLiked, setIsLiked] = useState(false); // Local state for 'like' functionality

    const handlePlayPauseClick = () => {
        TogglePlay();
    };

    const handleSeekChange = (event) => {
        SeekTowards(parseFloat(event.target.value));
    };

    const handleNext = () => {
        PlayNext();
    };

    const handlePrevious = () => {
        PlayPrev();
        // nice
    };

    const handleLike = async () => {
        setIsLiked(!isLiked);
        console.log('Sending Like request', currSong.songId);
        const songURL = `http://3.138.175.21:4000/song/${currSong.songId}`;
        try {
          const response = await axios.post(songURL);
          const songData = response.data.data;
          console.log('Server Response:', songData);          
      } catch (error) {
          console.error('Search Error:', error);
      }
    };
    
    const likeIcon = isLiked ? faSolidHeart : faRegularHeart;


  //   useEffect(() => {
  //     console.log("123", TogglePlay);
  // }, []);
  const handleAddAmp = () => {
    Insert(1357375695);
};

  const handleResetPlaylist = () => {
      setPlaylist([1985364667, 2096354343]);
  };

    return (
        <div className="music-player-bar">
            <div className="player-controls">
              <button onClick={handlePrevious}>
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <button onClick={handlePlayPauseClick}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
              </button>
              <button onClick={handleNext}>
                <FontAwesomeIcon icon={faForward} />
              </button>
              <button onClick={handleLike}>
                <FontAwesomeIcon icon={likeIcon}/>              
              </button>
              <button onClick={() => navigate('/song')}>Details</button>
            {/* <button onClick={handleResetPlaylist}>R</button> */}
            </div>
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={validatedCurrentTime} 
                onChange={handleSeekChange}
                className="seek-slider" 
            />
            {/* ... rest of the component ... */}
        </div>
    );
};

export default MusicPlayerBar;
