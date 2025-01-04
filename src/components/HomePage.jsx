import { useEffect } from 'react';
import heroImage from '../assets/hero.jpg'; // Asegúrate de que la ruta sea correcta
import Button from '../components/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';


function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh(); // Esto asegura que las animaciones se recalculen cuando sea necesario
  }, []);

  return (
    <div className="relative mt-2 flex flex-col justify-center items-center w-full min-h-screen">
      {/* Imagen de fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center opacity-80 bg-cover z-[-1]"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      {/* Overlay con opacidad para dar un efecto más elegante al hero */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-2]"></div>

      {/* Contenedor con fondo blur */}
      <div 
        data-aos="fade-up"
        className="relative flex flex-col justify-center items-center z-10 bg-white/40 backdrop-blur-sm font-robert-medium p-8 rounded-3xl shadow-lg max-w-xl text-center"
      >
        <h1 className="text-4xl flex text-center flex-col font-extrabold sm:text-4xl p-4 text-red-950">
          Bienvenidos 
          <img 
            className='w-[250px] rounded-full p-4 shadow-md shadow-black'
            src="logo.png" alt="Logo" 
          />
        </h1>
        <p className="text-center text-blue-950 font-bold font-circular-web mb-6 text-[24px]">
          CONSULTA TU DIA
        </p>

        {/* Botón RESERVAS */}
        <Link to="booking">
          <Button 
            id="watch-trailer"
            title={
              <button className='text-[20px] text-violet-950 font-general text-center flex items-center justify-center'>
                RESERVAS
              </button>
            }
            containerClass="font-bold bg-yellow-300 block py-2 px-14 shadow-md shadow-black"
          />
        </Link>

        {/* Sección de iconos centrados debajo del botón */}
        <div className="flex justify-center gap-8 mt-8">
      <i className="fab fa-facebook text-blue-600 text-3xl hover:text-blue-800 transition-all duration-300"></i>
      <i className="fab fa-instagram text-pink-600 text-3xl hover:text-pink-800 transition-all duration-300"></i>
      <i className="fab fa-whatsapp text-green-600 text-3xl hover:text-green-800 transition-all duration-300"></i>
    </div>
      </div>
    </div>
  );
}

export default HomePage;
