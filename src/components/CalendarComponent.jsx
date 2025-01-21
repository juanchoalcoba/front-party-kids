import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css'

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [partiallyBookedDates, setPartiallyBookedDates] = useState([]); // Fechas parcialmente ocupadas
  const [fullyBookedDates, setFullyBookedDates] = useState([]); // Fechas completamente ocupadas
  const today = new Date(); // Fecha de hoy

  // Función para obtener las fechas reservadas desde el backend
  const fetchBookedDates = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();

      // Aquí debemos mapear las fechas completas y parcialmente ocupadas
      const partiallyBooked = [];
      const fullyBooked = [];

      // Suponiendo que 'hours' nos da la duración de la reserva en horas
      data.forEach(booking => {
        const bookingDate = new Date(booking.date);
        // Si la reserva ocupa toda la jornada
        if (booking.hours === 8) {
          fullyBooked.push(bookingDate);
        } else {
          partiallyBooked.push(bookingDate);
        }
      });

      setPartiallyBookedDates(partiallyBooked);
      setFullyBookedDates(fullyBooked);
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

      // Deshabilitar fechas completamente reservadas
      return fullyBookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString());
    }
    return false;
  };

  // Función para agregar una clase a las fechas deshabilitadas, parcialmente ocupadas y completamente ocupadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Para fechas completamente ocupadas
      if (fullyBookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'fully-booked'; // Clase CSS para fechas completamente ocupadas (rojo)
      }
      
      // Para fechas parcialmente ocupadas
      if (partiallyBookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'partially-booked'; // Clase CSS para fechas parcialmente ocupadas (amarillo)
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
