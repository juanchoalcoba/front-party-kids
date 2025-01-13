import React, { useState } from 'react';

const ModalTerminos = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no se renderiza.

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/2">
        <h3 className="text-2xl font-bold mb-4 text-center">Términos y Condiciones</h3>
        <p className="mb-4">
          En <strong>Kids Party</strong>, nos comprometemos a ofrecerte la mejor experiencia para tus fiestas infantiles. Una vez que se realice una reserva, nos pondremos en contacto contigo para coordinar los detalles de la fiesta.
        </p>
        <p className="mb-4">
          Como parte de nuestra política, al realizar la reserva se debe abonar el 50% del valor total de la fiesta para asegurar la fecha. El restante 50% deberá ser pagado el día del evento. Solo cuando el pago inicial sea confirmado, la reserva quedará completamente asegurada.
        </p>
        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTerminos;
