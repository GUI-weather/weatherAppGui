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

export async function fetchWeatherForecast(city) {
  try {
    const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchWeatherForecastDaily(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function useWeatherData(city) {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [dailyForecastData, setDailyForecastData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const currentWeather = await fetchWeatherData(city);
        const weatherForecast = await fetchWeatherForecast(city);
        const dailyForecastData = await fetchWeatherForecastDaily(city)
        setWeatherData(currentWeather);
        setForecastData(weatherForecast);
        setDailyForecastData(dailyForecastData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchData();
  }, [city]);

  return { weatherData, forecastData, dailyForecastData };
}
