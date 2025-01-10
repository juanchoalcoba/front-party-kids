import { useState } from 'react';
import CalendarComponent from '../components/CalendarComponent';
import Modal from '../components/Modal'; // Importamos el modal

const BookingPage = () => {
  const [bookingData, setBookingData] = useState({
    name: '',
    namekid: '', // Nuevo campo para el nombre del niño/niña
    email: '',
    phone: '',
    date: new Date(),
  });
  
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar modal
  const [modalMessage, setModalMessage] = useState(''); // Mensaje en el modal

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setBookingData({ ...bookingData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://api-party-kids.vercel.app/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      setModalMessage('Reserva completada, nos pondremos en contacto a la brevedad');
      setShowModal(true); // Mostrar modal si la reserva fue exitosa
    } else {
      setModalMessage('Error submitting the booking');
      setShowModal(true); // Mostrar modal en caso de error
    }
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.href = '/'; // Redirige a la página de inicio (opcional)
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center bg-violet-950 w-full min-h-screen font-general">
      <h1 className="text-3xl mb-6 font-bold text-center text-blue-50">¡Completa el formulario para registrar tu fiesta!</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg w-full sm:w-96">
        <input
          type="text"
          name="name"
          placeholder="Tu Nombre"
          value={bookingData.name}
          onChange={handleChange}
          className="border-2 border-pink-500 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
          required
        />
        
        <input
          type="text"
          name="namekid"
          placeholder="Nombre del Niño/Niña"
          value={bookingData.namekid}
          onChange={handleChange}
          className="border-2 border-pink-500 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={bookingData.email}
          onChange={handleChange}
          className="border-2 border-pink-500 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={bookingData.phone}
          onChange={handleChange}
          className="border-2 border-pink-500 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
          required
        />

        <CalendarComponent onDateChange={handleDateChange} />

        <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold p-3 rounded-lg transition-all duration-300 w-full">
          Confirmar
        </button>
      </form>

      {/* Mostrar modal */}
      <Modal show={showModal} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default BookingPage;
