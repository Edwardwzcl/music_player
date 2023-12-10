import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Components/UserProvider';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
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
    if (!email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    try {
      // Replace with the actual URL of your sign-up API
      const response = await axios.post('http://3.138.175.21:4000/user/register', {
        email,
        username,
        password,
      });

      if (response.status === 200) {
        // Show verification modal
        setShowVerificationModal(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
    }
  };

  const handleVerificationSubmit = async () => {
    try {
      // Replace with the actual URL of your code verification API
      const verificationResponse = await axios.post('http://3.138.175.21:8080/api/user/code', {
        code: verificationCode,
      });

      if (verificationResponse.status === 200) {
        setUser({ username, email });
        // Close the verification modal
        setShowVerificationModal(false);
        // Redirect to home page
        navigate('/');
      } else {
        alert(verificationResponse.data.message);
      }
    } catch (error) {
      console.error('Verification Error:', error);
    }
  };

  return (
    <>
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

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="verification-modal">
          <label>Enter Verification Code</label>
          <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          <button onClick={handleVerificationSubmit}>Confirm</button>
        </div>
      )}
    </>
  );
}

export default Signup;
