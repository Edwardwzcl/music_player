import MusicPlayerBar from '../Components/MusicPlayerBar';

import '../StyleSheets/Page.css';
import SingleSongCard from '../Components/SingleSongCard';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecentPage() {
    const navigate = useNavigate();
    
    const [songs, setSongs] = useState([
        { id: 0, title: 'Test song', authors: "unknown"},
    ]);

    
    const navigateToHome = () => {
        navigate('/home');
    }


    
    const fetchRecent = async (username) => {
        // const url = `http://3.138.175.21:4000/recent?username=${user.username}`;
        const url = `http://3.138.175.21:4000/recent`
    
        console.log('Fetching from:', url);
    
        try {
            const response = await axios.get(url);
            const query_data = response.data.data;
            console.log('Server Response:', query_data);
            setSongs(query_data.list);
    
        } catch (error) {
            console.error('Search Error:', error);
        }
    };

    useEffect(() => {
        fetchRecent();
    }, []);
    
    return (
        <div className='Page'>
            <div className="UserPanel">
                <div className='homeControlDiv'>
                    <button onClick={navigateToHome}>Back to Home</button>
                </div>
            </div>
            
            <div className="MainDisplay">
                {songs.map((song) => (
                    <SingleSongCard 
                        id={song.id}
                        title={song.name}
                    />
                ))}
            </div>
            <MusicPlayerBar />
        </div>
    );
}

export default RecentPage;