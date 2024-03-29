import React, { useState, useEffect } from 'react';

function Calendar() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('calendarNotes')) || {});
  const [searchDate, setSearchDate] = useState('');
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedNote, setSelectedNote] = useState('');

  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
    generateMonthlyNotesOverview();
  }, [currentYear, currentMonth, notes]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generates calendar dates
  const generateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    const calendarArray = [];
   
    // Positions date to corresponding day of the week
    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push('');
        } else if (dayCounter > daysInMonth) {
          week.push('');
        } else {
          week.push(dayCounter);
          dayCounter++;
        }
      }
      calendarArray.push(week);
    }
  
    // Calendar dates and days positioned
    return (
      <table className="calendar-table">
        <thead>
          <tr>
            {daysOfWeek.map(day => (
              <th key={day} className="weekday">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarArray.map((week, weekIndex) => (
            <tr key={weekIndex} className="calendar-week">
              {week.map((date, dayIndex) => (
                <td
                  key={dayIndex}
                  className={`calendar-day ${date === '' ? 'empty' : ''} ${date === selectedDate ? 'selected' : ''}`}
                  onClick={() => handleDayClick(date)}
                >
                  {date !== '' && date}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  


  // Popup for when a day is selected
  const handleDayClick = (date) => {
    setSelectedDate(date);
    setSelectedNote(notes[date] || '');
    setShowNotePopup(true);
  };

  // Allows user to save a note to a specific date
  const saveNote = () => {
    if (selectedDate) {
      const updatedNotes = { ...notes, [selectedDate]: selectedNote };
      setNotes(updatedNotes);
      localStorage.setItem('calendarNotes', JSON.stringify(updatedNotes));
      setShowNotePopup(false);
    }
  };

  // Allows user to delete note
  const deleteNote = () => {
    if (selectedDate) {
      const updatedNotes = { ...notes };
      delete updatedNotes[selectedDate];
      setNotes(updatedNotes);
      localStorage.setItem('calendarNotes', JSON.stringify(updatedNotes));
      setShowNotePopup(false);
    }
  };

  // Redirects to the previous month
  const previousMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };

  // Redirects to the next month
  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };

  // Redirects to current month
  const goToCurrentMonth = () => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  const handleSearchDate = () => {
    if (searchDate) {
      const [year, month, day] = searchDate.split('-');
      if (year && month && day) {
        setCurrentYear(parseInt(year));
        setCurrentMonth(parseInt(month) - 1);
      }
    }
  };

  // Generates an overview of users monthly notes
  const generateMonthlyNotesOverview = () => {
    const monthlyNotes = Object.entries(notes).filter(([date]) => {
      const [year, month] = date.split('-').map(Number);
      return year === currentYear && month === currentMonth + 1;
    });

    return (
        <div className="monthly-review-content">
        <h3>Monthly Review</h3>
        <ul>
          {monthlyNotes.map(([date, note]) => (
            <li key={date}>
              <span>{date}:</span> {note}
            </li>
          ))}
        </ul>
        </div>
        );
    };

  // Users interface of calendar and monthly review information
  return (
    <div className="container">
      {/* Calendar display */}
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={previousMonth}>Previous</button>
          <div>
            {currentYear} - {currentMonth + 1}
            </div>
          <button onClick={nextMonth}>Next</button>
          <button onClick={goToCurrentMonth}>Today</button>
          <input type="text" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} placeholder="YYYY-MM-DD" />
        </div>
        <div className="calendar-weeks">
          {generateCalendar(currentYear, currentMonth)}
        </div>
      </div>

      {/* Monthly review display */}
      <div className='monthly-review-section'>
        <div className="monthly-review">
          {generateMonthlyNotesOverview()}
        </div>
        {/* Display when a day is selected */}
        {showNotePopup && (
          <div className="note-popup">
            <textarea value={selectedNote} onChange={(e) => setSelectedNote(e.target.value)} />
            <button onClick={saveNote}>Save Note</button>
            <button onClick={deleteNote}>Delete Note</button>
            <button onClick={() => setShowNotePopup(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
