import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';

const CalendarComponent = ({ onDateChange, bookedHours }) => {
  const [date, setDate] = useState(new Date());
  const today = new Date();

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

      // Si la fecha está completamente ocupada (8 horas reservadas)
      const dateString = date.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
      const reservedHoursForDate = bookedHours[dateString] || [];
      if (reservedHoursForDate.length >= 8) {
        return true; // Si ya hay 8 horas reservadas, se deshabilita la fecha
      }
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Fechas pasadas
      if (date < today) {
        return 'disabled-date'; // Fecha pasada, se deshabilita
      }
  
      // Fechas con reservas
      const dateString = date.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
      const reservedHoursForDate = bookedHours[dateString] || [];
  
      const isFullyBooked = reservedHoursForDate.length >= 8; // 8 horas por día
      const isPartiallyBooked = reservedHoursForDate.length > 0 && reservedHoursForDate.length < 8;
  
      if (isFullyBooked) {
        return 'fully-booked'; // Fecha completamente ocupada (rojo)
      } else if (isPartiallyBooked) {
        return 'partially-booked'; // Fecha parcialmente ocupada (amarillo)
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
