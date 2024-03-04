import React from 'react';
import { useWeatherData } from './ApiManager';
import { kelvinToCelsius } from './reusable';

function WeeklyForecast({ city }) {
  const { forecastData } = useWeatherData(city);

  if (!forecastData) {
    return <div>Loading...</div>;
  }

  // Extract the next 7 days of forecast data
  const next7DaysForecast = forecastData.list.slice(0, 7);

  return (
    <div className="weekly-forecast-box">
      <h2>Weekly Forecast for {city.name}</h2>
      <div className="forecast-list">
        {next7DaysForecast.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <h3>{new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
            <p>Description: {forecast.weather[0].description}</p>
            <p>Temperature: {kelvinToCelsius(forecast.temp.day)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyForecast;
