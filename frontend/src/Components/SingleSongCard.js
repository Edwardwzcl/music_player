import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../StyleSheets/SingleSongCard.css';


function SingleSongCard({ id, title, authors}) {
    const navigate = useNavigate();
    const navigateToSong = () => {
        // Perform action on click
        console.log(` ${title} clicked`);
        navigate(`/song/${id}`);
    };

    return (
        <div className='SingleSongCard'>
            <h2>
                <span onClick={navigateToSong}>{title}</span>
            </h2>
        </div>
    );
}

export default SingleSongCard;