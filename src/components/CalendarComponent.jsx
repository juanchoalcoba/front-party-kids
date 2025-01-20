import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css'

const CalendarComponent = ({ selectedDate, onDateChange }) => {
  const [date, setDate] = useState(selectedDate || new Date());  // Usamos selectedDate como valor inicial
  const [bookedSlots, setBookedSlots] = useState([]); // Guardar franjas horarias reservadas
  const today = new Date();

  // Función para obtener las franjas horarias reservadas desde el backend
  const fetchBookedSlots = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      
      const slots = data.map(booking => ({
        date: new Date(booking.date),
        startTime: new Date(booking.startTime),
        endTime: new Date(booking.endTime)
      }));
      
      setBookedSlots(slots);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  useEffect(() => {
    fetchBookedSlots(); // Llamada cuando el componente se monta
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);  // Llamamos al callback para actualizar la fecha en el componente padre
  };

  // Deshabilitar fechas pasadas o completamente ocupadas
  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      if (date < today) {
        return true;
      }

      // Verificar si el día está completamente reservado
      const isFullyBooked = bookedSlots.filter(slot => 
        slot.date.toDateString() === date.toDateString()
      ).length >= 4; // Suponiendo 4 franjas horarias de 4 horas

      return isFullyBooked;
    }
    return false;
  };

  // Agregar clase personalizada a las fechas deshabilitadas o parcialmente ocupadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const slotsForDay = bookedSlots.filter(slot =>
        slot.date.toDateString() === date.toDateString()
      );

      if (slotsForDay.length >= 4) {
        return 'disabled-date'; // Día totalmente reservado
      } else if (slotsForDay.length > 0) {
        return 'partially-booked-date'; // Día parcialmente reservado
      }
    }
    return '';
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date}  // Establecemos el valor del calendario con el estado `date`
        tileDisabled={disableDates}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarComponent;
