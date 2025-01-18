import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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

      // Deshabilitar fechas reservadas
      return bookedDates.some(bookedDate => 
        bookedDate.toDateString() === date.toDateString()
      );
    }
    return false;
  };

  // Función para agregar clases a las fechas disponibles y deshabilitadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Si la fecha está deshabilitada, asignamos 'disabled-date'
      if (date < today || bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'disabled-date'; // Clase CSS personalizada para fechas deshabilitadas
      }
      // Si la fecha está disponible, asignamos 'available-date'
      return 'available-date'; // Clase CSS personalizada para fechas disponibles
    }
    return '';
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date}
        tileDisabled={disableDates} // Deshabilitar fechas pasadas y ocupadas
        tileClassName={tileClassName} // Asignar clases a las fechas disponibles y deshabilitadas
      />
    </div>
  );
};

export default CalendarComponent;
