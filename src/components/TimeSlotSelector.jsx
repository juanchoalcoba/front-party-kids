import { useState, useEffect } from 'react';

const TimeSlotSelector = ({ selectedDate }) => {
  const [bookedSlots, setBookedSlots] = useState({});
  
  // Función para obtener las reservas de un día específico
  const fetchBookedSlots = async (selectedDate) => {
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Solo la parte de la fecha sin hora
      const response = await fetch(`https://api-party-kids.vercel.app/api/bookings?date=${formattedDate}`);
      const data = await response.json();
      
      const slots = {};
      data.forEach(booking => {
        const startHour = new Date(booking.timeSlot).getHours(); // La hora de inicio de la reserva
        const hours = booking.hours; // Duración de la reserva en horas
        
        // Marcar las horas ocupadas según la duración
        for (let hour = startHour; hour < startHour + hours; hour++) {
          slots[hour] = true; // Marca las horas ocupadas
        }
      });
      
      setBookedSlots(slots); // Guardamos las horas ocupadas en el estado
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate); // Llamada a la API para el día seleccionado
    }
  }, [selectedDate]);

  // Función para deshabilitar las horas reservadas
  const isHourBooked = (hour) => {
    return bookedSlots[hour] === true; // Si la hora está ocupada, retornamos true
  };

  return (
    <div>
      <h3>Seleccione una hora para el {selectedDate.toDateString()}</h3>
      {Array.from({ length: 24 }, (_, hour) => (
        <button
          key={hour}
          disabled={isHourBooked(hour)} // Deshabilitar las horas ocupadas
          className={isHourBooked(hour) ? 'disabled-time-slot' : 'time-slot'}
        >
          {hour}:00
        </button>
      ))}
    </div>
  );
};

export default TimeSlotSelector;
