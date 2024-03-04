import React from 'react';

function MainInfo() {
  // Temporary hardcoded values
  const temperature = 20; // °C
  const location = 'London';
  const highTemp = 25; // °C
  const lowTemp = 15; // °C

  return (
    <div className="main-info">
      <h1>{temperature}°</h1>
      <h2>{location}</h2>
      <h3>H: {highTemp}° L: {lowTemp}°</h3>
    </div>
  );
}

export default MainInfo;
