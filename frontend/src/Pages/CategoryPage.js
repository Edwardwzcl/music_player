import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider
import MusicPlayerBar from '../Components/MusicPlayerBar';
import LikeRecent from '../Components/LikeRecent';
import InputSubmit from "../Components/InputSubmit";
import '../StyleSheets/Home.css';
import axios from 'axios';
import SingleSongCard from '../Components/SingleSongCard';
import GalleryCard from '../Components/GalleryCard';

function CategoryPage(categoryId, name, image) {
    const navigate = useNavigate();

    const { id } = useParams();

    const handleClick = () => {
        navigate('/');
    }

    const [songs, setSongs] = useState([
        { id: 0, title: 'Test song', authors: "unknown"},
    ]);


    const fetchSongUnderCategories = async () => {
        const baseUrl = 'http://3.139.233.26:8080/api/search';
    
        // Create an object to hold the parameters
        const queryParams = {
            query: categoryId,
        };
    
        
        // Convert the object to a URL-encoded query string
        const queryString = new URLSearchParams(queryParams).toString();
    
        // Construct the full URL with the query string
        const url = `${baseUrl}?${queryString}`;
    
        console.log('Fetching search results from:', url);
    
        try {
            const response = await axios.get(url);
            const query_data = response.data.result
            console.log('Server Response:', query_data);
            // console.log('Server Response type:', typeof(response.data.data[0]));
            setSongs(query_data);
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
                    
                </div>
                <button onClick={handleClick}>Back to Home</button>
            </div>
                
            <div className="MainDisplay">
                <div>
                    <p>Category</p>
                </div>
                {songs.map((song) => (
                    <SingleSongCard 
                        id={song.id}
                        title={song.title}
                    />
                ))}
            </div>
            <MusicPlayerBar />
        </div>
    );
}

export default CategoryPage;