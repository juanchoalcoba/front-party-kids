import { useState} from 'react';
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
  const [reservedTimeSlots, setReservedTimeSlots] = useState([]); // Lista de horas ya reservadas

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setBookingData({ ...bookingData, date });
    fetchReservedSlots(date); // Verificar disponibilidad para la nueva fecha
  };

  // Función para obtener las reservas de la base de datos
  const fetchReservedSlots = async (selectedDate) => {
    try {
      const response = await fetch(`https://api-party-kids.vercel.app/api/bookings?date=${selectedDate}`);
      const data = await response.json();
      
      // Asumimos que la respuesta contiene un array con las horas reservadas
      const reservedSlots = data.map((booking) => booking.timeSlot);
      setReservedTimeSlots(reservedSlots); // Guardamos las horas reservadas
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
    }
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
    window.location.href = '/'; // Redirige a la página de inicio (opcional)
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const generateStartTimes = () => {
    const times = [];
    let startHour = 8; // Empezamos a las 8:00 AM
    const maxStartHourFor4Hours = 20; // Última hora de inicio válida para 4 horas
    const maxStartHourFor8Hours = 16; // Última hora de inicio válida para 8 horas

    if (bookingData.hours === '4') {
      // Para 4 horas
      while (startHour <= maxStartHourFor4Hours) {
        const timeSlot = `${startHour}:00`;
        // Si el timeSlot no está reservado, lo agregamos a la lista
        if (!reservedTimeSlots.includes(timeSlot)) {
          times.push(timeSlot);
        }
        startHour++;
      }
    } else if (bookingData.hours === '8') {
      // Para 8 horas
      while (startHour <= maxStartHourFor8Hours) {
        const timeSlot = `${startHour}:00`;
        // Si el timeSlot no está reservado, lo agregamos a la lista
        if (!reservedTimeSlots.includes(timeSlot)) {
          times.push(timeSlot);
        }
        startHour++;
      }
    }
    return times;
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center bg-gradient-to-r from-violet-950 via-purple-600 to-blue-500 w-full min-h-screen font-robert-medium">
      <h1 className="text-3xl mb-6 font-bold text-center text-blue-50">¡Completa el formulario para registrar tu fiesta!</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-xl w-full sm:w-96">
        {/* Nombre del cliente */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 font-semibold mb-2">Tu Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Escribe tu nombre y apellido"
            value={bookingData.name}
            onChange={handleChange}
            className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
          />
        </div>

        {/* Nombre del niño/a */}
        <div className="flex flex-col">
          <label htmlFor="namekid" className="text-gray-700 font-semibold mb-2">Nombre del Niño/a</label>
          <input
            type="text"
            id="namekid"
            name="namekid"
            placeholder="Escribe el nombre del niño/a"
            value={bookingData.namekid}
            onChange={handleChange}
            className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
          />
        </div>


        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Escribe tu email"
            value={bookingData.email}
            onChange={handleChange}
            className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-700 font-semibold mb-2">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Escribe tu número de teléfono"
            value={bookingData.phone}
            onChange={handleChange}
            className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
            minLength="8" // Mínimo de 8 caracteres
            maxLength="9" // Máximo de 9 caracteres
            pattern="^\d{8,9}$" // Acepta solo números con 8 o 9 dígitos
            title="El número debe tener entre 8 y 9 dígitos"
          />
        </div>




        {/* Fecha */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Selecciona la Fecha</label>
          <CalendarComponent onDateChange={handleDateChange} />
        </div>

        {/* Duración */}
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

        {/* Hora de inicio */}
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
