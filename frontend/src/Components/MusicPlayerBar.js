import React, { useContext, useState, useEffect } from 'react';
import { MusicContext } from './MusicProvider';

import '../StyleSheets/MusicPlayerBar.css'; // Make sure to import the CSS

function MusicPlayerBar() {
    const { isPlaying, 
        TogglePlay, 
        currentTime, 
        SeekTowards, 
        playlist,
        setPlaylist, 
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

  //   useEffect(() => {
  //     console.log("123", TogglePlay);
  // }, []);

    return (
        <div className="music-player-bar">
            <div className="player-controls">
              <button onClick={handlePrevious}>Pre</button>
              <button onClick={handlePlayPauseClick}>
                  {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={handleNext}>Next</button>
              <button onClick={handleLike}>
                  {isLiked ? 'Unlike' : 'Like'}
              </button>
            </div>
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={validatedCurrentTime} 
                onChange={handleSeekChange}
                className="seek-slider" 
            />
            {/* Additional controls can be added here */}
        </div>
    );
};

export default MusicPlayerBar;
