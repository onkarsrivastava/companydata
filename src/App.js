import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./LoginPage";
import DisplayPage from "./DisplayPage";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="601501315404-b00slmq7l8g6u7rtlqirmjohvgqchc6k.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/display" element={<DisplayPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
