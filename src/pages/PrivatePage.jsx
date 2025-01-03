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
      const response = await fetch('https://api-party-kids.vercel.app/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{booking.name}</h3>
              <p className="text-gray-600 mb-2"><strong>Fecha:</strong> {new Date(booking.date).toLocaleDateString('en-CA')}</p>
              <p className="text-gray-600"><strong>Teléfono:</strong> {booking.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivatePage;
