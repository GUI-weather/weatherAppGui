import React from 'react';
import { useWeatherData } from './ApiManager';
import { kelvinToCelsius } from './reusable';
import IconCloud from '../images/icon_cloud.svg';
import IconSun from '../images/icon_sun.svg';
import IconRain from '../images/icon_rain.svg';
import IconThunderstorm from '../images/icon_thunderstorm.svg';

function WeeklyForecast({ lat, long  }) {
    const { dailyForecastData } = useWeatherData(lat, long );

    if (!dailyForecastData || !dailyForecastData.list) {
        return <div>Loading...</div>;
    }

  return (
    <div className="weekly-forecast-box">
      <div className="forecast-list">
        {dailyForecastData.list.map((forecast, index) => {
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
          } else {
            icon = <span>{description}</span>;
          }

          return (
            <div key={index} className="forecast-item">
              <h3>{new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h3>
              {icon}
              <p>{kelvinToCelsius(forecast.temp.day)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyForecast;
