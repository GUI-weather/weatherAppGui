import React, { useState, useEffect } from 'react';

// InteractiveButton component
const InteractiveButton = ({ onClick, icon }) => {
  return (
    <button className="interactive-button" onClick={onClick}>
      <img src={icon} alt="Button Icon" />
    </button>
  );
};

export { InteractiveButton };

// Define isSameDate function
const isSameDate = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Define formatDate function
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Define CalendarPage function
function CalendarPage() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem('calendarNotes')) || {}
  );
  const [searchDate, setSearchDate] = useState('');
  const [calendar, setCalendar] = useState([]); // State variable for calendar
  const [monthlyReview, setMonthlyReview] = useState([]); // State variable for monthly review

  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
    generateMonthlyNotesOverview();
  }, [currentYear, currentMonth]);

  const generateCalendar = (year, month) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const startingDayIndex = new Date(year, month, 1).getDay();
    const startingDay = daysOfWeek[startingDayIndex];

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    let currentDayIndex = daysOfWeek.indexOf(startingDay);

    for (let i = 0; i < currentDayIndex; i++) {
      calendarDays.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      calendarDays.push({
        date: date,
        dayOfWeek: daysOfWeek[date.getDay()],
        dayOfMonth: i,
        isCurrentDay: isSameDate(date, new Date()),
      });
    }

    setCalendar(calendarDays); // Set calendar state
  };

  const generateMonthlyNotesOverview = () => {
    const monthlyReview = [];
    Object.entries(notes).forEach(([date, note]) => {
      const [year, month, day] = date.split('-').map(Number);
      if (year === currentYear && month - 1 === currentMonth) {
        monthlyReview.push({
          date: new Date(year, month - 1, day),
          note: note,
        });
      }
    });

    setMonthlyReview(monthlyReview); // Set monthly review state
  };

  const previousMonth = () => {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth - 1;
      let newYear = currentYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth + 1;
      let newYear = currentYear;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const handleSearchDateChange = (event) => {
    setSearchDate(event.target.value);
  };

  const handleSearchDateSubmit = (event) => {
    event.preventDefault();
    if (searchDate) {
      const [year, month, day] = searchDate.split('-');
      if (year && month && day) {
        setCurrentYear(parseInt(year));
        setCurrentMonth(parseInt(month) - 1);
      }
    }
  };

  const goToCurrentMonth = () => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  return (
    <div className="container">
      <div className="calendar">
        <div className="header">
          <button onClick={previousMonth}>&lt;</button>
          <div className="month-year">
            {new Date(currentYear, currentMonth).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </div>
          <button onClick={nextMonth}>&gt;</button>
        </div>
        <div className="search-section">
          <form onSubmit={handleSearchDateSubmit}>
            <input
              type="date"
              className="search-input"
              value={searchDate}
              onChange={handleSearchDateChange}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
        <div className="days">{/* calendar days */}</div>
        <button onClick={goToCurrentMonth}>Go to Current Month</button>
      </div>

      <div className="monthly-review">{/* monthly notes overview */}</div>
    </div>
  );
}

export default CalendarPage;
