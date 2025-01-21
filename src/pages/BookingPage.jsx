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
    hours: '', // Nuevo campo para la duración de la reserva
    timeSlot: '', // Campo para la selección de la hora específica
  });

  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar modal de confirmación de reserva
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Estado para mostrar/ocultar modal de confirmación antes de enviar
  const [modalMessage, setModalMessage] = useState(''); // Mensaje en el modal
  
  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setBookingData({ ...bookingData, date });
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

  const generateStartTimes = () => {
    const times = [];
    let startHour = 8; // Empezamos a las 8:00 AM
    const maxStartHourFor4Hours = 20; // Última hora de inicio válida para 4 horas (20:00)
    const maxStartHourFor8Hours = 16; // Última hora de inicio válida para 8 horas (16:00)
  
    // Calcula las horas inválidas según la duración de la fiesta
    const invalidHours = new Set();
    
    if (bookingData.hours === '4') {
      // Para 4 horas: excluimos 4 horas hacia atrás y 4 hacia adelante
      if (bookingData.timeSlot) {
        const selectedHour = parseInt(bookingData.timeSlot.split(':')[0], 10);
        for (let i = selectedHour - 4; i < selectedHour + 4; i++) {
          if (i >= 8 && i <= 20) invalidHours.add(i); // Asegura que la hora esté dentro de rango
        }
      }
    } else if (bookingData.hours === '8') {
      // Para 8 horas: excluimos 8 horas hacia atrás y 8 hacia adelante
      if (bookingData.timeSlot) {
        const selectedHour = parseInt(bookingData.timeSlot.split(':')[0], 10);
        for (let i = selectedHour - 8; i < selectedHour + 8; i++) {
          if (i >= 8 && i <= 16) invalidHours.add(i); // Asegura que la hora esté dentro de rango
        }
      }
    }
  
    // Generamos las horas válidas
    if (bookingData.hours === '4') {
      // Para 4 horas: desde las 8 AM hasta las 8 PM (último posible inicio a las 8 PM)
      while (startHour <= maxStartHourFor4Hours) {
        if (!invalidHours.has(startHour)) {
          times.push(`${startHour}:00`);
        }
        startHour++;
      }
    } else if (bookingData.hours === '8') {
      // Para 8 horas: desde las 8 AM hasta las 4 PM (último posible inicio a las 4 PM)
      while (startHour <= maxStartHourFor8Hours) {
        if (!invalidHours.has(startHour)) {
          times.push(`${startHour}:00`);
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

      {/* Modal de confirmación de reserva */}
      <ConfirmationModal 
        show={showConfirmationModal} 
        onClose={closeConfirmationModal} 
        onConfirm={handleConfirmSubmit} 
        bookingData={bookingData} 
      />

      {/* Mostrar modal de resultado final */}
      <Modal show={showModal} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default BookingPage;
