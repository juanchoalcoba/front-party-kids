import {useState, useEffect } from 'react';
import heroImage from '../assets/futbolito.jpg'; // Asegúrate de que la ruta sea correcta
import Button from '../components/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { SiTiktok } from "react-icons/si";
import { FiChevronDown } from "react-icons/fi";


function HomePage() {


  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh(); // Esto asegura que las animaciones se recalculen cuando sea necesario
  }, []);

  return (
    <div id="inicio" className="relative flex flex-col justify-center items-center w-full min-h-screen">
      {/* Imagen de fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center opacity-80 bg-cover z-[-1]"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

    
      {/* Título con degradado llamativo */}




      {/* Overlay con opacidad para dar un efecto más elegante al hero */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-2]"></div>

      {/* Contenedor con fondo blur */}
      <div 
        data-aos="fade-up"
        className="relative flex flex-col justify-center items-center z-10 bg-white/40 backdrop-blur-md font-robert-medium p-8 rounded-2xl shadow-lg max-w-xl text-center"
      >
        <h1 className="text-2xl text-cyan-950 flex flex-col items-center justify-center text-center font-robert-regular font-bold md:text-3xl p-4">
  Bienvenidos/as 
  <img 
    className="w-[170px] rounded-full p-4 shadow-md shadow-black"
    src="logo.png" alt="Logo" 
  />
</h1>
      <p className='text-gray-950 text-md '>Cumpleaños - Bautismos</p>
      <p className='text-gray-950 text-md'>Fiestas privadas - Eventos </p>

       

        <p className="text-center text-cyan-950 font-bold font-circular-web mb-4 pt-4 text-[20px]">
          CONSULTAR FECHA
        </p>

      

        {/* Botón RESERVAS */}
        <Link to="booking">
          <Button 
            id="watch-trailer"
            title={
              <button className='text-[15px] text-black font-general text-center flex items-center justify-center'>
                RESERVAS
              </button>
            }
            containerClass="font-bold block  shadow-md shadow-gray-800"
          />
        </Link>

        {/* Sección de iconos centrados debajo del botón */}
        <div className="flex justify-center gap-8 mt-8">
        <Link target="_blank" to="https://www.tiktok.com/@kids.party.pdlt?_t=ZM-8tXN5ZUyAMf&_r=1">
      <SiTiktok className="text-gray-800 text-4xl hover:text-gray-900 transition-all duration-300" />
    </Link>
  
  <Link to="https://www.instagram.com/kidsparty.pdlt?igsh=MWt0eTdpMTdvdDBiMQ=="
  target='_blank'
  >
    <i className="fab fa-instagram text-pink-700 text-4xl hover:text-pink-900 transition-all duration-300"></i>
  </Link>
  
  <Link  
  target='_blank'
  to="https://wa.me/59898015337">
    <i className="fab fa-whatsapp text-green-700 text-4xl hover:text-green-900 transition-all duration-300"></i>
</Link>
    </div>




      </div>
    </div>
  );      
}

export default HomePage;
