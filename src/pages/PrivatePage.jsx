import { useState } from 'react';

const PrivatePage = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleLogin = () => {
    const presetPassword = '12345'; // Aquí colocas la contraseña preestablecida
    if (password === presetPassword) {
      setAuthenticated(true);
      fetchBookings();
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings', {
        method: 'GET', // Cambiado de 'DELETE' a 'GET' para obtener reservas
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setBookings(data); // Almacenar las reservas en el estado
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedBookingId) return;

    try {
      const response = await fetch(`https://api-party-kids.vercel.app/api/bookings/${selectedBookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== selectedBookingId));
        setShowConfirmModal(false); // Cerrar modal después de la eliminación
        alert('Reserva eliminada con éxito');
      } else {
        console.error('Error eliminando la reserva');
      }
    } catch (error) {
      console.error('Error eliminando la reserva:', error);
    }
  };

  const openConfirmModal = (id) => {
    setSelectedBookingId(id);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedBookingId(null);
  };

  if (!authenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200 p-6">
        <div className="max-w-sm w-full bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Acceso Privado</h2>
          <p className="text-gray-600 text-center mb-4">Ingrese la contraseña para acceder a las reservas</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Contraseña"
          />
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Acceder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Reservas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-left">
                <th className="px-6 py-4 font-semibold">Nombre</th>
                <th className="px-6 py-4 font-semibold">Fecha</th>
                <th className="px-6 py-4 font-semibold">Teléfono</th>
                <th className="px-6 py-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out">
                  <td className="px-6 py-4 text-gray-800">{booking.name}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(booking.date).toLocaleDateString('en-CA')}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.phone}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openConfirmModal(booking._id)} // Botón para abrir el modal
                      className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">Confirmar Eliminación</h3>
            <p className="text-center text-gray-600 mb-4">¿Estás seguro de que deseas eliminar esta reserva?</p>
            <div className="flex justify-around">
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
              >
                Sí, eliminar
              </button>
              <button
                onClick={closeConfirmModal}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivatePage;
