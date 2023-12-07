import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../Components/UserProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import useAuthRedirect from "../Hooks/useAuthRedirect";
import UserProfile from '../Components/UserProfile';
import InputSubmit from "../Components/InputSubmit";
import RadialSelector from '../Components/RadialSelector';
import RateeCard from '../Components/RateeCard';
import Dropdown from '../Components/Dropdown';
import '../StyleSheets/Home.css';


function HomePage() {
    const [query, setQuery] = useState('');

    const [searchResults, setSearchResults] = useState([]);
    // if username is null, redirect to login page
    useAuthRedirect();

    // whenever table or searchTerm changes, submit the search
    React.useEffect(() => {
    }, []);




    // reset function
    // const reset = () => {
    //     setCountry('');
    //     setTable(tables[0]);
    //     setName('');
    //     setOrder('');
    //     setOrderBy('');
    // };

    const fetchSearchResults = async () => {
        const baseUrl = 'http://localhost:8080/api/search';
        const searchQuery = query || '';
    
        // Create an object to hold the parameters
        const queryParams = {
            query: searchQuery,
        };
    
        
        // Convert the object to a URL-encoded query string
        const queryString = new URLSearchParams(queryParams).toString();
    
        // Construct the full URL with the query string
        const url = `${baseUrl}?${queryString}`;
    
        console.log('Fetching search results from:', url);
    
        try {
            const response = await axios.get(url);
            const query_data = response.data.result
            console.log('Server Response:', query_data);
            // console.log('Server Response type:', typeof(response.data.data[0]));
            setSearchResults(query_data);
        } catch (error) {
            console.error('Search Error:', error);
        }
    };
    

    return (
        <div className='homeDiv'>
            
            <div className='homeControlDiv'>
                
                <UserProfile />
                <InputSubmit onSubmit={setQuery} />
                
                
            </div>
            <div className='homeDisplayDiv'>
                <div className='SelectorDivRow'>
                </div>
                <h1>Search Results</h1>
                <div className='SearchResults'>
                    {searchResults.map((result) => (
                        <RateeCard
                            RateeId = {result.RateeId}
                            Name={result.Name}
                            Country={result.Country}
                            Discipline={result.Discipline}
                        />
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default HomePage;