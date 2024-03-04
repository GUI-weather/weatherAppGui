// App.js
import './App.css'; // single css file used for all components
import React from 'react';
import MainInfo from './components/mainInfo';
import RightSideMainInfo from './components/rightSideMainInfo';
import HourlyWeatherBox from './components/hourlyWeather';
import WeeklyForecast from './components/weeklyForecast';

function App() {
  const city = 'Krakow'; // this should be based on user location as the time is taken from where the user is 

  return (
    <div className="App">
      <div className="layout">
        <MainInfo city={city} />
        <RightSideMainInfo city={city}/>
        <HourlyWeatherBox city={city}/>
        <WeeklyForecast city={city}/>
      </div>
    </div>
  );
}

export default App;
