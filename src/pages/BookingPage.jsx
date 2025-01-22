import { useState} from 'react';
import CalendarComponent from '../components/CalendarComponent';
import Modal from '../components/Modal'; // Importamos el modal para mostrar mensajes
import ConfirmationModal from '../components/ConfirmationModal'; // Modal para confirmar reserva

const BookingPage = () => {
  const [bookingData, setBookingData] = useState({
    name: '',
    namekid: '', // Nuevo campo para el nombre del niño/niña
    email: '',
    phone: '',
    date: new Date(),
    hours: '', // Nuevo campo para la duración de la reserva
    timeSlot: '', // Campo para la selección de la hora específica
  });

  const [reservedTimeSlots, setReservedTimeSlots] = useState([]); // Horarios reservados para la fecha seleccionada
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar modal de confirmación de reserva
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Estado para mostrar/ocultar modal de confirmación antes de enviar
  const [modalMessage, setModalMessage] = useState(''); // Mensaje en el modal
  
  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleDateChange = async (date) => {
    setBookingData({ ...bookingData, date });

    // Fetch para obtener las horas reservadas de la fecha seleccionada
    try {
      const response = await fetch(`https://api-party-kids.vercel.app/api/bookings?date=${date.toISOString()}`);
      if (response.ok) {
        const reservedSlots = await response.json();
        setReservedTimeSlots(reservedSlots); // Guardamos los horarios reservados para la fecha
      } else {
        console.error('Error fetching reserved time slots');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleConfirmSubmit = async () => {
    // Aquí hacemos el envío final de los datos al backend
    const response = await fetch('https://api-party-kids.vercel.app/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      setModalMessage('Reserva completada, nos pondremos en contacto a la brevedad');
      setShowConfirmationModal(false); // Cerrar modal de confirmación
      setShowModal(true); // Mostrar modal de éxito
    } else {
      setModalMessage('Error submitting the booking');
      setShowConfirmationModal(false); // Cerrar modal de confirmación
      setShowModal(true); // Mostrar modal de error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true); // Mostrar modal de confirmación
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.href = '/'; // Redirige a la página de inicio (opcional)
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  // Generar horas de inicio disponibles excluyendo las ya reservadas
  const generateStartTimes = () => {
    const times = [];
    let startHour = 8; // Empezamos a las 8:00 AM
    const maxStartHourFor4Hours = 20; // Última hora de inicio válida para 4 horas (20:00)
    const maxStartHourFor8Hours = 16; // Última hora de inicio válida para 8 horas (16:00)

    const maxStartHour = bookingData.hours === '4' ? maxStartHourFor4Hours : maxStartHourFor8Hours;

    while (startHour <= maxStartHour) {
      const time = `${startHour}:00`;
      // Si la hora no está reservada, la añadimos a las horas disponibles
      if (!reservedTimeSlots.includes(time)) {
        times.push(time);
      }
      startHour++;
    }
    return times;
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center bg-gradient-to-r from-violet-950 via-purple-600 to-blue-500 w-full min-h-screen font-robert-medium">
      <h1 className="text-3xl mb-6 font-bold text-center text-blue-50">¡Completa el formulario para registrar tu fiesta!</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-xl w-full sm:w-96">
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
            minLength="8"
            maxLength="9"
            pattern="^\d{8,9}$"
            title="El número debe tener entre 8 y 9 dígitos"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Selecciona la Fecha</label>
          <CalendarComponent onDateChange={handleDateChange} />
        </div>

        {/* Nuevo campo para seleccionar duración de horas */}
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
              <option value="">Selecciona una hora</option>
              {generateStartTimes().map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="bg-pink-400 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-pink-500 transition-all duration-300 w-full"
        >
          Confirmar Reserva
        </button>
      </form>

      {/* Modal para mensajes */}
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
      {/* Modal de confirmación antes de enviar */}
      {showConfirmationModal && (
        <ConfirmationModal
          onConfirm={handleConfirmSubmit}
          onClose={closeConfirmationModal}
          message="¿Estás seguro de confirmar la reserva?"
        />
      )}
    </div>
  );
};

export default BookingPage;
