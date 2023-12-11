import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Components/UserProvider';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);
      
      const response = await axios.post('http://3.138.175.21:4000/user/login', formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log('Server Response:', response.data);
      const { username, message } = response.data;
      // if response contains a username, it means login was successful
      if (username) {
        setUser({ username, email }); // Update the user context
        // redirect to home page
        navigate('/');
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
        <label>Email</label>
        <input type="email" value={email} onChange={handleEmailChange} />
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
