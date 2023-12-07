import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const MedalPage = () => {
  const [medalData, setMedalData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/medal');
        setMedalData(response.data.data);
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
      <h1>Medal Page</h1>
      <table style={tableCellStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Country</th>
            <th style={cellStyle}>Gold</th>
            <th style={cellStyle}>Silver</th>
            <th style={cellStyle}>Bronze</th>
            <th style={cellStyle}>Ranks</th>
          </tr>
        </thead>
        <tbody>
          {medalData.map((countryData, index) => (
            <tr key={index}>
              <td style={cellStyle}>{countryData.Country}</td>
              <td style={cellStyle}>{countryData.Gold}</td>
              <td style={cellStyle}>{countryData.Silver}</td>
              <td style={cellStyle}>{countryData.Bronze}</td>
              <td style={cellStyle}>{countryData.Ranks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedalPage;
