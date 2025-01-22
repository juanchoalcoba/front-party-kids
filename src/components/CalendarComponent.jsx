import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';

const CalendarComponent = ({ onDateChange, bookedDates = [] }) => {
  const [date, setDate] = useState(new Date());
  const today = new Date(); // Fecha de hoy

  // Función que maneja el cambio de fecha
  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate); // Notificar la nueva fecha seleccionada al padre
  };

  // Función para deshabilitar las fechas anteriores al día actual
  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      return date < today; // Deshabilitar fechas anteriores al día de hoy
    }
    return false;
  };

  // Función para agregar una clase a las fechas reservadas y deshabilitadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Asegurarnos de que bookedDates es un array y que contiene fechas
      if (Array.isArray(bookedDates) && bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'booked-date'; // Clase CSS para las fechas reservadas
      }
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
        tileClassName={tileClassName} // Agregar clase personalizada a las fechas reservadas
      />
    </div>
  );
};

export default CalendarComponent;
