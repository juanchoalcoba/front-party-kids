import Features from "../components/Features";
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
      </main>

  );
}

export default Home;
