import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MusicPlayerBar from '../Components/MusicPlayerBar';
import LikeRecent from '../Components/LikeRecent';
import '../StyleSheets/Home.css';
import axios from 'axios';
import SingleSongCard from '../Components/SingleSongCard';
import useAuthRedirect from '../Hooks/useAuthRedirect';

function CategoryPage() {
    useAuthRedirect();
    const navigate = useNavigate();
    const { categoryId } = useParams(); // Access the id parameter from the URL


    const handleClick = () => {
        navigate('/home');
    }

    const [songs, setSongs] = useState([
        { id: 0, title: 'Test song', authors: "unknown"},
    ]);

    const fetchSongUnderCategories = useCallback(async () => {
        console.log('Fetching search results from:', 'http://3.138.175.21:4000/genre', categoryId);
        const body = { id: categoryId };
        try {
            
            const response = await axios.post('http://3.138.175.21:4000/genre', body);
            //const query_data = response.data.data
            console.log('Server Response:', response.data);
            // console.log('Server Response type:', typeof(response.data.data[0]));
            if (response.data.data === null) {
                console.log('No songs found');
                return;
            }
            setSongs(response.data.data);
        } catch (error) {
            console.error('Search Error:', error);
        }
    }, [categoryId]);

    useEffect(() => {
        fetchSongUnderCategories();
    }, [fetchSongUnderCategories]);
    
    
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
                    
                </div>
                <button onClick={handleClick}>Back to Home</button>
            </div>
                
            <div className="MainDisplay">
                <div>
                    <p>Category</p>
                </div>
                {songs.map((song) => (
                    <SingleSongCard 
                        id={song.songId}
                        title={song.songName}
                    />
                ))}
            </div>
            <MusicPlayerBar />
        </div>
    );
}

export default CategoryPage;