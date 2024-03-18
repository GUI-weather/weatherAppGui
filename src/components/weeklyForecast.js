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
            <h1 className='forecastTitle'>Weekly Forecast</h1>
            <div className="forecast-list">
                {dailyForecastData.list.map((forecast, index) => (
                    <div key={index} className="forecast-item">
                        <h3>{new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h3>
                        <p>{forecast.weather[0].description}</p> 
                        <p>{kelvinToCelsius(forecast.temp.day)}°</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeeklyForecast;
