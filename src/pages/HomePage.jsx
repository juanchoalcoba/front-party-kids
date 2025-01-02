import { TiLocationArrow } from 'react-icons/ti';
import heroImage from '../assets/hero.jpg'; // Asegúrate de que la ruta sea correcta
import Button from '../components/Button';

function HomePage() {
  return (
    <div className="relative mt-2 flex flex-col justify-center items-center w-full min-h-screen">
      {/* Imagen de fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center  opacity-80 bg-cover z-[-1]"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      {/* Overlay con opacidad para dar un efecto más elegante al hero */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-2]"></div>

      {/* Contenedor con fondo blur */}
      <div className="relative flex flex-col justify-center items-center z-10 bg-white/40 backdrop-blur-sm font-robert-medium p-8 rounded-3xl shadow-lg max-w-xl text-center">
        <h1 className="text-4xl flex text-center flex-col font-extrabold sm:text-4xl p-4 text-red-800">
          Bienvenidos a 
          <img 
          className='w-[250px] rounded-full p-4'
          src="logo.png" alt="" />
        </h1>
        <p className="text-center text-blue-950 font-bold mb-6 text-[20px]">CONSULTA TU DIA</p>

        {/* Botones */}
        <a to="/booking">
        <Button 
                            id="watch-trailer"
                            title="RESERVAR"
                            containerClass="font-bold bg-yellow-300 block py-3 px-12"
                        />
        </a>
        
      </div>
    </div>
  );
}

export default HomePage;
