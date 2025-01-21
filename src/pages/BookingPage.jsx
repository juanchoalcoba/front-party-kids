import { useState, useEffect } from 'react';
import CalendarComponent from '../components/CalendarComponent';
import Modal from '../components/Modal'; // Importamos el modal para mostrar mensajes
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

  const [existingReservations, setExistingReservations] = useState([]); // Estado para las reservas existentes
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Función para obtener reservas existentes desde una API
    const fetchReservations = async () => {
      try {
        const response = await fetch('https://api-party-kids.vercel.app/api/reservations');
        if (response.ok) {
          const data = await response.json();
          setExistingReservations(data); // Guardamos las reservas en el estado
        } else {
          console.error('Error fetching reservations');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReservations(); // Llamamos a la función cuando se monte el componente
  }, []);

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

  const generateTimeSlots = (existingReservations, bookingData) => {
    const slots = [];
    let startHour = 8;
    const endHour = 24;

    if (bookingData.hours === '4') {
      while (startHour + 4 <= endHour) {
        const start = `${startHour}:00`;
        const end = `${startHour + 4}:00`;
        const slot = { start, end };

        if (!isTimeSlotAvailable(slot, existingReservations)) {
          slots.push({ timeSlot: `${start} - ${end}`, status: 'occupied' });
        } else if (isPartiallyOccupied(slot, existingReservations)) {
          slots.push({ timeSlot: `${start} - ${end}`, status: 'partially-occupied' });
        } else {
          slots.push({ timeSlot: `${start} - ${end}`, status: 'available' });
        }
        startHour += 1;
      }
    }

    if (bookingData.hours === '8') {
      while (startHour + 8 <= endHour) {
        const start = `${startHour}:00`;
        const end = `${startHour + 8}:00`;
        const slot = { start, end };

        if (!isTimeSlotAvailable(slot, existingReservations)) {
          slots.push({ timeSlot: `${start} - ${end}`, status: 'occupied' });
        } else if (isPartiallyOccupied(slot, existingReservations)) {
          slots.push({ timeSlot: `${start} - ${end}`, status: 'partially-occupied' });
        } else {
          slots.push({ timeSlot: `${start} - ${end}`, status: 'available' });
        }
        startHour += 1;
      }
    }

    return slots;
  };

  const isTimeSlotAvailable = (slot, existingReservations) => {
    return !existingReservations.some(reservation =>
      reservation.start <= slot.start && reservation.end >= slot.end
    );
  };

  const isPartiallyOccupied = (slot, existingReservations) => {
    return existingReservations.some(reservation =>
      (reservation.start < slot.end && reservation.end > slot.start) &&
      !(reservation.start <= slot.start && reservation.end >= slot.end)
    );
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
            <option value="">Selecciona una opción</option>
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
              {generateTimeSlots(existingReservations, bookingData).map((slot, index) => (
                <option
                  key={index}
                  value={slot.timeSlot}
                  disabled={slot.status === 'occupied'}
                  style={{ color: slot.status === 'occupied' ? 'red' : 'green' }}
                >
                  {slot.timeSlot} - {slot.status === 'occupied' ? 'No Disponible' : 'Disponible'}
                </option>
              ))}
            </select>
          </div>
        )}


        <button
          type="submit"
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-500 transition duration-300 ease-in-out w-full"
        >
          Enviar Solicitud
        </button>
      </form>

      {showModal && (
        <Modal message={modalMessage} onClose={closeModal} />
      )}

      {showConfirmationModal && (
        <ConfirmationModal
          bookingData={bookingData}
          onConfirm={handleConfirmSubmit}
          onClose={closeConfirmationModal}
        />
      )}
    </div>
  );
};

export default BookingPage;
