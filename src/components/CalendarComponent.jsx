import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); // Guardar fechas reservadas
  const [partiallyBookedDates, setPartiallyBookedDates] = useState([]); // Guardar fechas parcialmente ocupadas
  const today = new Date(); // Fecha de hoy

  // Función para obtener fechas reservadas desde el backend
  const fetchBookedDates = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      // Mapeamos las fechas reservadas y las parcialmente ocupadas
      const booked = [];
      const partiallyBooked = [];
      
      data.forEach(booking => {
        const bookingDate = new Date(booking.date);
        if (booking.status === 'occupied') {
          booked.push(bookingDate);
        } else if (booking.status === 'partially-occupied') {
          partiallyBooked.push(bookingDate);
        }
      });
      
      setBookedDates(booked);
      setPartiallyBookedDates(partiallyBooked);
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

      // Deshabilitar fechas totalmente reservadas
      return bookedDates.some(bookedDate => 
        bookedDate.toDateString() === date.toDateString()
      );
    }
    return false;
  };

  // Función para agregar una clase a las fechas deshabilitadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (date < today || bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'disabled-date'; // Clase CSS para fechas ocupadas
      }
      if (partiallyBookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'partially-booked'; // Clase CSS para fechas parcialmente ocupadas
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
