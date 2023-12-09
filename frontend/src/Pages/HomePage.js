import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider
import useAuthRedirect from '../Hooks/useAuthRedirect';
import MusicPlayerBar from '../Components/MusicPlayerBar';
import GalleryCard from '../Components/GalleryCard';
import SingleSongCard from '../Components/SingleSongCard';
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
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [resultList, setResultList] = useState([
        { type: "category", id: 0, name: 'Pop', image: 'https://via.placeholder.com/150' },
    ]);


    // if username is null, redirect to login page
    useAuthRedirect();

    const navigate = useNavigate();

    

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
            
            let query_data;
            if (type == "song") {
                query_data = response.data.data['songs']
            }
            else {
                query_data = response.data.data['artist']
            }
            
            console.log('Server Response:', query_data);
            // console.log('Server Response type:', typeof(response.data.data[0]));
            setResultList(query_data);
            console.log(resultList)
        } catch (error) {
            console.error('Search Error:', error);
        }

        setSearchPerformed(true);
    };
    
    
    const handleDropdownChange = (type) => {
        setType(type);
        setSearchPerformed(false); // Reset searchPerformed when dropdown changes
        setResultList([])
    };
    
    
    return (
        <div className='HomePage'>
            <div className="UserPanel">
                <div className='homeControlDiv'>
                    <div className='SelectorAndInputDiv'>
                        <InputSubmit onSubmit={(query) => fetchSearchResults(query)} />
                        <div className='SelectorDiv'>
                            <Dropdown options={types} onOptionSelected={handleDropdownChange} />
                        </div>
                    </div>
                    <LikeRecent userID={0} type={'Like'} />
                    <LikeRecent userID={0} type={'Recent'} />

                </div>
            </div>

            <div className="MainDisplay">
                {searchPerformed && type === 'song' ? (
                    // Render SingleSongCard for 'song' type
                    resultList.map((song) => (
                        <SingleSongCard 
                            id={song.id}
                            title={song.name}
                        />
                    ))
                ) : (
                    // Render GalleryCard for 'artist' or 'category' type
                    resultList.map((result) => (
                        <GalleryCard 
                            type={type}
                            id={result.id}
                            name={result.name}
                            image={result.cover}
                        />
                    ))
                )}
            </div>
            <MusicPlayerBar />
        </div>
    );
}

export default HomePage;
