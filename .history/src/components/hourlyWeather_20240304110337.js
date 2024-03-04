import React from 'react';
import { useWeatherData } from './ApiManager';

function HourlyWeatherBox({ city }) {
  const { forecastData } = useWeatherData(city);

  if (!forecastData) {
    return <div>Loading...</div>;
  }

  // Extract the next 5 hours of forecast data
  const next5HoursForecast = forecastData.list.slice(0, 5);

  return (
    <div className="hourly-weather-box">
      <h2>Hourly Weather for {city}</h2>
      <div className="hourly-weather-list">
        {next5HoursForecast.map((forecast, index) => (
          <div key={index} className="hourly-weather-item">
            <p>Time: {forecast.dt_txt}</p>
            <p>Temperature: {forecast.main.temp}</p>
            <p>Description: {forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyWeatherBox;
