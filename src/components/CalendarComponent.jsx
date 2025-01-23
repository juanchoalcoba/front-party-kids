import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css'

const CalendarComponent = ({ onDateChange, onBookingDataChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); 
  const today = new Date(); 

  const [bookingData, setBookingData] = useState({
    hours: '',
    timeSlot: '',
  });

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
    onDateChange(newDate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
    onBookingDataChange({ ...bookingData, [name]: value }); // Pasar los datos al componente principal
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

  const generateStartTimes = () => {
    const times = [];
    let startHour = 8;
    const maxStartHourFor4Hours = 20;
    const maxStartHourFor8Hours = 16;

    if (bookingData.hours === '4') {
      while (startHour <= maxStartHourFor4Hours) {
        times.push(`${startHour}:00`);
        startHour++;
      }
    } else if (bookingData.hours === '8') {
      while (startHour <= maxStartHourFor8Hours) {
        times.push(`${startHour}:00`);
        startHour++;
      }
    }
    return times;
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date}
        tileDisabled={disableDates}
        tileClassName={tileClassName}
      />

      <div className="flex flex-col">
        <label htmlFor="hours" className="text-gray-700 font-semibold mb-2">Duración de la Fiesta</label>
        <select
          id="hours"
          name="hours"
          value={bookingData.hours}
          onChange={handleChange}
          className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
          required
        >
          <option value="">Selecciona la duración</option>
          <option value="4">4 horas</option>
          <option value="8">8 horas</option>
        </select>
      </div>

      {bookingData.hours && (
        <div className="flex flex-col">
          <label htmlFor="timeSlot" className="text-gray-700 font-semibold mb-2">Selecciona la hora de inicio</label>
          <select
            id="timeSlot"
            name="timeSlot"
            value={bookingData.timeSlot}
            onChange={handleChange}
            className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
          >
            <option value="">Selecciona una opción</option>
            {generateStartTimes().map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
