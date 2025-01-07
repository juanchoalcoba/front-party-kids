import { useState } from 'react';

const PrivatePage = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);

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
      // Fetch para obtener las reservas
      const response = await fetch(`https://api-party-kids.vercel.app/api/bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
         mode: "cors",
        referrerPolicy: "strict-origin-when-cross-origin"
      });
      
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDelete = async (id) => {
    // Confirmar la eliminación
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta reserva?');
    if (!confirmDelete) return;
  
    try {
      // Hacer la solicitud DELETE
      const response = await fetch(`https://api-party-kids.vercel.app/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: "cors",
        referrerPolicy: "strict-origin-when-cross-origin"
        
      });
  
      // Si la respuesta es exitosa, actualizar el estado
      if (response.ok) {
        // Actualizar la lista de reservas eliminando la reserva con el ID dado
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
        alert('Reserva eliminada con éxito');
      } else {
        // Si la eliminación falla, mostrar mensaje de error
        const data = await response.json();
        alert(data.message || 'Error eliminando la reserva');
      }
    } catch (error) {
      console.error('Error eliminando la reserva:', error);
      alert('Hubo un error al intentar eliminar la reserva');
    }
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
                <th className="px-6 py-4 font-semibold">Acciones</th> {/* Nueva columna de Acciones */}
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
                      onClick={() => handleDelete(booking._id)} // Botón para eliminar
                      className="py-2 px-4 bg-violet-700 text-gray-300 rounded hover:bg-red-600 transition duration-300"
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
    </div>
  );
};

export default PrivatePage;
