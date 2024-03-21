// CalendarBox.js
import React from 'react';
import './App.css'; 

function CalendarBox({ year, month, calendar, previousMonth, nextMonth }) {
  return (
    <div className="calendar-box">
      <div className="header">
        <button onClick={previousMonth}>Previous</button>
        <h2>{new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div className="days">
        {calendar.map((day, index) => (
          <div key={index} className="day">{day}</div>
        ))}
      </div>
    </div>
  );
}

export default CalendarBox;
