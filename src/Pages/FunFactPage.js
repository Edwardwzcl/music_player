import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FunFactPage = () => {
  const [funFactData, setFunFactData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/fun-facts');
        setFunFactData(response.data.data);
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
      <h1>Fun Fact Page</h1>

      {/* First Table */}
      <h2>Fun Fact 1</h2>
      <table style={tableCellStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Discipline</th>
            <th style={cellStyle}>PlayerToCoachRatio</th>
          </tr>
        </thead>
        <tbody>
          {funFactData[0]?.map((fact, index) => (
            <tr key={index}>
              <td style={cellStyle}>{fact.Discipline}</td>
              <td style={cellStyle}>{fact.PlayerToCoachRatio}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Second Table */}
      <h2>Fun Fact 2</h2>
      <table style={tableCellStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Country</th>
            <th style={cellStyle}>Medal_to_Athlete_Ratio</th>
          </tr>
        </thead>
        <tbody>
          {funFactData[1]?.map((fact, index) => (
            <tr key={index}>
              <td style={cellStyle}>{fact.Country}</td>
              <td style={cellStyle}>{fact.Medal_to_Athlete_Ratio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FunFactPage;

