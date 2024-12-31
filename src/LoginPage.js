import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './Login.css'

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    // Decode the JWT token to get user information
    const userInfo = jwtDecode(response.credential);
    const userEmail = userInfo.email;

    // Validate the email
    if (userEmail === "imonkar29@gmail.com") {
      console.log("Authorized email, login successful!");
      localStorage.setItem("token", response.credential); // Store the token
      navigate("/display"); // Navigate to the display page
    } else {
      console.log("Unauthorized email, login denied!");
      alert("Access Denied. You are not authorized to log in.");
    }
  };

  const handleLoginFailure = (error) => {
    console.log("Login failed: ", error);
  };

  return (
    <div>
      <h1>Company Stocks</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
};

export default LoginPage;
