const ConfirmationModal = ({ show, onClose, onConfirm, bookingData }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Confirmar Reserva</h2>
          <p className="mb-4">Por favor, revisa los detalles antes de confirmar:</p>
          
          <div className="mb-4">
            <p><strong>Tu Nombre:</strong> {bookingData.name}</p>
            <p><strong>Nombre del Niño/a:</strong> {bookingData.namekid}</p>
            <p><strong>Email:</strong> {bookingData.email}</p>
            <p><strong>Teléfono:</strong> {bookingData.phone}</p>
            <p><strong>Fecha:</strong> {bookingData.date.toLocaleDateString()}</p>
          </div>
  
          <div className="flex justify-end space-x-4">
            <button 
              className="bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-md"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              className="bg-cyan-600 hover:bg-pink-700 text-white p-2 rounded-md"
              onClick={onConfirm}
            >
              Confirmar Reserva
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;
  