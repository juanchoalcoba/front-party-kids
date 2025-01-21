import { useState, useEffect } from 'react';
import CalendarComponent from '../components/CalendarComponent';
import Modal from '../components/Modal'; 
import ConfirmationModal from '../components/ConfirmationModal'; 

const BookingPage = () => {
  const [bookingData, setBookingData] = useState({
    name: '',
    namekid: '',
    email: '',
    phone: '',
    date: new Date(),
    hours: '',
    timeSlot: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [bookedHours, setBookedHours] = useState([]); // Para gestionar las horas ya reservadas por fecha

  // Traemos las reservas del backend para conocer las horas ocupadas
  const fetchBookedHours = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      const booked = data.map(booking => ({
        date: new Date(booking.date).toDateString(),
        timeSlot: booking.timeSlot,
      }));
      setBookedHours(booked);
    } catch (error) {
      console.error('Error fetching booked hours:', error);
    }
  };

  useEffect(() => {
    fetchBookedHours(); // Cargamos las horas reservadas al cargar la página
  }, []);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setBookingData({ ...bookingData, date });
  };

  const generateStartTimes = () => {
    const times = [];
    let startHour = 8;
    const maxStartHourFor4Hours = 20; 
    const maxStartHourFor8Hours = 16;

    // Obtenemos las horas ya reservadas para esta fecha
    const bookedSlotsForDate = bookedHours.filter(
      booking => new Date(booking.date).toDateString() === bookingData.date.toDateString()
    ).map(booking => booking.timeSlot);

    if (bookingData.hours === '4') {
      while (startHour <= maxStartHourFor4Hours) {
        if (!bookedSlotsForDate.includes(`${startHour}:00`)) {
          times.push(`${startHour}:00`);
        }
        startHour++;
      }
    } else if (bookingData.hours === '8') {
      while (startHour <= maxStartHourFor8Hours) {
        if (!bookedSlotsForDate.includes(`${startHour}:00`)) {
          times.push(`${startHour}:00`);
        }
        startHour++;
      }
    }
    return times;
  };

  const handleConfirmSubmit = async () => {
    const response = await fetch('https://api-party-kids.vercel.app/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      setModalMessage('Reserva completada, nos pondremos en contacto a la brevedad');
      setShowConfirmationModal(false);
      setShowModal(true);
    } else {
      setModalMessage('Error submitting the booking');
      setShowConfirmationModal(false);
      setShowModal(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.href = '/';
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center bg-gradient-to-r from-violet-950 via-purple-600 to-blue-500 w-full min-h-screen font-robert-medium">
      <h1 className="text-3xl mb-6 font-bold text-center text-blue-50">¡Completa el formulario para registrar tu fiesta!</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-xl w-full sm:w-96">
        {/* Aquí van todos los campos del formulario */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Selecciona la Fecha</label>
          <CalendarComponent onDateChange={handleDateChange} bookedHours={bookedHours} />
        </div>

        {/* Otros campos como nombre, email, etc. */}

        {/* Campo para seleccionar duración de horas */}
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

        {/* Campo para seleccionar la hora de inicio dependiendo de la duración */}
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

        <button type="submit" className="bg-cyan-600 hover:bg-pink-700 text-white font-bold p-3 rounded-lg transition-all duration-300 w-full">
          Confirmar
        </button>
      </form>

      <ConfirmationModal 
        show={showConfirmationModal} 
        onClose={closeConfirmationModal} 
        onConfirm={handleConfirmSubmit} 
        bookingData={bookingData} 
      />

      <Modal show={showModal} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default BookingPage;
