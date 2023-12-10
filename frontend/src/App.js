// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SongPage from './Pages/SongPage';
import LoginPage from './Pages/LoginPage';
import ArtistPage from './Pages/ArtistPage';
import CategoryPage from './Pages/CategoryPage';
import { CombinedContextProvider } from './Components/CombinedContextProvider'; // Adjust the path as necessary


function App() {
  return (
      <CombinedContextProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path='/artist/:id' element={<ArtistPage />} /> 
          <Route path='/song' element={<SongPage />} /> 
          <Route path='/category/:id' element={<CategoryPage />} />
        </Routes>
      </CombinedContextProvider>
  );
}

export default App;
