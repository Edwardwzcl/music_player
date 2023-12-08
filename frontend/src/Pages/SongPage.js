import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider

import MusicPlayerBar from '../Components/MusicPlayerBar';
import ScrollableParagraph from '../Components/ScrollableParagraph';
import ArtistCard from '../Components/ArtistCard';

import '../StyleSheets/Song.css';

function SongPage() {
  const navigate = useNavigate();
  const {songId} = useParams();
  const lyricsRef = useRef(null);

  useEffect(() => {
    fetchSong();
  }, [songId]);

  const { isPlaying, 
    TogglePlay, 
    currentTime, 
    realTime,
    SeekTowards, 
    playlist,
    setPlaylist, 
    Insert,
    currentTrackIndex,
    setCurrentTrackIndex } = useContext(MusicContext);

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

        const songURL = 'http://localhost:4000/song/' + songId;
        console.log('Fetching search results from:', songURL);
    
        try {
            const response = await axios.get(songURL);
            const songData = response.data.data;
            console.log('Server Response:', songData);
            setSong({
              songId: songData.songId,
              songName: songData.songName,
              songImage: songData.cover,
              source: songData.url,
              artistId: songData.artistId,
              artistName: songData.artistName,
              artistImage: songData.cover,
              lyrics: songData.lyric
            });
            Insert(songData.url);
        } catch (error) {
            console.error('Search Error:', error);
        }
    };

    const parseLyrics = (lyrics) => {
      return lyrics.split('\n').map(line => {
          const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
          if (match) {
              const minutes = parseInt(match[1], 10);
              const seconds = parseFloat(match[2]);
              const time = minutes * 60 + seconds;
              return { time, text: match[3] };
          }
          return null;
      }).filter(line => line !== null);
  };
  
  
  const findScrollPosition = (realTime, parsedLyrics) => {
    if (parsedLyrics.length === 0) return 0;
    // Example logic - this would need refinement
    // Find the index of the current line
    let currentLineIndex = parsedLyrics.findIndex(lyric => lyric.time > realTime) - 1;
    if (currentLineIndex < 0) currentLineIndex = 0;

    // Calculate the scroll position - this is a placeholder and needs actual logic
    // based on your layout, font size, etc.
    return currentLineIndex * 20; // Assuming each line takes up 20px
};
useEffect(() => {
  const parsedLyrics = parseLyrics(song.lyrics);
  const scrollPosition = findScrollPosition(realTime, parsedLyrics);

  if (lyricsRef.current) {
      lyricsRef.current.scrollTop = scrollPosition;
  }
}, [realTime, song.lyrics]);


  


  return (
          <div className="SongPage">
            <button onClick={() => navigate('/')}>Back</button>
            <img src={song.songImage} alt={song.songName} />
            <h1>{song.songName}</h1>
            <h2>{song.artistName}</h2>
            <div className='scrollable-paragraph' ref={lyricsRef}>
    {parseLyrics(song.lyrics).map((line, index) => (
        <div key={index}>{line.text}</div>
    ))}
</div>
            <MusicPlayerBar />
          </div> 
  );
}

export default SongPage;
