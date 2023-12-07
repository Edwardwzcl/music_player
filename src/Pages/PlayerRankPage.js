import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlayerRankPage = () => {
  const [playerRankData, setPlayerRankData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/player-rank');
        setPlayerRankData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const tableCellStyle = {
    width: '100%',
    textAlign: 'center',
  };

  const cellStyle = {
    padding: '8px',
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>Back to Home</button>
      <h1>Player Rank Page</h1>
      
      <table style={tableCellStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Player Rank</th>
            <th style={cellStyle}>RateeId</th>
            <th style={cellStyle}>Score</th>
          </tr>
        </thead>
        <tbody>
          {playerRankData.map((player, index) => (
            <tr key={index}>
              <td style={cellStyle}>{player.Name}</td>
              <td style={cellStyle}>{player.PlayerRank}</td>
              <td style={cellStyle}>{player.RateeId}</td>
              <td style={cellStyle}>{player.Score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerRankPage;

