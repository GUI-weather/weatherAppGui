// App.js
import './App.css'; // single css file used for all components
import React from 'react';
import MainInfo from './components/mainInfo';
import RightSideMainInfo from './components/RightSideMainInfo';

function App() {
  // Specify the city
  const city = 'London'; // You can change this to any city you want

  return (
    <div className="App">
      <div className="layout">
        <MainInfo city={city} />
        <RightSideMainInfo city={city}/>
      </div>
    </div>
  );
}

export default App;
