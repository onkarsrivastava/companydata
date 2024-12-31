import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DisplayPage.css";

const DisplayPage = () => {
  const [data, setData] = useState([]);
  const [screen, setScreen] = useState("screen1");
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found!");
      return;
    }

    // Log the token to ensure it's being fetched correctly
    console.log("Fetched Token: ", token);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/companies", {
        method: "GET", // Ensure the method is GET
        headers: {
          Authorization: `Bearer ${token}`, // Send the token with Bearer scheme
        },
      });

      // Log the request headers for debugging
      console.log("Request Headers:", response.headers);

      if (response.status === 403) {
        console.error("Unauthorized: Invalid or expired token");
        navigate("/");
        return;
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId);
  }, [screen, navigate]);

  const changeScreen = (screenName) => {
    setScreen(screenName);
  };

  return (
    <div className="display-container">
      <div className="button-container">
        <button onClick={() => changeScreen("screen1")}>Screen 1</button>
        <button onClick={() => changeScreen("screen2")}>Screen 2</button>
        <button onClick={() => changeScreen("screen3")}>Screen 3</button>
        <button onClick={() => changeScreen("screen4")}>Screen 4</button>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
      <div className="table-container">
        <h2>Company Stocks</h2>
        {data.length > 0 ? (
          <table className="company-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.Company}</td>
                  <td>{item.Score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DisplayPage;

