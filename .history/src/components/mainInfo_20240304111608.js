import React from 'react';
import { useWeatherData } from './ApiManager';

// Function to convert temperature from Kelvin to Celsius
function kelvinToCelsius(tempKelvin) {
    return Math.round(tempKelvin - 273.15);
}

function MainInfo({ city }) {
    const { weatherData, error } = useWeatherData(city); // Fetch weather data for the specified city

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    // Extract relevant data from the weather data
    const cityName = weatherData.name;
    const currentTemperature = kelvinToCelsius(weatherData.main?.temp);
    const highTemperature = kelvinToCelsius(weatherData.main?.temp_max);
    const lowTemperature = kelvinToCelsius(weatherData.main?.temp_min);

    return (
        <div className="main-info">
            <h1>{currentTemperature}°</h1>
            <h2>{cityName}</h2>
            <h3>H: {highTemperature}° L: {lowTemperature}°</h3>
        </div>
    );
}

export default MainInfo;
