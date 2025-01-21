import { useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ onDateChange, bookedDates }) => {
  const [date, setDate] = useState(new Date());
  const today = new Date(); // Fecha de hoy

  // Función que maneja el cambio de fecha
  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  // Función para deshabilitar fechas reservadas y pasadas
  const disableDates = ({ date, view }) => {
    if (view === 'month') {
      if (date < today) {
        return true;
      }

      // Deshabilitar fechas cuando ya no es posible reservar para 4 u 8 horas
      const isFullyBooked = bookedDates.some(booking => {
        const bookedDay = booking.date.toDateString() === date.toDateString();
        const bookedHours = parseInt(booking.hours, 10);
        return bookedDay && (bookedHours === 4 || bookedHours === 8);
      });

      if (isFullyBooked) {
        return true;
      }
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isPartiallyBooked = bookedDates.some(booking => {
        const bookedDay = booking.date.toDateString() === date.toDateString();
        return bookedDay && parseInt(booking.hours, 10) < 8;
      });

      if (isPartiallyBooked) {
        return 'bg-yellow-400';
      }

      const isFullyBooked = bookedDates.some(booking => {
        const bookedDay = booking.date.toDateString() === date.toDateString();
        const bookedHours = parseInt(booking.hours, 10);
        return bookedDay && bookedHours === 8;
      });

      if (isFullyBooked) {
        return 'bg-red-400';
      }
    }

    return null;
  };

  return (
    <Calendar
      onChange={handleDateChange}
      value={date}
      tileDisabled={disableDates}
      tileClassName={tileClassName}
      minDate={today}
    />
  );
};

export default CalendarComponent;
