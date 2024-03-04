import React from 'react';

function RightSideMainInfo() {
  // Temporary hardcoded values
  const time = '12:45 PM'; 
  const message = 'Good Morning';
  const humidity = 23; // %
  const precipitation = 13; // %

  return (
    <div className="right-side-main-info">
      <h1>{time}°</h1>
      <h1>{message}</h1>
      <h2>Humidity: {humidity} %</h2>
      <h2>Precipitation: {precipitation} %</h2>
    </div>
  );
}

export default RightSideMainInfo;