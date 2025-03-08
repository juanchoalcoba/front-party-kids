import { useState } from "react";

const PrivatePage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);

  const handleLogin = () => {
    const presetPassword = "Kids.2025"; // Contraseña preestablecida
    if (password === presetPassword) {
      setAuthenticated(true);
      fetchBookings(); // Cargar las reservas una vez autenticado
    } else {
      alert("Contraseña incorrecta");
    }
  };

  // Obtener reservas
  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "https://api-party-kids.vercel.app/api/bookings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Error al obtener las reservas");

      const data = await response.json();
      setBookings(data); // Actualizar estado con las reservas
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Eliminar reserva
  const handleDelete = async (name) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar esta reserva?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://api-party-kids.vercel.app/api/bookings?name=${name}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error eliminando la reserva");
      }

      // Si la eliminación es exitosa, actualizar el estado eliminando la reserva
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.name !== name)
      );
      alert("Reserva eliminada con éxito");
    } catch (error) {
      console.error("Error eliminando la reserva:", error);
      alert("Hubo un error al intentar eliminar la reserva");
    }
  };

  // Confirmar reserva
  const handleConfirm = async (name) => {
    const confirm = window.confirm(
      "¿Estás seguro de que quieres CONFIRMAR esta reserva?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `https://api-party-kids.vercel.app/api/bookings?name=${name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error confirmando la reserva");
      }

      // Si la confirmación es exitosa, actualizar el estado
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.name === name ? { ...booking, confirmed: true } : booking
        )
      );
      alert("Reserva confirmada con éxito");
    } catch (error) {
      console.error("Error confirmando la reserva:", error);
      alert("Hubo un error al intentar confirmar la reserva");
    }
  };

  const handleViewed = async (name) => {
    const viewed = window.confirm(
      "¿Estás seguro de que quieres marcar esta reserva como leída?"
    );
    if (!viewed) return;

    try {
      const response = await fetch(
        `https://api-party-kids.vercel.app/api/bookings`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }), // Enviamos el 'name' en el cuerpo de la solicitud
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message || "Error al marcar la reserva como leída"
        );
      }

      // Si la confirmación es exitosa, actualizamos el estado
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.name === name ? { ...booking, viewedByAdmin: true } : booking
        )
      );
      alert("Reserva marcada como leída con éxito");
    } catch (error) {
      console.error("Error marcando la reserva como leída:", error);
      alert("Hubo un error al intentar marcar la reserva como leída");
    }
  };

  // Autenticación
  if (!authenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
        <div className="max-w-sm w-full bg-gray-800 shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Acceso Privado
          </h2>
          <p className="text-gray-400 text-center mb-4">
            Ingrese la contraseña para acceder a las reservas
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-gray-800"
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

  // Filtrar reservas pendientes y confirmadas
  const pendingBookings = bookings.filter((booking) => !booking.confirmed);

  // Agrupar reservas confirmadas por mes
  const confirmedBookings = bookings
    .filter((booking) => booking.confirmed)
    .reduce((acc, booking) => {
      const month = new Date(booking.date).toLocaleString("default", {
        month: "long",
      });
      const year = new Date(booking.date).getFullYear();
      const monthYear = `${month} ${year}`;

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(booking);
      return acc;
    }, {});

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-gray-800 shadow-xl rounded-lg p-8 border-4 border-violet-400">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Reservas Pendientes
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-gray-800 text-white shadow-md rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-700 text-gray-300 text-left">
                <th className="px-4 py-2 font-semibold">Nombre</th>
                <th className="px-4 py-2 font-semibold">
                  Nombre del Niño/Niña
                </th>
                <th className="px-4 py-2 font-semibold">Fecha</th>
                <th className="px-4 py-2 font-semibold">Teléfono</th>
                <th className="px-4 py-2 font-semibold">Duracion</th>
                <th className="px-4 py-2 font-semibold">Horario</th>
                <th className="px-4 py-2 font-semibold">Leer/Ver</th>
                <th className="px-4 py-2 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pendingBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out"
                >
                  <td className="px-4 py-2 text-gray-200">{booking.name}</td>
                  <td className="px-4 py-2 text-gray-200">{booking.namekid}</td>
                  <td className="px-4 py-2 text-gray-300">
                    {new Date(booking.date).toLocaleDateString("en-CA")}
                  </td>
                  <td className="px-4 py-2 text-gray-300">{booking.phone}</td>
                  <td className="px-4 py-2 text-gray-300">
                    {booking.hours} horas
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {booking.timeSlot}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    <input
                      type="checkbox"
                      checked={booking.viewedByAdmin} // El estado de la reserva (si ya ha sido vista o no)
                      onChange={() => handleViewed(booking.name)} // Llama a la función con el nombre de la reserva
                      disabled={booking.viewedByAdmin} // Deshabilita el checkbox si ya ha sido marcado
                    />
                  </td>
                  <td className="flex flex-row justify-center items-center px-4 py-2">
                    <button
                      onClick={() => handleDelete(booking.name)}
                      className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300 min-w-[120px]"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleConfirm(booking.name)}
                      className={`ml-4 py-2 px-4 ${
                        booking.confirmed ? "bg-green-500" : "bg-blue-500"
                      } text-white rounded hover:bg-blue-600 transition duration-300 min-w-[120px]`}
                    >
                      {booking.confirmed ? "Confirmada" : "Confirmar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mostrar las reservas confirmadas por mes */}
        {Object.keys(confirmedBookings).length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-center text-white mb-6">
              Reservas Confirmadas
            </h2>
            {Object.keys(confirmedBookings).map((monthYear) => (
              <div key={monthYear} className="mt-8">
                <h3 className="text-2xl text-center text-white">
                  {monthYear}
                </h3>
                <table className="min-w-full table-auto bg-gray-800 text-white shadow-md rounded-lg text-sm">
                  <thead>
                    <tr className="bg-gray-700 text-gray-300 text-left">
                      <th className="px-4 py-2 font-semibold">Nombre</th>
                      <th className="px-4 py-2 font-semibold">
                        Nombre del Niño/Niña
                      </th>
                      <th className="px-4 py-2 font-semibold">Fecha</th>
                      <th className="px-4 py-2 font-semibold">Teléfono</th>
                      <th className="px-4 py-2 font-semibold">Duracion</th>
                      <th className="px-4 py-2 font-semibold">Horario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmedBookings[monthYear].map((booking) => (
                      <tr
                        key={booking._id}
                        className="border-b border-gray-600 hover:bg-gray-700 transition duration-300 ease-in-out"
                      >
                        <td className="px-4 py-2 text-gray-200">{booking.name}</td>
                        <td className="px-4 py-2 text-gray-200">
                          {booking.namekid}
                        </td>
                        <td className="px-4 py-2 text-gray-300">
                          {new Date(booking.date).toLocaleDateString("en-CA")}
                        </td>
                        <td className="px-4 py-2 text-gray-300">{booking.phone}</td>
                        <td className="px-4 py-2 text-gray-300">
                          {booking.hours} horas
                        </td>
                        <td className="px-4 py-2 text-gray-300">
                          {booking.timeSlot}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivatePage;
