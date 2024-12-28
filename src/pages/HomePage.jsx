import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg'; // Asegúrate de que la ruta sea correcta

function HomePage() {
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen">
      {/* Imagen de fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat opacity-90 bg-cover z-[-2]"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      {/* Overlay con opacidad para dar un efecto más elegante al hero */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-35 z-[-1]"></div>

      {/* Contenido */}
      <h1 className="text-4xl flex text-center flex-col font-extrabold sm:text-4xl p-4 text-red-800 z-10">
        Bienvenidos a <span className="text-3xl sm:text-4xl p-4">Party</span>{' '}
        <span className="text-3xl sm:text-4xl p-4 text-cyan-950">Kids</span>
      </h1>
      <p className="text-center font-extrabold text-[20px] z-10">Reserva tu Party DAY!!!</p>

      {/* Botones */}
      <Link to="/booking">
        <button className="bg-yellow-900 text-white z-10 hover:bg-orange-950 hover:text-yellow-300 transition-all py-2 px-8 font-bold rounded-full mt-4">
          Reservar
        </button>
      </Link>
      <Link to="/private">
        <button className="border border-1 border-black z-10 py-2 text-white px-8 font-bold  rounded-full mt-4">
          Panel Privado
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
