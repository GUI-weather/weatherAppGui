import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from './WeatherManager';

function MainInfo() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch weather data when the component mounts
    async function fetchData() {
      const city = 'London'; // Default city
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    }

    fetchData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // Extract relevant data from the weather data
  const cityName = weatherData.name;
  const currentTemperature = weatherData.main.temp;
  const highTemperature = weatherData.main.temp_max;
  const lowTemperature = weatherData.main.temp_min;

  return (
    <div className="main-info">
      <h1>{currentTemperature}°</h1>
      <h2>{cityName}</h2>
      <h3>H: {highTemperature}° L: {lowTemperature}°</h3>
    </div>
  );
}

export default MainInfo;
