import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); // Fechas reservadas
  const [timeSlots, setTimeSlots] = useState({}); // Almacenaremos los timeSlots para cada fecha
  const today = new Date(); // Fecha de hoy

  // Función para obtener las fechas reservadas y los timeSlots desde la API
  const fetchBookedDatesAndTimeSlots = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      
      // Extraemos las fechas y los timeSlots
      const booked = [];
      const slots = {};

      data.forEach(booking => {
        const bookingDate = new Date(booking.date).toISOString().split('T')[0]; // Formato YYYY-MM-DD
        booked.push(bookingDate);

        if (booking.timeSlot) {
          // Si existe un timeSlot, lo asignamos a esa fecha
          if (!slots[bookingDate]) slots[bookingDate] = [];
          slots[bookingDate].push(booking.timeSlot); // Agregar el timeSlot a la fecha
        }
      });

      setBookedDates(booked);
      setTimeSlots(slots);
    } catch (error) {
      console.error('Error fetching booked dates and time slots:', error);
    }
  };

  // Llamamos a la función para obtener las fechas y timeSlots cuando el componente se monta
  useEffect(() => {
    fetchBookedDatesAndTimeSlots();
  }, []);

  // Función para manejar el cambio de fecha
  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  // Función para deshabilitar las fechas pasadas y ocupadas
  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0]; // Convertir fecha a formato YYYY-MM-DD
      if (date < today) {
        return true; // Deshabilitar fechas pasadas
      }

      // Deshabilitar fechas reservadas
      if (bookedDates.includes(dateString)) {
        return true;
      }

      // Deshabilitar fechas sin timeSlots disponibles
      if (!timeSlots[dateString] || timeSlots[dateString].length === 0) {
        return true;
      }

      return false;
    }
    return false;
  };

  // Función para agregar clases personalizadas a las fechas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      // Si la fecha está reservada
      if (bookedDates.includes(dateString)) {
        return 'no-availability'; // Clase CSS para fechas sin disponibilidad
      }

      // Si hay timeSlots, pero ocupados parcialmente
      if (timeSlots[dateString] && timeSlots[dateString].length < 5) {
        return 'partially-available'; // Clase CSS para fechas parcialmente ocupadas
      }
    }
    return '';
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date}
        tileDisabled={disableDates} // Deshabilitar fechas sin disponibilidad
        tileClassName={tileClassName} // Aplicar clases a las fechas
      />
    </div>
  );
};

export default CalendarComponent;
