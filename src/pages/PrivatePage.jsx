import { useState, useEffect } from 'react';

const PrivatePage = () => {
  const [bookings, setBookings] = useState([]);

  // Obtener reservas al montar el componente
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
        if (!response.ok) throw new Error('Error al obtener las reservas');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []); // Empty dependency array, solo se ejecuta al montar el componente

  // Eliminar reserva
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) return;

    try {
      const response = await fetch(`https://api-party-kids.vercel.app/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Error eliminando la reserva');
      
      // Eliminar de la lista de reservas en el frontend
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== id));
      alert('Reserva eliminada con éxito');
    } catch (error) {
      console.error('Error eliminando la reserva:', error);
      alert('Hubo un error al intentar eliminar la reserva');
    }
  };

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
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out">
                  <td className="px-6 py-4 text-gray-800">{booking.name}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(booking.date).toLocaleDateString('en-CA')}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.phone}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(booking._id)}
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
