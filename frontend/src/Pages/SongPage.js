import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider

import MusicPlayerBar from '../Components/MusicPlayerBar';
import ArtistCard from '../Components/ArtistCard';


import '../StyleSheets/Song.css';

function SongPage() {
  return (
    <div className='SongPage'>
        <div className="UserPanel">
            <p>123
                456
                6787
                34547536
                34576346
            </p>
        </div>
        <div className="MainDisplay">
        </div>
        <MusicPlayerBar />
    </div>
  );
}

export default SongPage;
