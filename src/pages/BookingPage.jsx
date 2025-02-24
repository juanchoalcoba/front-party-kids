import { useState } from "react";
import CalendarComponent from "../components/CalendarComponent";
import Modal from "../components/Modal";
import ConfirmationModal from "../components/ConfirmationModal";
import bookingImage from "../assets/calendar.webp"; // Asegúrate de que la ruta sea correcta
import { Link } from "react-router-dom";

const BookingPage = () => {
  const [bookingData, setBookingData] = useState({
    name: "",
    namekid: "",
    email: "",
    phone: "",
    date: new Date(),
  });

  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setBookingData({ ...bookingData, date });
  };

  const handleBookingDataChange = (updatedBookingData) => {
    setBookingData((prev) => ({ ...prev, ...updatedBookingData }));
  };

  const handleConfirmSubmit = async () => {
    // Validar que todos los campos están completos
    if (
      !bookingData.name ||
      !bookingData.namekid ||
      !bookingData.email ||
      !bookingData.phone ||
      !bookingData.date ||
      !bookingData.hours ||
      !bookingData.timeSlot
    ) {
      setModalMessage("Por favor, completa todos los campos.");
      setShowModal(true);
      return;
    }

    // Enviar los datos
    try {
      const response = await fetch(
        "https://api-party-kids.vercel.app/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        setModalMessage(
          "Reserva completada, nos pondremos en contacto a la brevedad"
        );
        setShowConfirmationModal(false);
        setShowModal(true);
      } else {
        throw new Error("Error al enviar la reserva");
      }
    } catch (error) {
      setModalMessage("Error enviando la reserva: " + error.message);
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
    window.location.href = "/";
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center  w-full min-h-screen font-robert-medium">
      <div
        className="absolute top-0 left-0 w-full h-[175vh] bg-no-repeat blur-md bg-center opacity-60 bg-cover z-[-1]"
        style={{ backgroundImage: `url(${bookingImage})` }}
      ></div>

      {/* Overlay con opacidad para dar un efecto más elegante al hero */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90 z-[-2]"></div>
      <h1 className="text-3xl mb-6 font-robert-medium font-bold text-center text-blue-50">
        ¡Completa el formulario para registrar tu fiesta!
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-xl shadow-xl w-full sm:w-96"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 font-semibold mb-2">
            Tu Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Escribe tu nombre y apellido"
            value={bookingData.name}
            onChange={handleChange}
            className="border-2 border-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
            pattern="^[A-Za-záéíóúÁÉÍÓÚñÑ]+\s+[A-Za-záéíóúÁÉÍÓÚñÑ]+$"
            title="Por favor, ingresa al menos un nombre y un apellido"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="namekid" className="text-gray-700 font-semibold mb-2">
            Nombre del Niño/a
          </label>
          <input
            type="text"
            id="namekid"
            name="namekid"
            placeholder="Escribe el nombre del niño/a"
            value={bookingData.namekid}
            onChange={handleChange}
            className="border-2 border-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-semibold mb-2">
            Email (Opcional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Escribe tu email"
            value={bookingData.email}
            onChange={handleChange}
            className="border-2 border-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-700 font-semibold mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Escribe tu número de teléfono"
            value={bookingData.phone}
            onChange={handleChange}
            className="border-2 border-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-pink-300 focus:outline-none p-3 w-full rounded-lg"
            required
            minLength="8"
            maxLength="9"
            pattern="^\d{8,9}$"
            title="El número debe tener entre 8 y 9 dígitos"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">
            Selecciona la Fecha
          </label>
          <CalendarComponent
            onDateChange={handleDateChange}
            onBookingDataChange={handleBookingDataChange}
          />
        </div>

        <div className="flex justify-between gap-4">
          <Link
            to={-1}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-2 rounded-lg transition-all duration-300 w-full text-center block"
          >
            Atrás
          </Link>

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-pink-700 text-white font-bold p-2 rounded-lg transition-all duration-300 w-full"
          >
            Confirmar
          </button>
        </div>
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
