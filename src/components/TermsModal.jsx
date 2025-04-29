

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">Términos y Condiciones - Kids Party</h2>
        <p className="mb-4 text-sm text-gray-700">
          Al reservar en <strong>Kids Party</strong> (ubicado en Paso de los Toros, Uruguay) a través de nuestro sitio web 
          <a href="https://www.kidsparty.uy" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-1">www.kidsparty.uy</a>, 
          usted acepta las siguientes condiciones:
        </p>

        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2 mb-4">
          <li>La reserva se considera válida solo tras la confirmación por parte de nuestro equipo mediante una seña de $2000 del monto total.</li>
          <li>La llave del salón será entregada poco antes del horario de inicio del evento acordado.</li>
          <li>El inquilino es responsable por cualquier daño, pérdida o rotura de objetos, juegos o mobiliario del salón durante el uso del mismo.</li>
          <li>Está prohibido pegar cintas o clavos en las paredes, tirar papel picado, comer dentro de los juegos o subirse a la cama elástica con calzado.</li>
          <li>El incumplimiento de estas normas puede resultar en multas o la prohibición de acceso al salón en futuros eventos.</li>
        </ul>

        <p className="text-sm text-gray-700 mb-6">
          Al continuar con la reserva, declara haber leído, comprendido y aceptado estos términos y condiciones.
        </p>

        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
