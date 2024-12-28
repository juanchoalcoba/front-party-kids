import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg'; // Asegúrate de que la ruta sea correcta

function HomePage() {
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen">
      {/* Imagen de fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center  opacity-80 bg-cover z-[-1]"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      {/* Overlay con opacidad para dar un efecto más elegante al hero */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-2]"></div>

      {/* Contenedor con fondo blur */}
      <div className="relative z-10 bg-white/30 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-xl text-center">
        <h1 className="text-4xl flex text-center flex-col font-extrabold sm:text-4xl p-4 text-red-800">
          Bienvenidos a <span className="text-4xl text-blue-700 sm:text-4xl p-4">Party</span>{' '}
          <span className="text-3xl sm:text-4xl p-4 text-cyan-950">Kids</span>
        </h1>
        <p className="text-center text-green-600 font-normal text-[20px]">Reserva tu Party DAY!!!</p>

        {/* Botones */}
        <Link to="/booking">
          <button className="bg-yellow-500 text-black hover:bg-yellow-900 hover:text-gray-300 transition-all py-2 px-8 font-bold rounded-full mt-4">
            Reservar
          </button>
        </Link>
        <Link to="/private">
          <button className="border border-1 border-black py-2 text-gray-800 hover:bg-slate-400 transition-all hover:text-red-700  px-8 font-bold rounded-full mt-4">
            Panel Privado
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
