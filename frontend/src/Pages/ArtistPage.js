import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider
import MusicPlayerBar from '../Components/MusicPlayerBar';
import '../StyleSheets/Home.css';

function ArtistPage() {
    const navigate = useNavigate();

    const handlePlayPauseClick = () => {
        navigate('/s');
    }
    
    return (
        <div className='ArtistPage'>
            <div className="UserPanel">
                <p>123
                    456
                    6787
                    34547536
                    34576346
                </p>
            </div>
            <div className="MainDisplay">
                <button onClick={handlePlayPauseClick}>click me</button>
            </div>
            <MusicPlayerBar />
        </div>
    );
}

export default ArtistPage;
 