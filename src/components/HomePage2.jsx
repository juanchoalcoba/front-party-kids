import { Link } from "react-router-dom";

function HomePage2() {
  return (
    <div
      id="contacto"
      className="relative mt-2 flex flex-col justify-center items-center w-full"
    >
      {/* Overlay con opacidad para dar un efecto más elegante al hero */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-2]"></div>

      {/* Contenedor con fondo blur */}
      <div className="relative flex flex-col md:flex-row justify-center md:justify-evenly items-center z-10 bg-white/50 backdrop-blur-lg font-robert-medium p-8 shadow-lg w-full text-center">
        <img
          className="w-[120px] md:w-[200px] rounded-full p-4 shadow-md shadow-black"
          src="logo.png"
          alt="Logo"
        />

        {/* Sección de iconos centrados debajo del botón */}
        <div className="flex justify-center gap-8 mt-8">
          <Link target="_blank" to="https://facebook.com">
            <i className="fab fa-facebook text-blue-700 text-4xl hover:text-blue-900 transition-all duration-300"></i>
          </Link>

          <Link to="https://www.instagram.com" target="_blank">
            <i className="fab fa-instagram text-pink-700 text-4xl hover:text-pink-900 transition-all duration-300"></i>
          </Link>

          <Link target="_blank" to="https://wa.me/59898015337">
            <i className="fab fa-whatsapp text-green-700 text-4xl hover:text-green-900 transition-all duration-300"></i>
          </Link>
        </div>
      </div>

      <div className="text-center text-xs md:text-xl p-4 text-gray-400">
        © {new Date().getFullYear()} Kids Party. Todos los derechos reservados.
      </div>
    </div>
  );
}

export default HomePage2;
