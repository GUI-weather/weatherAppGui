import React from 'react';
import { useWeatherData } from './ApiManager';
import { kelvinToCelsius } from './reusable';

function HourlyWeatherBox({ city }) {
  const { forecastData } = useWeatherData(city);

  if (!forecastData) {
    return <div>Loading...</div>;
  }

  // Extract the next 5 hours of forecast data
  const next5HoursForecast = forecastData.list.slice(0, 5);

  return (
    <div className="hourly-weather-box">
      <div className="hourly-weather-list">
        {next5HoursForecast.map((forecast, index) => (
          <div key={index} className="hourly-weather-item">
            <h3>{forecast.dt_txt}</h3>
            <h4>{forecast.weather[0].description}</h4>
            <h3>{kelvinToCelsius(forecast.main.temp)}°</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyWeatherBox;
