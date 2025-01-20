import { useState, useEffect } from 'react';
import CalendarComponent from '../components/CalendarComponent'; // Asegúrate de tener este componente para seleccionar la fecha
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

  const [existingBookings, setExistingBookings] = useState([]); // Guardar reservas existentes para el día seleccionado
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Fetch de las reservas existentes al seleccionar una fecha
    const fetchBookings = async () => {
      const response = await fetch(`https://api-party-kids.vercel.app/api/bookings?date=${bookingData.date.toISOString()}`);
      if (response.ok) {
        const data = await response.json();
        setExistingBookings(data); // Guardamos las reservas existentes en el estado
      }
    };
    
    if (bookingData.date) {
      fetchBookings();
    }
  }, [bookingData.date]);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setBookingData({ ...bookingData, date });
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
      setModalMessage('Error al enviar la reserva');
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

  // Función para verificar las franjas horarias ocupadas y generar las disponibles
  const generateTimeSlots = () => {
    const slots = [];
    let startHour = 8;
    const bookedRanges = existingBookings.map(booking => ({
      start: parseInt(booking.timeSlot.split(' - ')[0], 10),
      end: parseInt(booking.timeSlot.split(' - ')[1], 10),
    }));

    if (bookingData.hours === '4') {
      while (startHour <= 20) {
        const endHour = startHour + 4;
        const isSlotAvailable = !bookedRanges.some(
          (range) => startHour < range.end && endHour > range.start
        );

        if (isSlotAvailable) {
          slots.push(`${startHour}:00 - ${endHour}:00`);
        }

        startHour++;
      }
    } else if (bookingData.hours === '8') {
      while (startHour <= 16) {
        const endHour = startHour + 8;
        const isSlotAvailable = !bookedRanges.some(
          (range) => startHour < range.end && endHour > range.start
        );

        if (isSlotAvailable) {
          slots.push(`${startHour}:00 - ${endHour}:00`);
        }

        startHour++;
      }
    }
    return slots;
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center bg-gradient-to-r from-violet-950 via-purple-600 to-blue-500 w-full min-h-screen font-robert-medium">
      <h1 className="text-3xl mb-6 font-bold text-center text-blue-50">¡Completa el formulario para registrar tu fiesta!</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-xl w-full sm:w-96">
        {/* Campo nombre del organizador */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 font-semibold mb-2">Nombre del Organizador</label>
          <input
            type="text"
            id="name"
            name="name"
            value={bookingData.name}
            onChange={handleChange}
            className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
          />
        </div>

        {/* Campo nombre del niño */}
        <div className="flex flex-col">
          <label htmlFor="namekid" className="text-gray-700 font-semibold mb-2">Nombre del Niño</label>
          <input
            type="text"
            id="namekid"
            name="namekid"
            value={bookingData.namekid}
            onChange={handleChange}
            className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
          />
        </div>

        {/* Campo email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={bookingData.email}
            onChange={handleChange}
            className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
          />
        </div>

        {/* Campo teléfono */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-700 font-semibold mb-2">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={bookingData.phone}
            onChange={handleChange}
            className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
          />
        </div>
        {/* Calendario de selección de fecha */}
        <CalendarComponent selectedDate={bookingData.date} onDateChange={handleDateChange} />

        {/* Campo de duración */}
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

        {/* Campo de selección de hora */}
        {bookingData.hours && (
          <div className="flex flex-col">
            <label htmlFor="timeSlot" className="text-gray-700 font-semibold mb-2">Selecciona la franja horaria</label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={bookingData.timeSlot}
              onChange={handleChange}
              className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
              required
            >
              <option value="">Selecciona una opción</option>
              {generateTimeSlots().map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
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
