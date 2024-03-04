// App.js
import './App.css'; // single css file used for all components
import React from 'react';
import MainInfo from './components/mainInfo';
import RightSideMainInfo from './components/rightSideMainInfo';

function App() {
  // Specify the city
  const city = 'Helsinki'; // You can change this to any city you want

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
