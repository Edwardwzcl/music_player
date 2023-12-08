import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GalleryCard({ type, id, name, image}) {
    const navigate = useNavigate();
    const handleClick = () => {
        // Perform action on click
        console.log(` ${name} clicked`);
        navigate(`/${type}/${id}`);
    };

    return (
        <button className="ArtistCard" onClick={handleClick}>
            <img src={image} alt={name} />
            <p>{name}</p>
        </button>
    );
}

export default GalleryCard;
