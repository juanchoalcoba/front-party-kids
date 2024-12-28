import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingPage from './pages/BookingPage';
import PrivatePage from './components/PrivatePage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página principal */}

        <Route path="/" element={<HomePage />} />

        {/* Ruta para la página de reservas */}
        <Route path="/booking" element={<BookingPage />} />

        {/* Ruta para la página privada que pide la contraseña */}
        <Route path="/private" element={<PrivatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
