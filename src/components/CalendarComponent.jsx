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
      const { isDayFullyBooked } = generateStartTimes(date); // Obtenemos si el día está ocupado
  
      if (isDayFullyBooked) {
        return "complete-day"; // Si el día está totalmente ocupado, lo pintamos de rojo
      }
  
      // Si ya tiene alguna reserva, lo marcamos como "booked-date"
      if (
        bookedDates.some(
          (booking) => booking.date.toDateString() === date.toDateString()
        )
      ) {
        return "booked-date";
      }
  
      // Si la fecha es anterior a hoy, lo marcamos como "disabled-date"
      if (date < today) {
        return "disabled-date";
      }
    }
    return "";
  };
  

  const generateStartTimes = (date) => {
    const times = [];
    let startHour = 8; // La primera hora disponible es 8:00
    const maxStartHourFor4Hours = 20; // Última hora posible para una reserva de 4 horas (20:00)
    const maxStartHourFor8Hours = 16; // Última hora posible para una reserva de 8 horas (16:00)
  
    const selectedDateBookings = bookedDates.filter(
      (booking) => booking.date.toDateString() === date.toDateString()
    );
  
    const isTimeSlotAvailable = (hour) => {
      return !selectedDateBookings.some((booking) => {
        const bookedHour = parseInt(booking.timeSlot.split(":")[0]);
  
        // Validación para reservas de 4 horas
        if (booking.hours === "4") {
          return (
            (hour >= bookedHour && hour < bookedHour + 4) ||
            hour === bookedHour + 4 ||
            (hour >= bookedHour - 4 && hour < bookedHour) // Bloquea las 4 horas anteriores
          );
        }
        // Validación para reservas de 8 horas
        else if (booking.hours === "8") {
          return (
            (hour >= bookedHour && hour < bookedHour + 8) ||
            (hour >= bookedHour - 4 && hour < bookedHour) // Bloquea las 4 horas anteriores
          );
        }
        return false;
      });
    };
  
    let isDayFullyBooked = true; // Variable para indicar si el día está totalmente ocupado
  
    // Lógica para generar horarios disponibles para 4 horas
    if (bookingData.hours === "4") {
      while (startHour <= maxStartHourFor4Hours) {
        if (isTimeSlotAvailable(startHour)) {
          times.push(`${startHour}:00`);
          isDayFullyBooked = false; // Si hay al menos un horario disponible, el día no está completo
        }
        startHour++;
      }
    }
    // Lógica para generar horarios disponibles para 8 horas
    else if (bookingData.hours === "8") {
      if (!selectedDateBookings.some((b) => b.hours === "8")) {
        while (startHour <= maxStartHourFor8Hours) {
          if (isTimeSlotAvailable(startHour)) {
            times.push(`${startHour}:00`);
            isDayFullyBooked = false; // Si hay al menos un horario disponible, el día no está completo
          }
          startHour++;
        }
      }
    }
  
    // Devolver horarios y si el día está completamente ocupado
    return { times, isDayFullyBooked };
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
          Referencias
        </label>

        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-sm mr-2"></div>
          <span className="text-gray-700">Parcialmente ocupado</span>
        </div>

        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-red-600 rounded-sm mr-2"></div>
          <span className="text-gray-700">Sin disponibilidad</span>
        </div>

        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-cyan-600 rounded-sm mr-2"></div>
          <span className="text-gray-700">Disponibilidad total</span>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="hours" className="text-gray-700 font-semibold mb-2">
          Duración de la Fiesta
        </label>
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
          <label
            htmlFor="timeSlot"
            className="text-gray-700 font-semibold mb-2"
          >
            Selecciona la hora de inicio
          </label>
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
