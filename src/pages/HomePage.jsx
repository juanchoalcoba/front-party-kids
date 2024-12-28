import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <h1 className="text-2xl p-4 text-red-700">Bienvenidos a Party Kids</h1>
      <p>Ganale al tiempo reservando tu fecha para la fiesta ideal!!!</p>
      
      {/* Enlace con la etiqueta Link para ir a la página de reservas */}
      <Link to="/booking">
        <button className="bg-gray-400 py-2 px-8 font-bold rounded-full mt-4">Reservar</button>
      </Link>
      <Link to="/private">
        <button className="bg-gray-400 py-2 px-8 font-bold rounded-full mt-4">Panel Privado</button>
      </Link>


      
    </div>
  );
}

export default HomePage;
