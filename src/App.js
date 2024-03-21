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

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Constant variables used for the calendar popup, when opened and closed
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


  //The JSX includes the ToggleSwitch component with toggleTheme and isLightTheme props.
  return (
    <div className={`App ${themeClass}`}>
      <div className="layout">
        <div className='calendarButton'>
        <svg height="60" viewBox="0 0 24 24" width="60" xmlns="http://www.w3.org/2000/svg" alt="Calendar" onClick={openModal}>
          <path fill="currentColor" class="heroicon-ui" d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h2V3a1 1 0 1 1 2 0v1h6V3a1 1 0 0 1 2 0v1zm-2 2H9v1a1 1 0 1 1-2 0V6H5v4h14V6h-2v1a1 1 0 0 1-2 0V6zm4 6H5v8h14v-8z"/>
        </svg>
        <Modal className="calendarModal" isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="CalendarModal" >
          <Calendar/>
          <button className="closeCalendar"onClick={closeModal}>Close</button>
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
