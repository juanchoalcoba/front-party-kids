import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css'

const CalendarComponent = ({ onDateChange, bookedSlots }) => {
  const [date, setDate] = useState(new Date());
  const today = new Date(); // Fecha de hoy

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
      // Resaltar las fechas reservadas en amarillo usando bookedSlots
      if (bookedSlots.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'booked-date'; // Clase CSS para las fechas reservadas
      }
      // Deshabilitar las fechas anteriores a hoy
      if (date < today) {
        return 'disabled-date'; // Clase CSS personalizada
      }
    }
    return '';
  };

  // Función que maneja el cambio de fecha
  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
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
