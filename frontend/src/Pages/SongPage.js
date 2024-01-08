import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider

import MusicPlayerBar from '../Components/MusicPlayerBar';
import useAuthRedirect from '../Hooks/useAuthRedirect';
import '../StyleSheets/Song.css';

function SongPage() {
  useAuthRedirect();
  const navigate = useNavigate();

  const lyricRef = useRef(null);

  // useEffect(() => {
  //   fetchSong();
  // }, [id]);

  const {
    currSong, 
    realTime,
    playlist,
    currentTrackIndex} = useContext(MusicContext);

  const [song, setSong] = useState(
    {
      songId: 1357375695,
      songName: 'Song Page',
      songImage: 'https://via.placeholder.com/150',
      url: '',
      artistId: 0,
      artistName: 'Artist 0',
      artistImage: 'https://via.placeholder.com/150',
      lyric: ''
    });

    // const fetchSong = async () => {

    //     const songURL = 'http://3.138.175.21:4000/song/' + id;
    //     console.log('Fetching search results from:', songURL);
    
    //     try {
    //         const response = await axios.get(songURL);
    //         const songData = response.data.data;
    //         console.log('Server Response:', songData);
    //         setSong({
    //           songId: songData.songId,
    //           songName: songData.songName,
    //           songImage: songData.cover,
    //           url: songData.url,
    //           artistId: songData.artistId,
    //           artistName: songData.artistName,
    //           artistImage: songData.cover,
    //           lyric: songData.lyric
    //         });
    //         Insert(songData.url);
    //     } catch (error) {
    //         console.error('Search Error:', error);
    //     }
    // };

  useEffect(() => {
    if (!playlist[currentTrackIndex]) return;
    setSong(currSong);
  }, [currSong, playlist, currentTrackIndex]);

  const parselyric = (lyric) => {
    if (!lyric || lyric.length === 0) return [];
  
    return lyric.split('\n').map((line, index) => {
      const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseFloat(match[2]);
        const time = minutes * 60 + seconds;
        return { time, text: match[3].trim() };
      }
  
      // Handle lines without timestamps or malformed timestamps
      // You can assign a null time or calculate an estimated time based on index
      return { time: null, text: line.trim() };
    }).filter(line => line.text); // Filter out empty lines
  };
  
  
  
  const findScrollPosition = (realTime, parsedlyric) => {
    if (parsedlyric.length === 0) return 0;
    // Example logic - this would need refinement
    // Find the index of the current line
    let currentLineIndex = parsedlyric.findIndex(lyric => lyric.time > realTime) - 1;
    if (currentLineIndex < 0) currentLineIndex = 0;

    // Calculate the scroll position - this is a placeholder and needs actual logic
    // based on your layout, font size, etc.
    return currentLineIndex * 20; // Assuming each line takes up 20px
  };
  useEffect(() => {
    const parsedlyric = parselyric(song.lyric);
    const scrollPosition = findScrollPosition(realTime, parsedlyric);

    if (lyricRef.current) {
        lyricRef.current.scrollTop = scrollPosition;
    }
  }, [realTime, song.lyric]);


  


  return (
          <div className="SongPage">
            <button className='navControl' onClick={() => navigate('/home')}>Home</button>
            <img src={song.songImage} alt={song.songName} />
            <h1>{song.songName}</h1>
            <h2>{song.artistName}</h2>
            <div className='scrollable-paragraph' ref={lyricRef}>
    {parselyric(song.lyric).map((line, index) => (
        <div key={index}>{line.text}</div>
    ))}
</div>
            <MusicPlayerBar />
          </div> 
  );
}

export default SongPage;
