import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider
import useAuthRedirect from '../Hooks/useAuthRedirect';
import MusicPlayerBar from '../Components/MusicPlayerBar';
import ArtistCard from '../Components/ArtistCard';
import '../StyleSheets/Page.css';
import InputSubmit from "../Components/InputSubmit";
import LikeRecent from '../Components/LikeRecent';
import SpotifyPlayer from 'react-spotify-web-playback';

function HomePage() {
    const [query, setQuery] = useState('');

    const [searchResults, setSearchResults] = useState([]);
    // if username is null, redirect to login page
    useAuthRedirect();

    // whenever table or searchTerm changes, submit the search
    React.useEffect(() => {
    }, []);



    // const fetchSearchResults = async () => {
    //     const baseUrl = 'http://localhost:8080/api/search';
    //     const searchQuery = query || '';
    
    //     // Create an object to hold the parameters
    //     const queryParams = {
    //         query: searchQuery,
    //     };
    
        
    //     // Convert the object to a URL-encoded query string
    //     const queryString = new URLSearchParams(queryParams).toString();
    
    //     // Construct the full URL with the query string
    //     const url = `${baseUrl}?${queryString}`;
    
    //     console.log('Fetching search results from:', url);
    
    //     try {
    //         const response = await axios.get(url);
    //         const query_data = response.data.result
    //         console.log('Server Response:', query_data);
    //         // console.log('Server Response type:', typeof(response.data.data[0]));
    //         setSearchResults(query_data);
    //     } catch (error) {
    //         console.error('Search Error:', error);
    //     }
    // };
    
                
    const navigate = useNavigate();

    const [artists, setArtists] = useState([
        { artistId: 0, artistName: 'Artist 0', artistImage: 'https://via.placeholder.com/150' },
    ]);
    
    return (
        <div className='Page'>
            <div className="UserPanel">
                <div className='homeControlDiv'>
                    <InputSubmit onSubmit={setQuery} />
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
                {artists.map((artist) => (
                    <ArtistCard 
                        key={artist.artistId}
                        artistId={artist.artistId}
                        artistName={artist.artistName}
                        artistImage={artist.artistImage}
                    />
                ))}
            </div>
            <MusicPlayerBar />
        </div>
    );
}

export default HomePage;
