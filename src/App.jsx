import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrivatePage from './pages/PrivatePage';
import BookingPage from './pages/BookingPage';


function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/private" element={<PrivatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
