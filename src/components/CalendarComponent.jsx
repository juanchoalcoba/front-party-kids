import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../App.css";

const CalendarComponent = ({
  onDateChange,
  onBookingDataChange,
  refreshFlag,
  customDisableDates,
  customTileClassName,
}) => {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const today = new Date();

  const [bookingData, setBookingData] = useState({
    hours: "",
    timeSlot: "",
  });

  // Fetch de datos al inicio y cuando se actualiza refreshFlag
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch(
          "https://api-party-kids.vercel.app/api/bookings"
        );
        const data = await response.json();
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

    fetchBookedDates();
  }, [refreshFlag]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const availableTimes = generateStartTimes(newDate);

    const updatedBookingData = {
      ...bookingData,
      date: newDate,
      timeSlot: "",
      availableTimes,
    };

    setBookingData(updatedBookingData);
    onDateChange?.(newDate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...bookingData, [name]: value };
    setBookingData(updated);
    onBookingDataChange(updated);
  };

  // Fallback si no se pasa customDisableDates
  const disableDates = customDisableDates || (({ date, view }) => {
    return view === "month" && date < today;
  });

  // Fallback si no se pasa customTileClassName
  const tileClassName = customTileClassName || (({ date, view }) => {
    if (view !== "month") return "";

    const selectedDateBookings = bookedDates.filter(
      (booking) => booking.date.toDateString() === date.toDateString()
    );

    const has5H_10 = selectedDateBookings.some(
      (b) => b.timeSlot === "10:00" && b.hours === "5"
    );
    const has5H_17 = selectedDateBookings.some(
      (b) => b.timeSlot === "17:00" && b.hours === "5"
    );
    const has14H = selectedDateBookings.some((b) => b.hours === "14");

    if (has14H || (has5H_10 && has5H_17)) return "unavailable-date";
    if (has5H_10 || has5H_17) return "partially-booked-date";
    if (date < today) return "disabled-date";

    return "";
  });

  const generateStartTimes = () => {
    const times = [];
    const startTimes5H = ["10:00", "17:00"];
    const startTime14H = "08:00";

    const selectedDateBookings = bookedDates.filter(
      (b) => b.date.toDateString() === date.toDateString()
    );

    const isTimeSlotAvailable = (time) => {
      return !selectedDateBookings.some((booking) => {
        if (booking.hours === "14") return true;
        if (booking.hours === "5") return booking.timeSlot === time;
        return false;
      });
    };

    const hasFiveHourBooking = selectedDateBookings.some(
      (booking) => booking.hours === "5"
    );

    if (bookingData.hours === "5") {
      startTimes5H.forEach((time) => {
        if (isTimeSlotAvailable(time)) {
          times.push(time);
        }
      });
    } else if (bookingData.hours === "14" && !hasFiveHourBooking) {
      if (isTimeSlotAvailable(startTime14H)) {
        times.push(startTime14H);
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
        <label className="text-gray-700 font-semibold mb-2">Disponibilidad</label>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 border border-black bg-white rounded-sm mr-2" />
          <span className="text-gray-700">Disponibilidad total</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-sm mr-2" />
          <span className="text-gray-700">Parcialmente ocupado</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-red-600 rounded-sm mr-2" />
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
