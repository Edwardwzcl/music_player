// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SongPage from './Pages/SongPage';
import LoginPage from './Pages/LoginPage';
import ArtistPage from './Pages/ArtistPage';
import CategoryPage from './Pages/CategoryPage';
import LikePage from './Pages/LikePage';
import RecentPage from './Pages/RecentPage';
import { CombinedContextProvider } from './Components/CombinedContextProvider'; // Adjust the path as necessary


function App() {
  return (
      <CombinedContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/artist/:id' element={<ArtistPage />} /> 
          <Route path='/song' element={<SongPage />} /> 
          <Route path='/category/:categoryId' element={<CategoryPage />} />
          <Route path='/like' element={<LikePage />} />
          <Route path='/recent' element={<RecentPage />} />
        </Routes>
      </CombinedContextProvider>
  );
}

export default App;
