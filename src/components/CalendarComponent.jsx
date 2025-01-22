import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../App.css';

const CalendarComponent = ({ onDateChange, reservedHours }) => {
  const [date, setDate] = useState(new Date());  // Estado de la fecha seleccionada
  const [bookedDates, setBookedDates] = useState([]); // Estado para fechas reservadas
  const today = new Date(); // Fecha de hoy

  // Función para obtener las fechas reservadas desde el backend
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

  // Llamada para obtener las fechas reservadas cuando el componente se monta
  useEffect(() => {
    fetchBookedDates();
  }, []);

  // Función que maneja el cambio de fecha
  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate); // Notificar al componente padre sobre la nueva fecha seleccionada
  };

  // Función para deshabilitar las fechas anteriores al día actual
  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      // Deshabilitar fechas anteriores al día de hoy
      return date < today || bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString());
    }
    return false;
  };

  // Función para agregar una clase a las fechas reservadas y deshabilitadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      // Resaltar las fechas reservadas en amarillo
      if (bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'booked-date'; // Clase CSS para las fechas reservadas
      }
      // Deshabilitar las fechas anteriores a hoy
      if (date < today) {
        return 'disabled-date'; // Clase CSS personalizada para las fechas deshabilitadas
      }
    }
    return '';
  };

  // Función para deshabilitar horas reservadas de una fecha
  const disableReservedHours = (date) => {
    // Verificar si la fecha seleccionada tiene horas reservadas
    const dateString = date.toISOString().split('T')[0]; // Obtener solo la fecha sin la hora
    const reserved = reservedHours[dateString]; // Ver las horas reservadas de esa fecha
    if (reserved) {
      // Si existen horas reservadas, deshabilitar esas horas
      return reserved.includes(date.getHours());
    }
    return false; // Si no hay horas reservadas, no deshabilitar
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date}
        tileDisabled={disableDates} // Deshabilitar fechas pasadas y reservadas
        tileClassName={tileClassName} // Agregar clase personalizada a las fechas deshabilitadas y reservadas
      />
      {/* Aquí puedes agregar un selector de horas si deseas que el usuario elija una hora también */}
      {date && !disableReservedHours(date) && <p>Fecha seleccionada: {date.toLocaleDateString()}</p>}
      {date && disableReservedHours(date) && <p>Lo siento, esta hora ya está reservada.</p>}
    </div>
  );
};

export default CalendarComponent;
