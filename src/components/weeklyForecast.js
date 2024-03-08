import React from 'react';
import { useWeatherData } from './ApiManager';
import { kelvinToCelsius } from './reusable';

// CHANGE BY ALESHA
// Replaced the date description to following:
//<h3>{new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h3>
// it gives the day shortened rather than the entire date

function WeeklyForecast({ city }) {
    const { dailyForecastData } = useWeatherData(city);

    if (!dailyForecastData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="weekly-forecast-box">
            <div className="forecast-list">
                {dailyForecastData.list.map((forecast, index) => (
                    <div key={index} className="forecast-item">
                        {/* <h3>{new Date(forecast.dt * 1000).toLocaleDateString()}</h3>  */}
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
