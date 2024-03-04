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
      <h2>{greeting}</h2>
      <h2>{formattedTime}</h2>
      <h2>Humidity: {humidity} %</h2>
      <h2>Pressure: {pressure} Pa</h2>
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
