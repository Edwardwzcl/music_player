import React, { useState } from 'react';
import useAuthRedirect from '../Hooks/useAuthRedirect';
import MusicPlayerBar from '../Components/MusicPlayerBar';
import GalleryCard from '../Components/GalleryCard';
import SingleSongCard from '../Components/SingleSongCard';

import '../StyleSheets/Home.css';
import '../StyleSheets/Page.css';
import InputSubmit from "../Components/InputSubmit";
import LikeRecent from '../Components/LikeRecent';
import Dropdown from '../Components/Dropdown';
import axios from 'axios';

function HomePage() {
    const [type, setType] = useState('song');
    const types = ["song", "artist"]
    const [searchPerformed, setSearchPerformed] = useState(false);
    const genresList = [
        // {
        //   type: "category",
        //   id: 0,
        //   name: 'Pop',
        //   image: 'https://www.gstatic.com/webp/gallery/1.jpg'
        // },
        // {
        //   type: "category",
        //   id: 1,
        //   name: 'Jazz',
        //   image: 'https://source.unsplash.com/150x150/?jazz'
        // },
        // {
        //   type: "category",
        //   id: 2,
        //   name: 'Rock',
        //   image: 'https://www.gstatic.com/webp/gallery/3.jpg'
        // },
        // {
        //   type: "category",
        //   id: 3,
        //   name: 'Hip Hop',
        //   image: 'https://www.gstatic.com/webp/gallery/4.jpg'
        // },
        // {
        //   type: "category",
        //   id: 4,
        //   name: 'Electronic',
        //   image: 'https://www.gstatic.com/webp/gallery/5.jpg'
        // },
        // {
        //   type: "category",
        //   id: 5,
        //   name: 'R&B',
        //   image: 'https://www.gstatic.com/webp/gallery/6.jpg'
        // },
        // {
        //   type: "category",
        //   id: 6,
        //   name: 'Country',
        //   image: 'https://www.gstatic.com/webp/gallery/7.jpg'
        // },
        // {
        //   type: "category",
        //   id: 7,
        //   name: 'Reggae',
        //   image: 'https://www.gstatic.com/webp/gallery/8.jpg'
        // },
        {
          type: "category",
          id: 5002,
          name: 'Classical',
          image: 'http://www.shutterstock.com/image-photo/african-american-jazz-musician-playing-saxophone-257064301'
        }
      ];

      
    const [resultList, setResultList] = useState(genresList);


    // if username is null, redirect to login page
    useAuthRedirect();


    

    React.useEffect(() => {
        // Query all the categories at start
        fetchCategories()
    }, []);

    const fetchCategories = async () => {
        const url = 'http://3.138.175.21:4000/genre';
    
        // Create an object to hold the parameters
    
        console.log('Fetching from:', url);
    
        try {
            const response = await axios.get(url);
            const query_data = response.data.data
            console.log('Server Response:', query_data);
            // console.log('Server Response type:', typeof(response.data.data[0]));
            setResultList(query_data);
        } catch (error) {
            console.error('Search Error:', error);
        }
    };

    const fetchSearchResults = async (query) => {
        const url = 'http://3.138.175.21:4000/search';
        console.log('Fetching search results from:', url, query);
    
        try {
            const response = await axios.post(url, {
                content: query
            });
            
            let query_data;
            if (type === "song") {
                query_data = response.data.data['songs']
            }
            else {
                query_data = response.data.data['artist']
            }
            
            console.log('Server Response:', query_data);
            // console.log('Server Response type:', typeof(response.data.data[0]));
            setResultList(query_data);
            console.log(resultList)
        } catch (error) {
            console.error('Search Error:', error);
        }

        setSearchPerformed(true);
    };
    
    
    const handleDropdownChange = (type) => {
        setType(type);
        setSearchPerformed(false); // Reset searchPerformed when dropdown changes
        setResultList(genresList)
    };
    
    
    return (
        <div className='HomePage'>
            <div className="UserPanel">
                <div className='homeControlDiv'>
                    <div className='SelectorAndInputDiv'>
                        <InputSubmit onSubmit={(query) => fetchSearchResults(query)} />
                        <div className='SelectorDiv'>
                            <Dropdown options={types} onOptionSelected={handleDropdownChange} />
                        </div>
                    </div>
                    <LikeRecent userName={0} type={'Like'} />
                    {/* <LikeRecent userName={0} type={'Recent'} /> */}

                </div>
            </div>

            <div className="MainDisplay">
                {searchPerformed && type === 'song' ? (
                    // Render SingleSongCard for 'song' type
                    resultList.map((song) => (
                        <SingleSongCard 
                            id={song.id}
                            title={song.name}
                            artist={song.artistName}
                        />
                    ))
                ) : (
                    // Render GalleryCard for 'artist' or 'category' type
                    resultList.map((result) => (
                        <GalleryCard 
                            type={searchPerformed ? type : 'category'}
                            id={result.id}
                            name={result.name}
                            image={result.cover}
                        />
                    ))
                )}
            </div>
            <MusicPlayerBar />
        </div>
    );
}

export default HomePage;
