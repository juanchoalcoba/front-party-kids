import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css'

const CalendarComponent = ({ onDateChange, setBookedHours }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); // Fechas con reservas
  const [bookedSlots, setBookedSlots] = useState({}); // Horarios ocupados por fecha
  const today = new Date();

  const fetchBookedDates = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      // Mapear solo las fechas y horas de las reservas
      const dates = [];
      const slots = {};
      
      data.forEach(booking => {
        const bookingDate = new Date(booking.date);
        dates.push(bookingDate);

        // Guardamos los horarios ocupados para cada fecha
        const startTime = new Date(booking.date).getHours();
        const endTime = startTime + parseInt(booking.hours, 10);
        slots[bookingDate.toDateString()] = slots[bookingDate.toDateString()] || [];
        for (let i = startTime; i < endTime; i++) {
          slots[bookingDate.toDateString()].push(`${i}:00`);
        }
      });

      setBookedDates(dates);
      setBookedSlots(slots);
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    }
  };

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
    setBookedHours(bookedSlots[newDate.toDateString()] || []);
  };

  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      if (date < today) return true; // Deshabilitar fechas pasadas
      // Si no hay franjas horarias disponibles, deshabilitar el día
      const dateString = date.toDateString();
      const availableSlots = bookedSlots[dateString] || [];
      const allSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`); // 24 horas del día

      // Verificar si existen franjas horarias disponibles
      const available = allSlots.filter(slot => !availableSlots.includes(slot));
      return available.length === 0;
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();
      const availableSlots = bookedSlots[dateString] || [];
      const allSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`); // 24 horas del día

      // Verificar si no hay franjas horarias disponibles
      const available = allSlots.filter(slot => !availableSlots.includes(slot));

      // Si no hay franjas horarias disponibles, marcar el día de rojo
      if (available.length === 0) {
        return 'no-availability'; // Clase para marcar en rojo
      } else if (bookedDates.some(bookedDate => bookedDate.toDateString() === dateString)) {
        return 'highlighted-date'; // Clase para marcar los días con reservas pero con disponibilidad
      }
    }
    return '';
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileDisabled={disableDates}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarComponent;
