// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import { UserProvider } from './Components/UserProvider'; // Adjust the path as necessary
import RateePage from './Pages/RateePage';
import MedalPage from './Pages/MedalPage';
import FunFactPage from './Pages/FunFactPage';
import PlayerRankPage from './Pages/PlayerRankPage';


function App() {
  return (
      <UserProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/ratee/:id" element={<RateePage />} />
          <Route path="/medal" element={<MedalPage />} />
          <Route path="/funFact" element={<FunFactPage />} />
          <Route path="/playerRank" element={<PlayerRankPage />} />
        </Routes>
      </UserProvider>
  );
}

export default App;
