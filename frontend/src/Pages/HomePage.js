import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider

import MusicPlayerBar from '../Components/MusicPlayerBar';
import ArtistCard from '../Components/ArtistCard';
import '../StyleSheets/Home.css';

function HomePage() {
    const navigate = useNavigate();

    const [artists, setArtists] = useState([
        { artistId: 0, artistName: 'Artist 0', artistImage: 'https://via.placeholder.com/150' },
    ]);
    
    return (
        <div className='HomePage'>
            <div className="UserPanel">
                <p>123
                    456
                    6787
                    34547536
                    34576346
                </p>
            </div>
            <div className="MainDisplay">
                {artists.map((artist) => (
                    <ArtistCard 
                        key={artist.artistId}
                        artistId={artist.artistId}
                        artistName={artist.artistName}
                        artistImage={artist.artistImage}
                    />
                ))}
            </div>
            <MusicPlayerBar />
        </div>
    );
}

export default HomePage;
