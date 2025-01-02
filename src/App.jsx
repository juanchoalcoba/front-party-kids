import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import BookingPage from './pages/BookingPage';


function App() {
  return (
      <main className='relative min-h-screen w-screen overflow-x-hidden'>
        <Navbar />
        <Hero />
        <BookingPage />        
      </main>

  );
}

export default App;
