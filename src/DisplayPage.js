import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DisplayPage.css';

const DisplayPage = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const [data, setData] = useState({
    screen1: [],
    screen2: [],
    screen3: []
  });

  const navigate = useNavigate();

  // Function to fetch data for a specific screen
  const fetchData = (screenNumber) => {
    fetch('http://127.0.0.1:5000/api/companies')
      .then((response) => response.json())
      .then((fetchedData) => {
        setData((prevData) => ({
          ...prevData,
          [`screen${screenNumber}`]: fetchedData
        }));
      })
      .catch((error) => console.error(`Error fetching data for screen ${screenNumber}:`, error));
  };

  // Fetch data when active screen changes or every 5 seconds
  useEffect(() => {
    if (activeScreen !== null) {
      fetchData(activeScreen + 1); // Fetch data for the active screen (1-based index)

      const interval = setInterval(() => {
        fetchData(activeScreen + 1);
      }, 5000); // Refetch every 5 seconds

      return () => clearInterval(interval); // Clear the interval on unmount or screen change
    }
  }, [activeScreen]);

  const handleScreenChange = (screenNum) => {
    setActiveScreen(screenNum);
  };

  const handleBack = () => {
    navigate('/');
  };

  const renderTable = (screenData) => (
    <table className="company-table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Stock Price</th>
        </tr>
      </thead>
      <tbody>
        {screenData.map((item, index) => (
          <tr key={index}>
            <td>{item.Company}</td>
            <td>{item.Score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="display-container">
      <div className="left-side">
        <h2>Company Stocks</h2>
        <button onClick={() => handleScreenChange(0)}>Screen 1</button>
        <button onClick={() => handleScreenChange(1)}>Screen 2</button>
        <button onClick={() => handleScreenChange(2)}>Screen 3</button>
        <button onClick={handleBack}>Back</button>
      </div>

      <div className="right-side">
        {activeScreen === 0 && data.screen1.length > 0 && renderTable(data.screen1)}
        {activeScreen === 1 && data.screen2.length > 0 && renderTable(data.screen2)}
        {activeScreen === 2 && data.screen3.length > 0 && renderTable(data.screen3)}
        {(activeScreen === 0 && data.screen1.length === 0) ||
         (activeScreen === 1 && data.screen2.length === 0) ||
         (activeScreen === 2 && data.screen3.length === 0) && (
          <p>Click to load data</p>
        )}
      </div>
    </div>
  );
};

export default DisplayPage;
