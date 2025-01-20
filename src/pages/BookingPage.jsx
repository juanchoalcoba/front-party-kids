import { useState, useEffect } from 'react';
import CalendarComponent from '../components/CalendarComponent';
import Modal from '../components/Modal'; // Modal para mostrar mensajes
import ConfirmationModal from '../components/ConfirmationModal'; // Modal para confirmar reserva

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
  const [bookedHours, setBookedHours] = useState({}); // Guardar franjas horarias ocupadas por fecha

  // Función para obtener las fechas y franjas horarias ocupadas
  const fetchBookedDates = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      const slots = {};

      data.forEach(booking => {
        const bookingDate = new Date(booking.date);
        const startTime = new Date(booking.date).getHours();
        const endTime = startTime + parseInt(booking.hours, 10);
        
        slots[bookingDate.toDateString()] = slots[bookingDate.toDateString()] || [];
        for (let i = startTime; i < endTime; i++) {
          slots[bookingDate.toDateString()].push(`${i}:00`);
        }
      });

      setBookedHours(slots); // Actualiza las franjas horarias ocupadas
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    }
  };

  useEffect(() => {
    fetchBookedDates(); // Cargar las franjas horarias ocupadas
  }, []);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setBookingData({ ...bookingData, date });
  };

  const generateTimeSlots = () => {
    const slots = [];
    const bookedSlotsForDay = bookedHours[bookingData.date.toDateString()] || [];

    const allSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Horas del día
    const available = allSlots.filter(slot => !bookedSlotsForDay.includes(slot));

    // Generamos franjas horarias de acuerdo con la duración seleccionada
    if (bookingData.hours === '4') {
      available.forEach(slot => {
        const start = slot;
        const end = `${parseInt(slot.split(':')[0], 10) + 4}:00`;
        slots.push(`${start} - ${end}`);
      });
    } else if (bookingData.hours === '8') {
      available.forEach(slot => {
        const start = slot;
        const end = `${parseInt(slot.split(':')[0], 10) + 8}:00`;
        slots.push(`${start} - ${end}`);
      });
    }

    return slots;
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
      setModalMessage('Error al realizar la reserva');
      setShowConfirmationModal(false);
      setShowModal(true);
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
            minLength="8"
            maxLength="9"
            pattern="^\d{8,9}$"
            title="El número debe tener entre 8 y 9 dígitos"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Selecciona la Fecha</label>
          <CalendarComponent onDateChange={handleDateChange} setBookedHours={setBookedHours} />
        </div>

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

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-800 to-blue-500 text-white p-3 w-full rounded-lg mt-6 font-bold"
        >
          Reservar Fiesta
        </button>
      </form>

      <Modal isOpen={showModal} onClose={closeModal} message={modalMessage} />
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={closeConfirmationModal}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  );
};

export default BookingPage;
