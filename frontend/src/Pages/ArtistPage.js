import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider
import MusicPlayerBar from '../Components/MusicPlayerBar';
import LikeRecent from '../Components/LikeRecent';
import InputSubmit from "../Components/InputSubmit";
import '../StyleSheets/Home.css';

function ArtistPage() {
    const navigate = useNavigate();

    const handlePlayPauseClick = () => {
        navigate('/');
    }

    const [artists, setArtists] = useState([
        { type: "category", id: 0, name: 'Pop', image: 'https://via.placeholder.com/150' },
    ]);
    
    
    return (
        <div className='ArtistPage'>
            <div className="UserPanel">
                <div className='homeControlDiv'>
                    {/* <InputSubmit onSubmit={setQuery} /> */}
                    <LikeRecent
                        userID={0}
                        type={'Like'}
                    />
                    <LikeRecent
                        userID={0}
                        type={'Recent'}
                    />
                    
                </div>
            </div>
            <div className="MainDisplay">
                <button onClick={handlePlayPauseClick}>click me</button>
            </div>
            <MusicPlayerBar />
        </div>
    );
}

export default ArtistPage;
 