import './App.css';
import Features from './components/Features';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';


function App() {
  return (
      <main className='relative min-h-screen w-screen overflow-x-hidden'>
        <Navbar />
        <Hero />
        <HomePage />
        <Features />
      </main>

  );
}

export default App;
