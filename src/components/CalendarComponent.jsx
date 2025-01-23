import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css'

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); // Guardar fechas reservadas
  const today = new Date(); // Fecha de hoy
  const [reservedSlots, setReservedSlots] = useState([]); // Almacenar los slots ya reservados
  const [bookingData, setBookingData] = useState({
    hours: '',
    timeSlot: '',
  });

  // Función para obtener fechas reservadas desde el backend
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

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };


  // Obtener las reservas existentes de la API
  const fetchReservedSlots = async (selectedDate) => {
    const response = await fetch(`https://api-party-kids.vercel.app/api/bookings?date=${selectedDate}`);
    if (response.ok) {
      const data = await response.json();
      const slots = data.map((booking) => booking.timeSlot); // Extraemos los slots ocupados
      setReservedSlots(slots);
    } else {
      console.error('Error fetching reserved slots');
    }
  };

  // Actualizar la disponibilidad de las horas cada vez que se cambia la fecha
  useEffect(() => {
    const formattedDate = bookingData.date.toISOString().split('T')[0]; // Convertir la fecha en formato YYYY-MM-DD
    fetchReservedSlots(formattedDate);
  }, [bookingData.date]);





  useEffect(() => {
    fetchBookedDates(); // Llamada cuando el componente se monta
  }, []);

  // Función que maneja el cambio de fecha
  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

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
      // Resaltar las fechas reservadas en amarillo
      if (bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString())) {
        return 'booked-date'; // Clase CSS para las fechas reservadas
      }
      // Deshabilitar las fechas anteriores a hoy
      if (date < today) {
        return 'disabled-date'; // Clase CSS personalizada
      }
    }
    return '';
  };


  const generateStartTimes = () => {
    const times = [];
    let startHour = 8;
    const maxStartHourFor4Hours = 20;
    const maxStartHourFor8Hours = 16;

    if (bookingData.hours === '4') {
      while (startHour <= maxStartHourFor4Hours) {
        const time = `${startHour}:00`;
        if (!reservedSlots.includes(time)) {
          times.push(time); // Solo agregamos el tiempo si no está reservado
        }
        startHour++;
      }
    } else if (bookingData.hours === '8') {
      while (startHour <= maxStartHourFor8Hours) {
        const time = `${startHour}:00`;
        if (!reservedSlots.includes(time)) {
          times.push(time); // Solo agregamos el tiempo si no está reservado
        }
        startHour++;
      }
    }
    return times;
  };





  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date}
        tileDisabled={disableDates} // Deshabilitar fechas pasadas
        tileClassName={tileClassName} // Agregar clase personalizada a las fechas deshabilitadas y reservadas
      />

<div className="flex flex-col">
          <label htmlFor="hours" className="text-gray-700 font-semibold mb-2">Duración de la Fiesta</label>
          <select
            id="hours"
            name="hours"
            value={bookingData.hours}
            onChange={handleChange}
            className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
          >
            <option value="">Selecciona la duración</option>
            <option value="4">4 horas</option>
            <option value="8">8 horas</option>
          </select>
        </div>

        {bookingData.hours && (
          <div className="flex flex-col">
            <label htmlFor="timeSlot" className="text-gray-700 font-semibold mb-2">Selecciona la hora de inicio</label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={bookingData.timeSlot}
              onChange={handleChange}
              className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
              required
            >
              <option value="">Selecciona una opción</option>
              {generateStartTimes().map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
          </div>
        )}
    </div>
  );
};

export default CalendarComponent;
