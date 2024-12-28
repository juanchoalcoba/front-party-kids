import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg'; // Asegúrate de que la ruta sea correcta

function HomePage() {
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen">
      {/* Imagen de fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover z-[-1]"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      <h1 className="text-4xl flex text-center flex-col font-extrabold sm:text-4xl p-4 text-red-800">
        Bienvenidos a <span className="text-3xl sm:text-4xl p-4">Party</span>{' '}
        <span className="text-3xl sm:text-4xl p-4 text-cyan-950">Kids</span>
      </h1>
      <p className="text-center">Reserva tu party DAY!!!</p>

      {/* Enlace con la etiqueta Link para ir a la página de reservas */}
      <Link to="/booking">
        <button className="bg-gray-400 py-2 px-8 font-bold rounded-full mt-4">
          Reservar
        </button>
      </Link>
      <Link to="/private">
        <button className="bg-gray-400 py-2 px-8 font-bold rounded-full mt-4">
          Panel Privado
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
