import React from 'react';
import { useWeatherData } from './ApiManager';

function RightSideMainInfo({ city }) {
  const { weatherData, error } = useWeatherData(city);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Extract relevant data from the weather data
  const humidity = weatherData.main?.humidity;
  const pressure = weatherData.main?.pressure;
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const greeting = getGreeting(hours);
  const minutes = currentTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

  return (
    <div className="right-side-main-info">
      <div className="right-side-main-info-list">
        <div className="right-side-main-info-list-firstHalf">
          <h1 className='greeting'>{greeting}</h1>
          <h1 className="time">{formattedTime}</h1>
        </div>
        <div className="right-side-main-info-list-secondHalf">
          <h2 className="humidity">Humidity : {humidity} %</h2>
          <h2 className="pressure">Pressure : {pressure} Pa</h2>
        </div>
      </div>
    </div>
  );
}

function getGreeting(hours) {
  let greeting = '';
  if (hours < 12) {
    greeting = 'Good Morning';
  } else if (hours >= 12 && hours < 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }
  return greeting;
}

export default RightSideMainInfo;
