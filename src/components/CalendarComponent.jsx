import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css'

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); // Fechas totalmente reservadas
  const [partialBookedDates, setPartialBookedDates] = useState([]); // Fechas parcialmente reservadas
  const today = new Date();

  // Función para obtener las fechas reservadas desde el backend
  const fetchBookedDates = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      
      // Mapeamos las reservas y las clasificamos según su disponibilidad
      const fullBooked = data
        .filter(booking => booking.status === 'full') // Suponiendo que tienes un campo 'status' en la API
        .map(booking => new Date(booking.date));
      
      const partialBooked = data
        .filter(booking => booking.status === 'partial') // Fechas con espacio aún disponible
        .map(booking => new Date(booking.date));
      
      setBookedDates(fullBooked); // Fechas totalmente ocupadas
      setPartialBookedDates(partialBooked); // Fechas parcialmente ocupadas
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    }
  };

  useEffect(() => {
    fetchBookedDates();
  }, []);

  // Función que maneja el cambio de fecha
  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  // Función para deshabilitar fechas completamente reservadas y pasadas
  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      if (date < today) {
        return true; // Deshabilitar fechas pasadas
      }
      return bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString()); // Deshabilitar fechas sin espacio
    }
    return false;
  };

  // Función para agregar una clase a las fechas deshabilitadas o con reservas parciales
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'disabled-date'; // Fechas completamente reservadas
      }
      if (partialBookedDates.some(partialDate => partialDate.toDateString() === date.toDateString())) {
        return 'partial-booked-date'; // Fechas con reserva parcial (color amarillo)
      }
    }
    return '';
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date}
        tileDisabled={disableDates} // Deshabilitar fechas pasadas y totalmente reservadas
        tileClassName={tileClassName} // Aplicar clases CSS a las fechas deshabilitadas o parcialmente reservadas
      />
    </div>
  );
};

export default CalendarComponent;
