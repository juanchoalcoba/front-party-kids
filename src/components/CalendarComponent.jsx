import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css'

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); // Guardar fechas reservadas
  const [dayAvailability, setDayAvailability] = useState([]); // Disponibilidad por día
  const today = new Date(); // Fecha de hoy

  // Función para obtener fechas reservadas y disponibilidad diaria desde el backend
  const fetchBookedDates = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      // Mapeamos las fechas de las reservas
      const booked = data.map(booking => ({
        date: new Date(booking.date),
        hours: booking.hours,
        timeSlot: booking.timeSlot,
      }));
      setBookedDates(booked);
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    }
  };

  // Lógica para calcular la disponibilidad de cada día
  const checkDayAvailability = (selectedDate) => {
    const bookedSlots = bookedDates.filter(booking =>
      booking.date.toDateString() === selectedDate.toDateString()
    );
    
    // Horas disponibles según las reservas
    const allHours = Array.from({ length: 13 }, (_, i) => i + 8); // De 8:00 AM a 20:00 PM

    bookedSlots.forEach(slot => {
      const startHour = parseInt(slot.timeSlot.split(':')[0], 10);
      const duration = parseInt(slot.hours, 10);
      // Elimina las horas ocupadas (duración de la reserva)
      for (let i = 0; i < duration; i++) {
        const index = allHours.indexOf(startHour + i);
        if (index !== -1) {
          allHours.splice(index, 1);
        }
      }
    });
    setDayAvailability(allHours);
  };

  useEffect(() => {
    fetchBookedDates(); // Llamada cuando el componente se monta
  }, []);

  // Función que maneja el cambio de fecha
  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
    checkDayAvailability(newDate); // Revisar disponibilidad para la fecha seleccionada
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
        bookedDate.date.toDateString() === date.toDateString() && dayAvailability.length === 0
      );
    }
    return false;
  };

  // Función para agregar una clase a las fechas deshabilitadas y parcialmente reservadas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isBooked = bookedDates.some(bookedDate => 
        bookedDate.date.toDateString() === date.toDateString()
      );
      if (isBooked && dayAvailability.length > 0) {
        return 'partially-booked'; // Clase para fechas con reservas parciales (amarillo)
      } else if (isBooked && dayAvailability.length === 0) {
        return 'fully-booked'; // Clase para fechas totalmente reservadas (rojo)
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
        tileClassName={tileClassName} // Agregar clase personalizada a las fechas reservadas
      />
    </div>
  );
};

export default CalendarComponent;
