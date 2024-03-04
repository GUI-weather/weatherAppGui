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
            <h2>Weekly Forecast for {city.name}</h2> {/* Display the city name */}
            <div className="forecast-list">
                {dailyForecastData.list.map((forecast, index) => (
                    <div key={index} className="forecast-item">
                        <h3>{new Date(forecast.dt * 1000).toLocaleDateString()}</h3> {/* Convert Unix timestamp to date */}
                        <p>Description: {forecast.weather[0].description}</p> {/* Display weather description */}
                        <p>Temperature: {kelvinToCelsius(forecast.temp.day)}°C</p> {/* Convert and display temperature */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeeklyForecast;
