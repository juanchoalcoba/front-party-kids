import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css';

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); // Guardar fechas reservadas y franjas horarias
  const today = new Date(); // Fecha de hoy

  // Función para obtener fechas reservadas desde el backend
  const fetchBookedDates = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();

      // Organizar las fechas reservadas y franjas horarias
      const bookings = data.map(booking => ({
        date: new Date(booking.date),
        timeSlot: booking.timeSlot // Asegúrate que el API devuelva las franjas horarias
      }));

      setBookedDates(bookings);
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

      // Verificar si todas las franjas horarias de un día están reservadas
      const dayBookings = bookedDates.filter(booking => booking.date.toDateString() === date.toDateString());
      return dayBookings.length > 0 && dayBookings.length === 2; // Por ejemplo, si hay 2 franjas de 4 horas
    }
    return false;
  };

  // Función para agregar una clase a las fechas deshabilitadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dayBookings = bookedDates.filter(booking => booking.date.toDateString() === date.toDateString());

      // Si tiene franjas horarias disponibles (amarillo)
      if (dayBookings.length > 0 && dayBookings.length < 2) {
        return 'available-date'; // Clase CSS personalizada para mostrar disponible
      }

      // Si está completamente ocupado (rojo)
      if (dayBookings.length === 2) {
        return 'booked-date'; // Clase CSS personalizada para mostrar ocupado
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
