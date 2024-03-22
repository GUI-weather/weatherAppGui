// App.js
import './App.css'; // single css file used for all components
import React, { useState, useEffect } from 'react';
import MainInfo from './components/mainInfo';
import RightSideMainInfo from './components/rightSideMainInfo';
import HourlyWeatherBox from './components/hourlyWeather';
import WeeklyForecast from './components/weeklyForecast';
import ToggleSwitch from './components/lightModeDarkModeSwitch';
import Modal from 'react-modal';
import Calendar from './components/CalendarBox'; 
import calendarIcon from './images/calendar.svg'

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [lat, setLat] = useState(null); // State variable to store latitude
  const [long, setLong] = useState(null); // State variable to store longitude

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Get current position using geolocation
      navigator.geolocation.getCurrentPosition(function (position) {
        // Update latitude state with current latitude
        setLat(position.coords.latitude);
        // Update longitude state with current longitude
        setLong(position.coords.longitude);
      });
    } else {
      // Log a message if geolocation is not available in the browser
      console.log("Location is not available in your browser. Please use a different browser to get the full experience.");
    }
  }, []); // Empty dependency array to ensure useEffect only runs once

  //useState is a React Hook used for managing state in functional components.
  //It initializes the state variable isLightTheme and a function setIsLightTheme to update.
  //The initial state is determined by checking the value stored in the localStorage with the key 'theme'
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme'); //Retrieve the theme value from localStorage
    return storedTheme ? JSON.parse(storedTheme) : true; //If a theme is stored, parse it from JSON; otherwise return to normal theme(light theme)
  });
  
  // toggleTheme is a function that toggles the current theme.
  const toggleTheme = () => {
    setIsLightTheme(prevTheme => {
      const newTheme = !prevTheme; //Set the new theme by negating the previous theme
      localStorage.setItem('theme', JSON.stringify(newTheme)); //Store the new theme value in localStorage
      return newTheme; //Return the new theme value to update the state.
    })
  }

  //themeClass determines the CSS class to apply based on the current theme.
  const themeClass = isLightTheme ? "theme-light" : "theme-dark";

  // Placeholder function for handleButtonClick
  const handleButtonClick = () => {
    window.location.href = "CalendarBox.js";
  };


  //The JSX includes the ToggleSwitch component with toggleTheme and isLightTheme props.
  return (
    <div className={`App ${themeClass}`}>
      <div className="layout">
        <div className='calendarButton'>
        <svg fill="none" height="60" viewBox="0 0 24 24" width="60" xmlns="http://www.w3.org/2000/svg" alt="Calendar" onClick={openModal}>
          <g fill="currentColor">
              <path d="m8 5.75c-.41 0-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75z"/>
              <path d="m16 5.75c-.41 0-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75z"/>
              <path d="m15 22.75h-6c-5.62 0-6.75-2.65-6.75-6.93v-6.17c0-4.74 1.6-6.67 5.71-6.9h8.04.04c4.11.23 5.71 2.16 5.71 6.9v6.17c0 4.28-1.13 6.93-6.75 6.93zm-7-18.5c-2.8.16-4.25 1.04-4.25 5.4v6.17c0 3.83.73 5.43 5.25 5.43h6c4.52 0 5.25-1.6 5.25-5.43v-6.17c0-4.35-1.44-5.24-4.27-5.4z"/>
              <path d="m20.75 18.3501h-17.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h17.5c.41 0 .75.34.75.75s-.34.75-.75.75z"/>
              <path d="m12 8.25c-1.23 0-2.27.67-2.27 1.97 0 .62.29 1.09.73 1.39-.61.36-.96.94-.96 1.62 0 1.24.95 2.01 2.5 2.01 1.54 0 2.5-.77 2.5-2.01 0-.68-.35-1.27-.97-1.62.45-.31.73-.77.73-1.39 0-1.3-1.03-1.97-2.26-1.97zm0 2.84c-.52 0-.9-.31-.9-.8 0-.5.38-.79.9-.79s.9.29.9.79c0 .49-.38.8-.9.8zm0 2.91c-.66 0-1.14-.33-1.14-.93s.48-.92 1.14-.92 1.14.33 1.14.92c0 .6-.48.93-1.14.93z"/>
          </g>
        </svg>
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Calendar Modal">
          <Calendar/>
          <button onClick={closeModal}>Close</button>
        </Modal>
        </div>
        <div className='switch'><ToggleSwitch toggleTheme={toggleTheme} isLightTheme={isLightTheme} /></div>
        <div className='mainColumn'><MainInfo lat={lat} long={long} /></div>
        <div className='rightMainColumn'><RightSideMainInfo lat={lat} long={long}/></div>
        <div className='hourlyColumn'><HourlyWeatherBox lat={lat} long={long}/></div>
        <div className='weeklyColumn'><WeeklyForecast lat={lat} long={long}/></div>
      </div>
    </div>
  );
}

export default App;
