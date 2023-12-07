import { useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../Components/UserProvider';

export default function useAuthRedirect() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    // check is user.username is null
    useEffect(() => {
        if (user.username === null) {
            console.log('Not logged in, redirecting...');
            navigate('/login');
        }
    }, [navigate]);
}
