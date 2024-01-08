
import MusicPlayerBar from '../Components/MusicPlayerBar';
import useAuthRedirect from '../Hooks/useAuthRedirect';
import '../StyleSheets/Page.css';
import LikeRecent from '../Components/LikeRecent';
import SingleSongCard from '../Components/SingleSongCard';
import React, { useEffect, useState, useCallback  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ArtistPage() {
    useAuthRedirect();
    const navigate = useNavigate();
    const { id } = useParams(); // Access the id parameter from the URL
    const [songs, setSongs] = useState([
        { id: 0, title: 'Test song', authors: "unknown"},
    ]);

    const [info, setInfo] = useState({})
    // Rest of your component code...
    
    const navigateToHome = () => {
        navigate('/home');
    }


    
    const fetchSongs = useCallback(async () => {
        const url = `http://3.138.175.21:4000/artist/${id}`;
        console.log('Fetching from:', url);
    
        try {
            const response = await axios.get(url);
            const query_data = response.data.data
            console.log('Server Response:', query_data);
            setSongs(query_data.list);
            setInfo(query_data.info);
        } catch (error) {
            console.error('Search Error:', error);
        }
    }, [id]); // Dependency array includes id

    useEffect(() => {
        fetchSongs();
    }, [fetchSongs]);
    
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
                    <img className="artistImage" src={info.cover} alt="Artist" />
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
 