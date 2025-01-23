import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '../App.css'

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]); // Guardar fechas reservadas
  const today = new Date(); // Fecha de hoy
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
    let startHour = 8; // Empezamos a las 8:00 AM
    const maxStartHourFor4Hours = 20; // Última hora de inicio válida para 4 horas (20:00)
    const maxStartHourFor8Hours = 16; // Última hora de inicio válida para 8 horas (16:00)
  
    if (bookingData.hours === '4') {
      // Para 4 horas: desde las 8 AM hasta las 8 PM (último posible inicio a las 8 PM)
      while (startHour <= maxStartHourFor4Hours) {
        times.push(`${startHour}:00`);
        startHour++;
      }
    } else if (bookingData.hours === '8') {
      // Para 8 horas: desde las 8 AM hasta las 4 PM (último posible inicio a las 4 PM)
      while (startHour <= maxStartHourFor8Hours) {
        times.push(`${startHour}:00`);
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
