import { useState } from "react";
import CalendarComponent from "../components/CalendarComponent";
import Modal from "../components/Modal";
import ConfirmationModal from "../components/ConfirmationModal";
import TermsModal from "../components/TermsModal"; // ✅ Importar el modal de términos
import bookingImage from "../assets/tejo.jpeg";
import { Link } from "react-router-dom";

const BookingPage = () => {
  const [bookingData, setBookingData] = useState({
    name: "",
    namekid: "",
    phone: "",
    date: new Date(),
  });

  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // ✅ Estado para el modal de términos
  const [termsOpen, setTermsOpen] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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
    if (
      !bookingData.name ||
      !bookingData.namekid ||
      !bookingData.phone ||
      !bookingData.date ||
      !bookingData.hours ||
      !bookingData.timeSlot
    ) {
      setModalMessage("Por favor, completa todos los campos.");
      setShowModal(true);
      return;
    }

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

  // ✅ Función para aceptar términos
  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setTermsOpen(false);
  };

  return (
    <div className="p-8 flex flex-col justify-center items-center w-full min-h-screen font-robert-medium">
      <div
        className="absolute top-0 left-0 w-full h-[175vh] bg-no-repeat  bg-center opacity-90 bg-cover z-[-1]"
        style={{ backgroundImage: `url(${bookingImage})` }}
      ></div>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90 z-[-2]"></div>

      {/* ✅ Mostrar el modal de términos al entrar */}
      <TermsModal isOpen={termsOpen} onClose={handleAcceptTerms} />

      {/* ✅ Solo mostrar el formulario si aceptó los términos */}
      {acceptedTerms && (
        <>
          <h1 className="text-3xl mb-6 font-robert-medium font-bold text-center text-white">
            ¡Completa el formulario para registrar tu evento!
          </h1>

          <form
  onSubmit={handleSubmit}
  className="space-y-6 bg-gradient-to-b from-pink-100 via-white to-cyan-100 p-8 rounded-2xl shadow-2xl w-full sm:w-96 border border-pink-200"
>
  <div className="flex flex-col">
    <label
      htmlFor="name"
      className="text-pink-700 font-bold mb-2 tracking-wide"
    >
      ✨ Tu Nombre
    </label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="Escribe tu nombre y apellido"
      value={bookingData.name}
      onChange={handleChange}
      className="border-2 border-pink-400 focus:border-cyan-500 focus:ring-4 focus:ring-pink-200 focus:outline-none p-3 w-full rounded-xl bg-white/90 placeholder-gray-400 transition-all duration-300 hover:shadow-lg"
      required
      pattern="^[A-Za-záéíóúÁÉÍÓÚñÑ]+(?:\s+[A-Za-záéíóúÁÉÍÓÚñÑ]+)+$"
      title="Por favor, ingresa al menos un nombre y un apellido"
    />
  </div>

  <div className="flex flex-col">
    <label
      htmlFor="namekid"
      className="text-cyan-700 font-bold mb-2 tracking-wide"
    >
      🎈 Nombre del Niño/a
    </label>
    <input
      type="text"
      id="namekid"
      name="namekid"
      placeholder="Escribe el nombre del niño/a"
      value={bookingData.namekid}
      onChange={handleChange}
      className="border-2 border-cyan-400 focus:border-pink-500 focus:ring-4 focus:ring-cyan-200 focus:outline-none p-3 w-full rounded-xl bg-white/90 placeholder-gray-400 transition-all duration-300 hover:shadow-lg"
      required
    />
  </div>

  <div className="flex flex-col">
    <label
      htmlFor="phone"
      className="text-purple-700 font-bold mb-2 tracking-wide"
    >
      📞 Teléfono
    </label>
    <input
      type="tel"
      id="phone"
      name="phone"
      placeholder="Escribe tu número de teléfono"
      value={bookingData.phone}
      onChange={handleChange}
      className="border-2 border-purple-400 focus:border-pink-500 focus:ring-4 focus:ring-purple-200 focus:outline-none p-3 w-full rounded-xl bg-white/90 placeholder-gray-400 transition-all duration-300 hover:shadow-lg"
      required
      minLength="8"
      maxLength="9"
      pattern="^\d{8,9}$"
      title="El número debe tener entre 8 y 9 dígitos"
    />
  </div>

  <div className="flex flex-col">
    <label className="text-fuchsia-700 font-bold mb-2 tracking-wide">
      📅 Selecciona la Fecha
    </label>
    <CalendarComponent
      onDateChange={handleDateChange}
      onBookingDataChange={handleBookingDataChange}
    />
  </div>

  <div className="flex justify-between gap-4">
    <Link
      to={-1}
      className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-900 text-white font-bold p-2 rounded-xl transition-all duration-300 w-full text-center block shadow-md hover:scale-105"
    >
      Atrás
    </Link>

    <button
      type="submit"
      className="bg-gradient-to-r leading-4 from-pink-500 via-cyan-500 to-purple-500 hover:from-pink-600 hover:via-cyan-600 hover:to-purple-600 text-white font-bold p-2 rounded-xl transition-all duration-300 w-full shadow-lg hover:scale-105"
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
        </>
      )}

      <Modal show={showModal} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default BookingPage;
