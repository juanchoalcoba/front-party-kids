import './App.css';
import About from './components/About';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import BookingPage from './pages/BookingPage';


function App() {
  return (
      <main className='relative min-h-screen w-screen overflow-x-hidden'>
        <Navbar />
        <Hero />
        <About />
        <BookingPage />        
      </main>

  );
}

export default App;
