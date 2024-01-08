import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Components/UserProvider';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, serUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    serUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password.');
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await axios.post('http://3.138.175.21:4000/user/login', formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log('Server Response:', response.data);
      const message = response.data;
      // if response contains a username, it means login was successful
      if (response.status === 200) {
        setUser({ username, email:'unknown' }); // Update the user context
        // redirect to home page
        navigate('/home');
      }
      else {
        alert(message);
      }
      
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="labelledInput">
        <label>Username</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div className="labelledInput">
        <label>Password</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
