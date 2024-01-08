import MusicPlayerBar from '../Components/MusicPlayerBar';
import useAuthRedirect from '../Hooks/useAuthRedirect';
import '../StyleSheets/Page.css';
import SingleSongCard from '../Components/SingleSongCard';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Components/UserProvider';
import { MusicContext } from '../Components/MusicProvider';
import axios from 'axios';

function LikePage() {
    useAuthRedirect();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    
    const [likedSongs, setLikedSongs] = useState([
        { id: 0, title: 'Test song', authors: "unknown"},
    ]);

    const { setPlaylist } = useContext(MusicContext);

    const AddAllToPlaylist = () => {
        if (likedSongs.length === 0) return;
        // setPlaylist, but only use the id
        const newPlaylist = likedSongs.map((song) => song['id']);
        setPlaylist(newPlaylist);
    }

    
    const navigateToHome = () => {
        navigate('/home');
    }


    


    useEffect(() => {
        const fetchLikes = async () => {
            console.log('Fetching likes for:', user.username);
            const url = `http://3.138.175.21:4000/like?username=${user.username}`;
            //const url = `http://3.138.175.21:4000/like`;
            
            console.log('Fetching from:', url);
        
            try {
                const response = await axios.get(url);
                const query_data = response.data.data;
                console.log('Server Response:', query_data);
                setLikedSongs(query_data);
        
            } catch (error) {
                console.error('Search Error:', error);
            }
        };
        fetchLikes();
    }, [user.username]);
    
    return (
        <div className='Page'>
            <div className="UserPanel">
                <div className='homeControlDiv'>
                    <button onClick={navigateToHome}>Back to Home</button>
                </div>
            </div>
            
            <div className="MainDisplay">
                <button onClick={AddAllToPlaylist}>Add All To Plalist</button>
                {likedSongs.map((song) => (
                    <SingleSongCard 
                        id={song.id}
                        title={song.name===null ? 'Unknown' : song.name}
                    />
                ))}
            </div>
            <MusicPlayerBar />
        </div>
    );
}

export default LikePage;