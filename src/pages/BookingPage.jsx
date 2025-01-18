import { useState } from 'react';
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
    duration: '', // Nuevo campo para la duración de la reserva
    selectedTime: '', // Nuevo campo para la hora seleccionada
  });

  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar modal de confirmación de reserva
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Estado para mostrar/ocultar modal de confirmación antes de enviar
  const [modalMessage, setModalMessage] = useState(''); // Mensaje en el modal
  
  const [availableTimes, setAvailableTimes] = useState([]); // Horarios disponibles según la duración

  // Manejo del cambio de input
  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setBookingData({ ...bookingData, date });
  };

  // Manejo de la selección de la duración (4 o 8 horas)
  const handleDurationChange = (e) => {
    const selectedDuration = e.target.value;
    setBookingData({ ...bookingData, duration: selectedDuration });
    
    // Configuración de los horarios disponibles según la duración seleccionada
    if (selectedDuration === '4') {
      setAvailableTimes([
        '09:00 AM - 01:00 PM', '10:00 AM - 02:00 PM', '11:00 AM - 03:00 PM', 
        '12:00 PM - 04:00 PM', '01:00 PM - 05:00 PM', '02:00 PM - 06:00 PM', 
        '03:00 PM - 07:00 PM', '04:00 PM - 08:00 PM', '05:00 PM - 09:00 PM', 
        '06:00 PM - 10:00 PM', '07:00 PM - 11:00 PM'
      ]);
    } else if (selectedDuration === '8') {
      setAvailableTimes([
        '09:00 AM - 05:00 PM', '10:00 AM - 06:00 PM', '11:00 AM - 07:00 PM', 
        '12:00 PM - 08:00 PM', '01:00 PM - 09:00 PM', '02:00 PM - 10:00 PM', 
        '03:00 PM - 11:00 PM'
      ]);
    } else {
      setAvailableTimes([]);
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
            minLength="8" // Mínimo de 8 caracteres
            maxLength="9" // Máximo de 9 caracteres
            pattern="^\d{8,9}$" // Acepta solo números con 8 o 9 dígitos
            title="El número debe tener entre 8 y 9 dígitos"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Selecciona la Fecha</label>
          <CalendarComponent onDateChange={handleDateChange} />
        </div>

        {/* Campo para seleccionar duración de la reserva */}
        <div className="flex flex-col">
          <label htmlFor="duration" className="text-gray-700 font-semibold mb-2">Duración de la Reserva</label>
          <select
            id="duration"
            name="duration"
            value={bookingData.duration}
            onChange={handleDurationChange}
            className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
          >
            <option value="">Selecciona la duración</option>
            <option value="4">4 horas</option>
            <option value="8">8 horas</option>
          </select>
        </div>

        {/* Campo para seleccionar la hora de la reserva, depende de la duración */}
        {availableTimes.length > 0 && (
          <div className="flex flex-col">
            <label htmlFor="selectedTime" className="text-gray-700 font-semibold mb-2">Selecciona el Horario</label>
            <select
              id="selectedTime"
              name="selectedTime"
              value={bookingData.selectedTime}
              onChange={handleChange}
              className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
              required
            >
              <option value="">Selecciona un horario</option>
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="bg-cyan-600 hover:bg-pink-700 text-white font-bold p-3 rounded-lg transition-all duration-300 w-full">
          Confirmar
        </button>
      </form>

      {/* Modal de confirmación */}
      {showConfirmationModal && (
        <ConfirmationModal
          message="¿Estás seguro de que deseas realizar esta reserva?"
          onConfirm={handleConfirmSubmit}
          onCancel={closeConfirmationModal}
        />
      )}

      {/* Modal de mensaje */}
      {showModal && (
        <Modal
          message={modalMessage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default BookingPage;
