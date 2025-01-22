import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css'

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); // Guardar fechas reservadas
  const today = new Date(); // Fecha de hoy

  // Función para obtener fechas reservadas desde el backend
  const fetchBookedDates = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      // Mapeamos solo las fechas de las reservas
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

  // Función para deshabilitar las fechas anteriores al día actual
  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      // Deshabilitar fechas anteriores al día de hoy
      return date < today;
    }
    return false;
  };


  

  // Función para agregar una clase a las fechas reservadas y deshabilitadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Resaltar las fechas reservadas en amarillo
      if (bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'booked-date'; // Clase CSS para las fechas reservadas
      }
      // Deshabilitar las fechas anteriores a hoy
      if (date < today) {
        return 'disabled-date'; // Clase CSS personalizada
      }
    }
    return '';
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date}
        tileDisabled={disableDates} // Deshabilitar fechas pasadas
        tileClassName={tileClassName} // Agregar clase personalizada a las fechas deshabilitadas y reservadas
      />
    </div>
  );
};

export default CalendarComponent;
