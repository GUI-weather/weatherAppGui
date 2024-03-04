import React from 'react';
import { useWeatherData } from './ApiManager';
import { kelvinToCelsius } from './reusable';

function WeeklyForecast({ city }) {
  const { dailyForecastData } = useWeatherData(city);

  if (!dailyForecastData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weekly-forecast-box">
      <h2>Weekly Forecast for {city}</h2>
      <div className="forecast-list">
        {dailyForecastData.list.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <h3>{forecast.dt_txt}</h3>
            <p>Description: {forecast.weather[0].description}</p>
            <p>Temperature: {kelvinToCelsius(forecast.main.temp)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyForecast;
