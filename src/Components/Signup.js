import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Components/UserProvider';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !username.trim()) {
        alert('Please enter both email and username.');
        return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    try {
      // Replace with the actual URL of your sign-up API
      const response = await axios.post('http://localhost:8080/api/registration', {
        email,
        username,
        password
      });
      console.log('Server Response:', response.data);
      if (response.status === 200)  {
        setUser({ username, email }); // Update the user context
        // redirect to home page
        navigate('/');
      }
      else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="labelledInput">
        <label>Email</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div className="labelledInput">
        <label>Username</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div className="labelledInput">
        <label>Password</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div className="labelledInput">
        <label>Confirm Password</label>
        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
