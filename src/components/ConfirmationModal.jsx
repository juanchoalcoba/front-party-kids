const ConfirmationModal = ({ show, onClose, onConfirm, bookingData }) => {
  if (!show) return null;

  return (
    <div>
      {/* Overlay oscuro */}
      <div className="fixed inset-0 bg-black opacity-80 z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-[23rem] w-full relative z-50">
          <h2 className="text-lg font-bold mb-4">¿Estás seguro de confirmar la reserva?</h2>
          <div className="mb-4 space-y-2">
            <p><strong>Tu Nombre:</strong> {bookingData.name}</p>
            <p><strong>Nombre del Niño/a:</strong> {bookingData.namekid}</p>
            <p><strong>Email:</strong> {bookingData.email}</p>
            <p><strong>Teléfono:</strong> {bookingData.phone}</p>
            <p><strong>Fecha de la Fiesta:</strong> {bookingData.date.toLocaleDateString()}</p>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-all duration-300"
              onClick={onConfirm}
            >
              Confirmar
            </button>
            <button
              className="bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition-all duration-300"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
