// App.js
import './App.css'; // single css file used for all components
import React from 'react';
import MainInfo from './components/mainInfo';
import RightSideMainInfo from './components/rightSideMainInfo';

function App() {
  const city = 'Krakow'; // this should be based on user location as the time is taken from where the user is 

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
