import React, { useEffect } from "react";
import Login from '../Components/Login';
import SignUp from '../Components/Signup';
import '../StyleSheets/Login.css';
import image1 from '../Assets/o1.jpg';
import image2 from '../Assets/o2.jpg';
import image3 from '../Assets/o3.jpg';

function LoginPage() {

  useEffect(() => {
    const images = document.querySelectorAll('.background-img');
    let currentImage = 0;

    images[currentImage].classList.add('active');

    const interval = setInterval(() => {
      images[currentImage].classList.remove('active');
      currentImage = (currentImage + 1) % images.length;
      images[currentImage].classList.add('active');
    }, 3000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fullscreen">
      <h1 className="title">Olympics Gateway</h1>
      <img src={ image1 } alt="Background 1" className="background-img" />
      <img src={ image2 } alt="Background 2" className="background-img" />
      <img src={ image3 } alt="Background 3" className="background-img" />
      <div className="login-container">
        <SignUp/>
        <Login/>
      </div>
    </div>);
}

export default LoginPage;