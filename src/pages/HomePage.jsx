import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-7xl p-4">Welcome to the Home Page</h1>
      <p>This is the main page of the application.</p>
      
      {/* Enlace con la etiqueta Link para ir a la página de reservas */}
      <Link to="/booking">
        <button className="bg-gray-400 py-3 px-12 rounded-full mt-4">Go to Booking Page</button>
      </Link>
      <Link to="/private">
        <button className="bg-gray-400 py-3 px-12 rounded-full mt-4">Go to private Page</button>
      </Link>


      
    </div>
  );
}

export default HomePage;
