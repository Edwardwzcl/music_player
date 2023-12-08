import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider
import useAuthRedirect from '../Hooks/useAuthRedirect';
import MusicPlayerBar from '../Components/MusicPlayerBar';
import GalleryCard from '../Components/GalleryCard';
import ArtistCard from '../Components/ArtistCard';
import '../StyleSheets/Home.css';
import Dropdown from '../Components/Dropdown';
import InputSubmit from "../Components/InputSubmit";
import LikeRecent from '../Components/LikeRecent';
import axios from 'axios';


function HomePage() {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('category');
    const types = ["song", "artist"]
    // if username is null, redirect to login page
    useAuthRedirect();

    const navigate = useNavigate();

    const [resultList, setResultList] = useState([
        { type: "category", id: 0, name: 'Pop', image: 'https://via.placeholder.com/150' },
    ]);

    React.useEffect(() => {
        // Query all the categories at start
        fetchCategories()
    }, []);

    const fetchCategories = async () => {
        const url = 'http://localhost:4000/genre';
    
        // Create an object to hold the parameters
    
        console.log('Fetching from:', url);
    
        try {
            const response = await axios.get(url);
            const query_data = response.data.data
            console.log('Server Response:', query_data);
            // console.log('Server Response type:', typeof(response.data.data[0]));
            setResultList(query_data);
        } catch (error) {
            console.error('Search Error:', error);
        }
    };

    const fetchSearchResults = async (query) => {
        const url = 'http://localhost:4000/search';
        console.log('Fetching search results from:', url, query);
    
        try {
            const response = await axios.post(url, {
                    content: query
                });
            const query_data = response.data.data['artist']
            console.log('Server Response:', query_data);
            // console.log('Server Response type:', typeof(response.data.data[0]));
            setResultList(query_data);
        } catch (error) {
            console.error('Search Error:', error);
        }
    };
    
                
    
    
    return (
        <div className='HomePage'>
            <div className="UserPanel">
                <div className='homeControlDiv'>
                    <InputSubmit onSubmit={(query) => fetchSearchResults(query)} />
                    <div className='SelectorDiv'>
                        <p>Country:</p>
                        <Dropdown options={types} onOptionSelected={setType} />
                    </div>
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
                {resultList.map((result) => (
                    <GalleryCard 
                        type= {type}
                        id={result.artistId}
                        name={result.artistname}
                        image={result.cover}
                    />
                ))}
                
            </div>
            <MusicPlayerBar />
        </div>
    );
}

export default HomePage;
