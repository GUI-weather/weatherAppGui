import { useState, useEffect } from 'react';

const apiKey = '24388925ee460f3e9351095efde842a0'; // My API key

export async function fetchWeatherData(lat, long) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchWeatherForecast(lat, long) {
  try {
    const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${long}&appid=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchWeatherForecastDaily(lat, long) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=6&appid=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function useWeatherData(lat, long) {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [dailyForecastData, setDailyForecastData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const currentWeather = await fetchWeatherData(lat, long);
        const weatherForecast = await fetchWeatherForecast(lat, long);
        const dailyForecast = await fetchWeatherForecastDaily(lat, long);
        setWeatherData(currentWeather);
        setForecastData(weatherForecast);
        setDailyForecastData(dailyForecast);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchData();
  }, [lat, long]);

  return { weatherData, forecastData, dailyForecastData };
}
