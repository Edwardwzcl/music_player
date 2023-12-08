import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider

import MusicPlayerBar from '../Components/MusicPlayerBar';
import ScrollableParagraph from '../Components/ScrollableParagraph';
import ArtistCard from '../Components/ArtistCard';

import '../StyleSheets/Song.css';

function SongPage({ songId }) {
  const navigate = useNavigate();
  const [song, setSong] = useState(
    {
      songId: 1357375695,
      songName: 'Test Song',
      songImage: 'https://via.placeholder.com/150',
      source: '',
      artistId: 0,
      artistName: 'Artist 0',
      artistImage: 'https://via.placeholder.com/150',
      lyrics: '123asdfg123132dfsgnsdfoifhvjsdiunfghvweiovghreignbfdsuog fdsovbuigbhovifdbnuhgiofdhguioedghuifohguiosdghuiofhguifdhguiofsugiofugdfogotrfguhitrfnbiogbdsfnioupbvhdnwsipjfbndrsipghnbeis0thugbi0r-ng'
    });

    const fetchSong = async () => {
        const baseUrl = 'http://localhost:4000/search';
    
        // Create an object to hold the parameters
        const queryParams = {
            songId: 1357375695
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
            setSong(query_data);
        } catch (error) {
            console.error('Search Error:', error);
        }
    };

    useEffect(() => {
        fetchSong();
    }, []);


  return (
          <div className="SongPage">
            <button onClick={() => navigate('/')}>Back</button>
            <img src={song.songImage} alt={song.songName} />
            <h1>{song.songName}</h1>
            <h2>{song.artistName}</h2>
            <p className='scrollable-paragraph'>{song.lyrics}</p>
            <MusicPlayerBar />
          </div> 
  );
}

export default SongPage;
