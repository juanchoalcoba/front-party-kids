import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../App.css";

const CalendarComponent = ({ onDateChange, onBookingDataChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const today = new Date();

  const [bookingData, setBookingData] = useState({
    hours: "",
    timeSlot: "",
  });

  const fetchBookedDates = async () => {
    try {
      const response = await fetch(
        "https://api-party-kids.vercel.app/api/bookings"
      );
      const data = await response.json();

      // Guardar reservas con fecha, duración y horario
      const booked = data.map((booking) => ({
        date: new Date(booking.date),
        hours: booking.hours,
        timeSlot: booking.timeSlot,
      }));
      setBookedDates(booked);
    } catch (error) {
      console.error("Error fetching booked dates:", error);
    }
  };

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const handleDateChange = (newDate) => {
    // Establecemos la nueva fecha seleccionada
    setDate(newDate);

    // Llamamos a la función para generar horarios disponibles
    const availableTimes = generateStartTimes(newDate);

    // Actualizamos el estado del componente con los horarios disponibles
    setBookingData((prev) => ({
      ...prev,
      date: newDate,
      timeSlot: "", // Reiniciamos la selección del horario
      availableTimes, // Guardamos los horarios disponibles generados
    }));

    // Llamamos a cualquier otra función que necesite la nueva fecha (como una prop onDateChange)
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
    onBookingDataChange({ ...bookingData, [name]: value });
  };

  const disableDates = ({ date, view }) => {
    if (view === "month") {
      return date < today;
    }
    return false;
  };

  
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const selectedDateBookings = bookedDates.filter(
        (booking) => booking.date.toDateString() === date.toDateString()
      );
  
      const has5HourBooking1 = selectedDateBookings.some(
        (booking) => booking.timeSlot === "10:00" && booking.hours === "5"
      );
      const has5HourBooking2 = selectedDateBookings.some(
        (booking) => booking.timeSlot === "17:00" && booking.hours === "5"
      );
      const has14HourBooking = selectedDateBookings.some(
        (booking) => booking.hours === "14"
      );
  
      // Si hay una reserva de 14 horas, marcar todo el día como rojo
      if (has14HourBooking) {
        return "unavailable-date"; // clase para marcar fecha como completamente ocupada (rojo)
      }
  
      // Si hay dos reservas de 5 horas, marcar el día como completamente ocupado (rojo)
      if (has5HourBooking1 && has5HourBooking2) {
        return "unavailable-date"; // clase para marcar fecha como completamente ocupada (rojo)
      }
  
      // Si hay una sola reserva de 5 horas, marcar el día como parcialmente ocupado (amarillo)
      if (has5HourBooking1 || has5HourBooking2) {
        return "partially-booked-date"; // clase para marcar fecha parcialmente ocupada (amarillo)
      }
  
      // Lógica existente para fechas pasadas
      if (date < today) {
        return "disabled-date"; // clase para fechas deshabilitadas
      }
    }
    return "";
  };
  
  const generateStartTimes = () => {
    const times = [];
    const startTimesFor5Hours = ["10:00", "17:00"];
    const startTimeFor14Hours = "08:00";
  
    const selectedDateBookings = bookedDates.filter(
      (booking) => booking.date.toDateString() === date.toDateString()
    );
  
    const isTimeSlotAvailable = (time) => {
      return !selectedDateBookings.some((booking) => {
        const bookedTime = booking.timeSlot;
  
        // Validación para reservas de 5 horas
        if (booking.hours === "5") {
          return bookedTime === time;
        }
        // Validación para reserva de 14 horas
        else if (booking.hours === "14") {
          return true; // Bloquea todas las horas en este caso
        }
        return false;
      });
    };
  
    // Nueva validación para bloquear reservas de 14 horas si ya hay una reserva de 5 horas
    const isFiveHourBookingExist = selectedDateBookings.some(
      (booking) => booking.hours === "5"
    );
  
    // Lógica para generar horarios disponibles para 5 horas
    if (bookingData.hours === "5") {
      startTimesFor5Hours.forEach((time) => {
        if (isTimeSlotAvailable(time)) {
          times.push(time);
        }
      });
    }
    // Lógica para generar el único horario disponible para 14 horas
    else if (bookingData.hours === "14" && !isFiveHourBookingExist) {
      // Solo permite 14 horas si no hay reservas de 5 horas
      if (isTimeSlotAvailable(startTimeFor14Hours)) {
        times.push(startTimeFor14Hours);
      }
    }
  
    return times;
  };
  
  
  

  return (
    <div>
  <Calendar
    onChange={handleDateChange}
    value={date}
    tileDisabled={disableDates}
    tileClassName={tileClassName}
  />

  <div className="flex flex-col mt-4">
    <label htmlFor="timeSlot" className="text-gray-700 font-semibold mb-2">
      Disponibilidad
    </label>

    <div className="flex items-center mb-2">
      <div className="w-4 h-4 border border-black bg-white rounded-sm mr-2"></div>
      <span className="text-gray-700">Disponibilidad total</span>
    </div>
    <div className="flex items-center mb-2">
      <div className="w-4 h-4 bg-yellow-400 rounded-sm mr-2"></div>
      <span className="text-gray-700">Parcialmente ocupado</span>
    </div>

    <div className="flex items-center mb-2">
      <div className="w-4 h-4 bg-red-600 rounded-sm mr-2"></div>
      <span className="text-gray-700">Sin disponibilidad</span>
    </div>
  </div>

  <div className="flex flex-col mt-4">
    <label htmlFor="hours" className="text-gray-700 font-semibold mb-2">
      Duración de la Reserva
    </label>
    <select
      id="hours"
      name="hours"
      value={bookingData.hours}
      onChange={handleChange}
      className="border-2 border-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
      required
    >
      <option value="">Selecciona la duración</option>
      <option value="5">5 horas</option>
      <option value="14">14 horas</option>
    </select>
  </div>

  {bookingData.hours && (
    <div className="flex flex-col mt-4">
      <label htmlFor="timeSlot" className="text-gray-700 font-semibold mb-2">
        Selecciona la hora de inicio
      </label>
      <select
        id="timeSlot"
        name="timeSlot"
        value={bookingData.timeSlot}
        onChange={handleChange}
        className="border-2 border-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
        required
      >
        <option value="">Selecciona una opción</option>
        {generateStartTimes().map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  )}
</div>
  );
};

export default CalendarComponent;
