import Features from "../components/Features";
import HomePage from "../components/HomePage";
import HomePage2 from "../components/HomePage2";
import Navbar from "../components/Navbar";
import AboutUs from '../components/Objetivo'
import ImageSlider from "../components/Slide";

function Home() {
  return (
      <main className='relative min-h-screen w-screen overflow-x-hidden'>
        <Navbar />
        <HomePage />
        <AboutUs />
        <ImageSlider />
        <Features />
        <HomePage2 />
      </main>

  );
}

export default Home;
