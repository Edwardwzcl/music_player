import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'; // Make sure you have this

import sop from '../Assets/SeaOfProblems.mp3';
import amp from '../Assets/AllMyPeople.mp3';


import { MusicContext } from './MusicProvider';

import '../StyleSheets/MusicPlayerBar.css'; // Make sure to import the CSS

function MusicPlayerBar() {
    const { isPlaying, 
        TogglePlay, 
        currentTime, 
        SeekTowards, 
        playlist,
        setPlaylist, 
        Insert,
        currentTrackIndex,
        setCurrentTrackIndex } = useContext(MusicContext);

    const validatedCurrentTime = isNaN(currentTime) ? 0 : currentTime;
 
    const [isLiked, setIsLiked] = useState(false); // Local state for 'like' functionality

    const handlePlayPauseClick = () => {
        TogglePlay();
    };

    const handleSeekChange = (event) => {
        SeekTowards(parseFloat(event.target.value));
    };

    const handleNext = () => {
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
    };

    const handlePrevious = () => {
        const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        setCurrentTrackIndex(prevIndex);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const likeIcon = isLiked ? faSolidHeart : faRegularHeart;

  //   useEffect(() => {
  //     console.log("123", TogglePlay);
  // }, []);
  const handleAddAmp = () => {
    Insert(amp);
};

const handleResetPlaylist = () => {
    setPlaylist([sop, "https://p.scdn.co/mp3-preview/b8372b1a0b8d09a5004388a654f29bef6bc37021?cid=bb898c85749e404793197d4f2fc2208b"]);
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
              <button onClick={handleAddAmp}>1"</button>
            <button onClick={handleResetPlaylist}>R</button>
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
