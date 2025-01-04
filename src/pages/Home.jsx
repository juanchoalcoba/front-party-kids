import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HomePage from "../components/HomePage";
import Navbar from "../components/Navbar";


function Home() {
  return (
      <main className='relative min-h-screen w-screen overflow-x-hidden'>
        <Navbar />
        <Hero />
        <HomePage />
        <Features />
        <Footer /> 
      </main>

  );
}

export default Home;
