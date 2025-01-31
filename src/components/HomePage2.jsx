import { Link } from "react-router-dom";
import { SiTiktok } from "react-icons/si";

function HomePage2() {
  return (
    <div
      id="contacto"
      className="relative  flex text-gray-800 flex-col justify-center items-center w-full"
    >
      {/* Overlay con opacidad para dar un efecto más elegante al hero */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-2]"></div>

      {/* Contenedor con fondo blur */}
      <div className="relative flex flex-col md:flex-row justify-center md:justify-evenly items-center z-10 bg-white/70 backdrop-blur-lg font-robert-medium p-8 shadow-lg w-full text-center">

        <div className="flex flex-col justify-center items-center">
          <h3 className="text-xl text-center p-4">CONTÁCTANOS</h3>
          <div className="flex border-2 border-violet-600 p-4 rounded-xl flex-col justify-center items-center">
          <p><b>Teléfono: </b> +598 98 015 337</p>
          <p><b>Email: </b> kidspartypdlt@gmail.com</p>
          <p><b>Dirección </b>18 de Julio 1340 | Paso de los Toros</p>
          </div>
        </div>

        <div>
        <img
          className="w-[120px] md:w-[200px] rounded-full pt-8 shadow-md shadow-black"
          src="logo.png"
          alt="Logo"
        />
        </div>

        {/* Sección de iconos centrados debajo del botón */}
        <div className="flex flex-col justify-center gap-8 mt-8">

          <h2 className="text-center">Redes Sociales</h2>

          <div className="flex flex-row justify-center mb-4 items-center gap-4">
          <Link target="_blank" to="https://tiktok.com">
      <SiTiktok className="text-blue-700 text-4xl hover:text-blue-900 transition-all duration-300" />
    </Link>

          <Link to="https://www.instagram.com" target="_blank">
            <i className="fab fa-instagram text-pink-700 text-4xl hover:text-pink-900 transition-all duration-300"></i>
          </Link>

          <Link target="_blank" to="https://wa.me/59898015337">
            <i className="fab fa-whatsapp text-green-700 text-4xl hover:text-green-900 transition-all duration-300"></i>
          </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-xs md:text-xl p-4 text-gray-400">
        © {new Date().getFullYear()} Kids Party. Todos los derechos reservados.
      </div>
    </div>
  );
}

export default HomePage2;
