import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css'; // Importa un archivo CSS personalizado para estilos

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const today = new Date();

  // Función para obtener fechas reservadas desde el backend
  const fetchBookedDates = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();

      // Agrupar las fechas de las reservas por día
      const bookings = data.map(booking => new Date(booking.date));
      setBookedDates(bookings);
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    }
  };

  useEffect(() => {
    fetchBookedDates(); // Llamada cuando el componente se monta
  }, []);

  // Función que maneja el cambio de fecha
  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  // Función para contar cuántas reservas existen para un día específico
  const countBookingsForDate = (date) => {
    return bookedDates.filter(bookedDate => 
      bookedDate.toDateString() === date.toDateString()
    ).length;
  };

  // Función para aplicar estilos personalizados a los días reservados
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const bookingCount = countBookingsForDate(date);

      // Si la fecha tiene dos o más reservas, se pinta de rojo
      if (bookingCount >= 2) {
        return 'booked-red';
      }

      // Si la fecha tiene una reserva, se pinta de amarillo
      if (bookingCount === 1) {
        return 'booked-yellow';
      }
    }
    return null;
  };

  // Función para deshabilitar las fechas reservadas y pasadas
  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      // Deshabilitar fechas pasadas
      if (date < today) {
        return true;
      }

      // Deshabilitar fechas con dos o más reservas
      const bookingCount = countBookingsForDate(date);
      if (bookingCount >= 2) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <Calendar 
        onChange={handleDateChange} 
        value={date}
        tileClassName={tileClassName} // Aplicar clases personalizadas a los días
        tileDisabled={disableDates} // Deshabilitar fechas pasadas y ocupadas
      />
    </div>
  );
};

export default CalendarComponent;
