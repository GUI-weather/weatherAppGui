// App.js
import './App.css'; // single css file used for all components
import React from 'react';
import MainInfo from './components/mainInfo';
import RightSideMainInfo from './components/rightSideMainInfo';

function App() {
  return (
    <div className="App">
      <div className="layout">
      <MainInfo />
      <RightSideMainInfo/>
      </div>
    </div>
  );
}

export default App;
