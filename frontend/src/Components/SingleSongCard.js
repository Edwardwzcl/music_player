import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StyleSheets/SingleSongCard.css';
import { MusicContext } from '../Components/MusicProvider'; // Import MusicProvider

function SingleSongCard({ id, title, artist}) {
    const navigate = useNavigate();

    if (!artist) {
        artist = '';
    }

    const navigateToSong = () => {
        Insert(id)
        // Perform action on click
        console.log(` ${title} ${id} clicked`);

        navigate(`/song`);
    };

    const { Insert} = useContext(MusicContext);


    return (
        <div className='SingleSongCard'>
            <button onClick={navigateToSong}>{title + "   " + artist}</button>
        </div>
    );
}

export default SingleSongCard;