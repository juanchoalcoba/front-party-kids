import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css'

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); // Guardar fechas reservadas
  const [bookedTimes, setBookedTimes] = useState([]); // Guardar horas ocupadas
  const today = new Date(); // Fecha de hoy

  // Función para obtener fechas reservadas desde el backend
  const fetchBookedDates = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      // Mapeamos las fechas y horas de las reservas
      const booked = data.map(booking => ({
        date: new Date(booking.date),
        hours: booking.hours,
        startTime: booking.startTime,
      }));
      setBookedDates(booked);
      updateBookedTimes(booked); // Actualizamos las horas ocupadas
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    }
  };

  const updateBookedTimes = (bookings) => {
    const occupiedTimes = [];
    bookings.forEach(booking => {
      const startHour = new Date(booking.startTime).getHours();
      const duration = booking.hours; // Puede ser 4 u 8 horas
      for (let i = 0; i < duration; i++) {
        occupiedTimes.push(startHour + i);
      }
    });
    setBookedTimes(occupiedTimes);
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
        bookedDate.date.toDateString() === date.toDateString()
      );
    }
    return false;
  };

  // Función para agregar una clase a las fechas deshabilitadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month' && (date < today || bookedDates.some(bookedDate => bookedDate.date.toDateString() === date.toDateString()))) {
      return 'disabled-date'; // Clase CSS personalizada
    }
    return '';
  };

  // Marcar los días parcialmente ocupados en amarillo y completamente ocupados en rojo
  const tileStyle = ({ date, view }) => {
    if (view === 'month') {
      const isPartiallyOccupied = bookedDates.some(bookedDate => {
        return bookedDate.date.toDateString() === date.toDateString() && !bookedTimes.includes(bookedDate.startTime);
      });

      const isCompletelyOccupied = bookedDates.some(bookedDate => 
        bookedDate.date.toDateString() === date.toDateString() &&
        bookedTimes.every(hour => bookedDate.startTime <= hour && hour <= bookedDate.startTime + bookedDate.hours - 1)
      );

      if (isCompletelyOccupied) {
        return { backgroundColor: 'red' };
      }
      if (isPartiallyOccupied) {
        return { backgroundColor: 'yellow' };
    }
    }
    return {};
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date}
        tileDisabled={disableDates} // Deshabilitar fechas pasadas y ocupadas
        tileClassName={tileClassName} // Agregar clase personalizada a las fechas deshabilitadas
        tileStyle={tileStyle} // Estilo para marcar días ocupados
      />
    </div>
  );
};


export default CalendarComponent;
