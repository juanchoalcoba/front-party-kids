import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css'

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); // Guardar fechas reservadas
  const today = new Date(); // Fecha de hoy
  const MAX_RESERVATIONS = 5; // Número máximo de reservas por día (puedes cambiar este valor según tu lógica)

  // Función para obtener fechas reservadas desde el backend
  const fetchBookedDates = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      // Mapeamos fechas y el número de reservas por fecha
      const booked = data.reduce((acc, booking) => {
        const bookingDate = new Date(booking.date).toDateString();
        acc[bookingDate] = (acc[bookingDate] || 0) + 1;
        return acc;
      }, {});
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

  // Función para deshabilitar las fechas reservadas y pasadas
  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      // Deshabilitar fechas pasadas
      if (date < today) {
        return true;
      }

      // Deshabilitar fechas totalmente ocupadas
      const dateString = date.toDateString();
      if (bookedDates[dateString] && bookedDates[dateString] >= MAX_RESERVATIONS) {
        return true;
      }
    }
    return false;
  };

  // Función para agregar una clase a las fechas deshabilitadas y parcialmente ocupadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();

      // Días pasados (deshabilitados)
      if (date < today) {
        return 'disabled-date'; // Clase CSS para fechas pasadas
      }

      // Días totalmente ocupados (rojo)
      if (bookedDates[dateString] && bookedDates[dateString] >= MAX_RESERVATIONS) {
        return 'fully-booked-date'; // Clase CSS para fechas totalmente ocupadas
      }

      // Días parcialmente ocupados (amarillo)
      if (bookedDates[dateString] && bookedDates[dateString] > 0) {
        return 'partially-booked-date'; // Clase CSS para fechas parcialmente ocupadas
      }
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
