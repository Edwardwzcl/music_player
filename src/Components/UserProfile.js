import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserProvider';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    // display user info
    const { user } = useContext(UserContext);
    return (
        <div className='userProfile'>
            <h2>Welcome,</h2>
            <h1>{user.username}</h1>
            <h2>{user.email}</h2>
        </div>
    );
}

export default UserProfile;