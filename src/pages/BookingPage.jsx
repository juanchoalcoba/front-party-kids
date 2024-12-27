// client/src/pages/BookingPage.jsx
import { useState } from 'react';
import CalendarComponent from '../components/CalendarComponent';
import Modal from '../components/Modal'; // Importamos el modal

const BookingPage = () => {
  const [bookingData, setBookingData] = useState({
    name: '',
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
    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      setModalMessage('Booking successful!');
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
    <div className="p-8 flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4 text-center">Book a Date</h1>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center items-center">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={bookingData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={bookingData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={bookingData.phone}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <CalendarComponent onDateChange={handleDateChange} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>

      {/* Mostrar modal */}
      <Modal show={showModal} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default BookingPage;
