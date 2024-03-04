import { useState, useEffect } from 'react';

const apiKey = '24388925ee460f3e9351095efde842a0'; // My API key

export async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function useWeatherData(city) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchData();
  }, [city]);

  return weatherData;
}
