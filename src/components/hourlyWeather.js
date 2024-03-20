import React from 'react';
import { useWeatherData } from './ApiManager';
import { kelvinToCelsius } from './reusable';
import IconCloud from '../images/icon_cloud.svg';
import IconSun from '../images/icon_sun.svg';
import IconRain from '../images/icon_rain.svg';
import IconThunderstorm from '../images/icon_thunderstorm.svg';

function HourlyWeatherBox({ lat, long }) {
  const { forecastData } = useWeatherData(lat, long );

  if (!forecastData || !forecastData.list) {
    return <div>Loading...</div>;
  }

  // Extract the next 5 hours of forecast data
  const next5HoursForecast = forecastData.list.slice(1, 6);

  return (
    <div className="hourly-weather-box">
      <div className="hourly-weather-list">
        {next5HoursForecast.map((forecast, index) => {
          const description = forecast.weather[0].description.toLowerCase();
          let icon;

          if (description.includes('overcast clouds')) {
            icon = <img src={IconCloud} alt="Overcast Clouds" />; //maybe diff img here too?
          } else if (description.includes('clear sky')) {
            icon = <img src={IconSun} alt="Clear Sky" />;
          } else if (description.includes('rain')) {
            icon = <img src={IconRain} alt="Rain" />;
          } else if (description.includes('shower rain')) {
            icon = <img src={IconRain} alt="Shower Rain" />;
          } else if (description.includes('thunderstorm')) {
            icon = <img src={IconThunderstorm} alt="Thunderstorm" />;
          } else if (description.includes('broken clouds')) { //I ran out of free icon imports need to replace this
            icon = <img src={IconCloud} alt="Broken Clouds" />;
	  } else if (description.includes('scattered clouds')) {
            icon = <img src={IconCloud} alt="Scattered Clouds" />;
          } else {
            icon = <span>{description}</span>;
          }

          return (
            <div key={index} className="hourly-weather-item">
              <h3>{new Date(forecast.dt_txt).getHours()}:00</h3>
              {icon}
              <h3>{kelvinToCelsius(forecast.main.temp)}°</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyWeatherBox;
