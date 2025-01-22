import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); // Fechas reservadas
  const today = new Date(); // Fecha de hoy

  // Función para obtener fechas reservadas desde el backend
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
    fetchBookedDates(); // Llamada cuando el componente se monta
  }, []);

  // Función que maneja el cambio de fecha
  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  // Función para deshabilitar fechas reservadas y pasadas
  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      // Deshabilitar fechas pasadas
      if (date < today) {
        return true;
      }
      // Deshabilitar fechas reservadas
      return bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString());
    }
    return false;
  };

  // Función para agregar una clase a las fechas deshabilitadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (date < today) {
        return 'disabled-date'; // Fecha pasada (roja)
      }
      if (bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'booked-date'; // Fecha reservada (roja)
      }
      return 'available-date'; // Fecha disponible (amarilla)
    }
    return '';
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date}
        tileDisabled={disableDates} // Deshabilitar fechas pasadas y ocupadas
        tileClassName={tileClassName} // Agregar clase personalizada a las fechas
      />
    </div>
  );
};

export default CalendarComponent;
