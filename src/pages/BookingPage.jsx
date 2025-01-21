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

  const [existingBookings, setExistingBookings] = useState([]); // Guardará las reservas existentes para la fecha seleccionada
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]); // Guardará las franjas horarias disponibles
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Efecto para buscar reservas existentes cada vez que cambia la fecha seleccionada
  useEffect(() => {
    const fetchBookingsForDate = async (date) => {
      const response = await fetch(`https://api-party-kids.vercel.app/api/bookings?date=${date.toISOString()}`);
      const data = await response.json();
      setExistingBookings(data); // Guardamos las reservas existentes
    };

    if (bookingData.date) {
      fetchBookingsForDate(bookingData.date);
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

  // Generar franjas horarias, excluyendo las franjas ya reservadas
  const generateTimeSlots = () => {
    const slots = [];
    let startHour = 8; 

    // Obtener las horas ocupadas
    const bookedSlots = existingBookings.map(booking => {
      const [start, end] = booking.timeSlot.split(' - ').map(time => parseInt(time));
      return { start, end };
    });

    if (bookingData.hours === '4') {
      while (startHour <= 20) {
        const start = `${startHour}:00`;
        const end = `${startHour + 4}:00`;

        // Verificar si este intervalo está disponible
        const isAvailable = !bookedSlots.some(slot => 
          (startHour >= slot.start && startHour < slot.end) || 
          (startHour + 4 > slot.start && startHour + 4 <= slot.end)
        );

        if (isAvailable) {
          slots.push(`${start} - ${end}`);
        }
        startHour++;
      }
    } else if (bookingData.hours === '8') {
      while (startHour <= 16) {
        const start = `${startHour}:00`;
        const end = `${startHour + 8}:00`;

        // Verificar si este intervalo está disponible
        const isAvailable = !bookedSlots.some(slot => 
          (startHour >= slot.start && startHour < slot.end) || 
          (startHour + 8 > slot.start && startHour + 8 <= slot.end)
        );

        if (isAvailable) {
          slots.push(`${start} - ${end}`);
        }
        startHour++;
      }
    }

    return slots;
  };

  // Actualizar franjas horarias disponibles cada vez que cambia la duración o la fecha
  useEffect(() => {
    if (bookingData.hours) {
      const slots = generateTimeSlots();
      setAvailableTimeSlots(slots);
    }
  }, [bookingData.hours, existingBookings]);

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
            <option value="">Selecciona la duración</option>
            <option value="4">4 horas</option>
            <option value="8">8 horas</option>
          </select>
        </div>

        {bookingData.hours && (
          <div className="flex flex-col">
            <label htmlFor="timeSlot" className="text-gray-700 font-semibold mb-2">Elige la Franja Horaria</label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={bookingData.timeSlot}
              onChange={handleChange}
              className="border-2 border-gray-300 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
              required
            >
              <option value="">Selecciona una franja horaria</option>
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))
              ) : (
                <option value="">No hay franjas disponibles</option>
              )}
            </select>
          </div>
        )}

        <button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg shadow-md w-full">
          Registrar Fiesta
        </button>
      </form>

      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
      {showConfirmationModal && <ConfirmationModal onConfirm={handleConfirmSubmit} onCancel={closeConfirmationModal} />}
    </div>
  );
};

export default BookingPage;
