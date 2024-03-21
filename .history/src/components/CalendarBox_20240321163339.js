import React, { useState } from 'react';

function Calendar() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarArray = Array.from({ length: 42 }, (_, i) => {
      if (i >= firstDayOfMonth && i < firstDayOfMonth + daysInMonth) {
        return i - firstDayOfMonth + 1;
      } else {
        return null;
      }
    });

    return calendarArray;
  };

  const calendar = generateCalendar(currentYear, currentMonth);

  return (
    <div>
      {daysOfWeek.map((day) => (
        <div key={day}>{day}</div>
      ))}
      {calendar.map((day, i) => (
        <div key={i}>{day}</div>
      ))}
    </div>
  );
}

export default Calendar;