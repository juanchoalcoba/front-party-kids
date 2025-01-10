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
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-xl w-full sm:w-96">
  <div className="flex flex-col">
    <label htmlFor="name" className="text-gray-700 font-semibold mb-2">Tu Nombre</label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Escribe tu nombre"
      value={bookingData.name}
      onChange={handleChange}
      className="border-2 border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="namekid" className="text-gray-700 font-semibold mb-2">Nombre del Niño/Niña</label>
    <input
      type="text"
      id="namekid"
      name="namekid"
      placeholder="Escribe el nombre del niño/niña"
      value={bookingData.namekid}
      onChange={handleChange}
      className="border-2 border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
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
      className="border-2 border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
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
      className="border-2 border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
      required
    />
  </div>

  <div className="flex flex-col">
    <label className="text-gray-700 font-semibold mb-2">Selecciona la Fecha</label>
    <CalendarComponent onDateChange={handleDateChange} />
  </div>

  <button type="submit" className="bg-pink-500 hover:bg-cyan-700 text-white font-bold p-3 rounded-lg transition-all duration-300 w-full">
    Confirmar
  </button>
</form>


      {/* Mostrar modal */}
      <Modal show={showModal} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default BookingPage;
