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

  // Función para deshabilitar las fechas reservadas y pasadas
  const disableDates = ({ date, view }) => {
    // Solo deshabilitamos las fechas si estamos en la vista de mes
    if (view === 'month') {
      // Deshabilitar fechas pasadas
      if (date < today) {
        return true;
      }

      // Deshabilitar fechas reservadas (no seleccionables)
      return bookedDates.some(bookedDate => 
        bookedDate.toDateString() === date.toDateString()
      );
    }
    return false;
  };

  // Función para agregar clases a las fechas deshabilitadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Marcar fechas pasadas en gris
      if (date < today) {
        return 'past-date'; // Clase CSS para fechas pasadas (gris)
      }

      // Marcar fechas con reserva pero seleccionables en amarillo
      if (bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'reserved-date'; // Clase CSS para fechas con reserva (amarillo)
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
        tileClassName={tileClassName} // Agregar clase personalizada a las fechas deshabilitadas
      />
    </div>
  );
};

export default CalendarComponent;
