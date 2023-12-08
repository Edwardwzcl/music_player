import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider

import MusicPlayerBar from '../Components/MusicPlayerBar';
import ArtistCard from '../Components/ArtistCard';


import '../StyleSheets/Song.css';

function SongPage({ songId, songName, songImage }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
      navigate('/');
  }

  return (
    <div className='SongPage'>

        <div className="MainDisplay">
          <button onClick={handleClick}>Back</button>
          <image src="https://via.placeholder.com/150" />
          <p>a loooooooooooooooooooooooooooooooooooooooooot of text</p>
        </div>
        <MusicPlayerBar />
    </div>
  );
}

export default SongPage;
