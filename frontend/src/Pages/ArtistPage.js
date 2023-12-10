import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider
import MusicPlayerBar from '../Components/MusicPlayerBar';

import '../StyleSheets/Page.css';
import LikeRecent from '../Components/LikeRecent';
import InputSubmit from "../Components/InputSubmit";
import SingleSongCard from '../Components/SingleSongCard';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ArtistPage() {
    const navigate = useNavigate();
    const { id } = useParams(); // Access the id parameter from the URL
    const [songs, setSongs] = useState([
        { id: 0, title: 'Test song', authors: "unknown"},
    ]);

    const [info, setInfo] = useState({})
    // Rest of your component code...

    useEffect(() => {
        // Fetch data based on the id parameter
        fetchSongs()

        // Additional useEffect logic as needed...
    }, [id]);
    
    const navigateToHome = () => {
        navigate('/');
    }


    
    const fetchSongs = async () => {
        const url = `http://3.139.233.26:4000/artist/${id}`;
    
        // Create an object to hold the parameters
    
        console.log('Fetching from:', url);
    
        try {
            const response = await axios.get(url);
            const query_data = response.data.data
            console.log('Server Response:', query_data);
            setSongs(query_data.list)
            setInfo(query_data.info)

            setSongs(query_data.list);
        } catch (error) {
            console.error('Search Error:', error);
        }
    };
    
    return (
        <div className='HomePage'>
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
                    <button onClick={navigateToHome}>Back to Home</button>
                </div>
            </div>
            
            <div className="MainDisplay">
                <div className="artistInfoContainer">
                    <img className="artistImage" src={info.cover} alt="Artist Image" />
                    <div className="artistName">{info.name}</div>
                </div>
                {songs.map((song) => (
                    <SingleSongCard 
                        key={song.songId}
                        id={song.songId}
                        title={song.songName}
                    />
                ))}
            </div>
            <MusicPlayerBar />
        </div>
    );
}

export default ArtistPage;
 