import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ArtistCard({ artistId, artistName, artistImage }) {
    const navigate = useNavigate();
    const handleClick = () => {
        // Perform action on click
        console.log(`Artist ${artistName} clicked`);
        navigate(`/artist/${artistId}`);
    };

    return (
        <button className="ArtistCard" onClick={handleClick}>
            <img src={artistImage} alt={artistName} />
            <p>{artistName}</p>
        </button>
    );
}

export default ArtistCard;
