import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SingleSongCard({ id, title}) {
    const navigate = useNavigate();
    const handleClick = () => {
        // Perform action on click
        console.log(` ${title} clicked`);
        navigate(`/song/${id}`);
    };

    return (
        <button className="SingleSongCard" onClick={handleClick}>
            <p>{title}</p>
        </button>
    );
}

export default SingleSongCard;