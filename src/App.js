// App.js
import './App.css'; // single css file used for all components
import React, { useState, useEffect } from 'react';
import MainInfo from './components/mainInfo';
import RightSideMainInfo from './components/rightSideMainInfo';
import HourlyWeatherBox from './components/hourlyWeather';
import WeeklyForecast from './components/weeklyForecast';
import ToggleSwitch from './components/lightModeDarkModeSwitch';
import buttonIcon from './button-icon.svg'; 
import CalendarPage from './components/Calendar';

function App() {
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
        <div className='l-switch'><CalendarPage onClick={handleButtonClick} icon={buttonIcon} /></div>
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
