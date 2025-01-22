import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css';

const CalendarComponent = () => { // Eliminamos onDateChange
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const today = new Date();

  const fetchBookedDates = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      const booked = data.map(booking => new Date(booking.date));
      setBookedDates(booked);
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    }
  };

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Eliminar la llamada a onDateChange si no es necesaria
  };

  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      return date < today;
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'booked-date';
      }
      if (date < today) {
        return 'disabled-date';
      }
    }
    return '';
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date}
        tileDisabled={disableDates}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarComponent;
