import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../StyleSheets/LikeRecent.css';

function LikeRecent({ userID, type }) {
    const navigate = useNavigate();

    const navigateToListView = () => {
        if (type == "Like") {
            navigate(`/like`);
        }
        else {
            navigate(`/recent`);
        }
    };

    

    const displayName = type

    return (
        <div className='LRCard'>
            <h2>
                <span onClick={navigateToListView}>{displayName}</span>
            </h2>
        </div>
    );
}

export default LikeRecent;