import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { TiLocationArrow } from "react-icons/ti";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState, useRef } from 'react';


import Button from './Button';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {


      useEffect(() => {
          AOS.init({ duration: 1500 });
          AOS.refresh(); // Esto asegura que las animaciones se recalculen cuando sea necesario
        }, []);


    const [loading, setLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);  // Corrección en setLoadedVideos

    const videoRef = useRef(null);
    const totalVideos = 1;

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);  // Corrección en setLoadedVideos
    };

    useEffect(() => {
        if (loadedVideos === totalVideos) {
            setLoading(false);
        }
    }, [loadedVideos]);

    

    return (
        <div id="inicio" className='relative h-dvh w-screen overflow-x-hidden bg-violet-950'>
            {loading && (
                <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}
            <div
                id='video-frame'
                className='relative z-10 h-dvh w-screen aspect-video overflow-hidden rounded-lg bg-black'
            >
                <video
                    src="videos/herovideo.mp4"
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    style={{ filter: 'blur(2px)' }}
                    className='absolute left-0 aspect-w-16 aspect-h-9 top-0 size-full  object-cover'
                    onLoadedData={handleVideoLoad}
                />

                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div 
                    
                    className="mt-8 min-h-screen px-5 sm:px-10 flex flex-col justify-center items-center">
<h1 
    data-aos="fade-right"
    className='special-font hero-heading z-40'
    style={{
        backgroundImage: 'linear-gradient(to right, #FFCCE5, #FF8CFF, #A7D8FF, #FFEC6D)', // Colores más claros
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextStroke: '1.4px black',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.02)', // Sombra aún más ligera
    }}
>
    KI<b>D</b>S
</h1>

<h1 
    data-aos="fade-left"
    className='special-font hero-heading'
    style={{
        backgroundImage: 'linear-gradient(to right, #FAE78C, #FF66A6, #FF8F5A, #60E36D)', // Colores más claros
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextStroke: '1.4px black', // Borde negro
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.02)', // Sombra aún más ligera
    }}
>
    PAR<b>T</b>Y
</h1>




                        <p className='mb-5 text-center max-w-64 text-[20px] font-robert-regular text-blue-100'>
                            Una fiesta inolvidable<br />para los mas chiquitos!!
                        </p>
                        <Link to="booking">
                        <Button 
                            id="watch-trailer"
                            title="RESERVAR"
                            leftIcon={<TiLocationArrow />}
                            containerClass="font-bold bg-yellow-300 flex-center gap-1"
                        />
                        </Link>
                    </div>
                </div>
            </div>

       </div>
    );
};

export default Hero;
