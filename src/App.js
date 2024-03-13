// App.js
import './App.css'; // single css file used for all components
import React, { useState } from 'react';
import MainInfo from './components/mainInfo';
import RightSideMainInfo from './components/rightSideMainInfo';
import HourlyWeatherBox from './components/hourlyWeather';
import WeeklyForecast from './components/weeklyForecast';
import ToggleSwitch from './components/lightModeDarkModeSwithc';

function App() {
  

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
  const themeClass = isLightTheme ? "theme-dark" : "theme-light";

  const city = 'Krakow'; // this should be based on user location as the time is taken from where the user is 


  //The JSX includes the ToggleSwitch component with toggleTheme and isLightTheme props.
  return (
    <div className={`App ${themeClass}`}>
      <div className="layout">
        <ToggleSwitch toggleTheme={toggleTheme} isLightTheme={isLightTheme} />
        <MainInfo city={city} />
        <RightSideMainInfo city={city}/>
        <HourlyWeatherBox city={city}/>
        <WeeklyForecast city={city}/>
      </div>
    </div>
  );
}

export default App;
