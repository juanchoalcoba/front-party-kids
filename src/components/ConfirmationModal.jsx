import { useState } from 'react';

const ConfirmationModal = ({ show, onClose, onConfirm, bookingData }) => {
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el loading
  const [isDisabled, setIsDisabled] = useState(false); // Estado para deshabilitar el botón después del envío

  const handleConfirm = async () => {
    setIsLoading(true); // Activamos el estado de carga
    setIsDisabled(true); // Deshabilitamos el botón permanentemente

    // Simulamos un retraso para la confirmación (ej. llamada a una API)
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 segundos de simulación

    // Después de que el proceso termine, ejecutamos la función onConfirm
    onConfirm();

    // Mantener el botón deshabilitado y cerrar el modal
    setIsLoading(false);
    onClose(); // Cerramos el modal solo después de confirmar
  };

  if (!show) return null;

  return (
    <div>
      {/* Overlay oscuro */}
      <div className="fixed inset-0 bg-black opacity-70 z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative z-50">
          <h2 className="text-xl font-bold mb-4">¿Estás seguro de confirmar la reserva?</h2>
          <div className="mb-4 space-y-2">
            <p><strong>Tu Nombre:</strong> {bookingData.name}</p>
            <p><strong>Nombre del Niño/a:</strong> {bookingData.namekid}</p>
            <p><strong>Email:</strong> {bookingData.email}</p>
            <p><strong>Teléfono:</strong> {bookingData.phone}</p>
            <p><strong>Fecha de la Fiesta:</strong> {bookingData.date.toLocaleDateString()}</p>
            <p><strong>Duración:</strong> {bookingData.hours} horas</p>
            <p><strong>Franja Horaria:</strong> {bookingData.timeSlot}</p>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition-all duration-300"
              onClick={onClose}
              disabled={isLoading} // Deshabilita el botón durante el proceso de carga
            >
              Cancelar
            </button>
            <button
              className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-all duration-300"
              onClick={handleConfirm} // Usamos handleConfirm para simular el envío
              disabled={isDisabled} // El botón se mantiene deshabilitado permanentemente
            >
              {isLoading ? 'Enviando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
