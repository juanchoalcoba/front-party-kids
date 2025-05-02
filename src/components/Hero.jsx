import { TiLocationArrow } from "react-icons/ti";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import Button from './Button';
import { Link } from 'react-router-dom';

const Hero = () => {
    useEffect(() => {
        AOS.init({ duration: 1500 });
        AOS.refresh();
    }, []);

    return (
        <div id="reservas" className='relative h-dvh w-screen overflow-x-hidden bg-violet-950'>
            <div
                id='image-frame'
                className='relative z-10 h-dvh w-screen aspect-video overflow-hidden rounded-lg bg-black'
            >
                {/* Imagen en lugar de video */}
                <img
                    src="/img/platos.jpeg" // Asegúrate de tener esta imagen en tu carpeta pública o src adecuada
                    alt="Hero background"
                    className='absolute left-0 top-0 size-full object-cover'
                    style={{ filter: 'blur(5px)' }}
                />

                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className="mt-8 min-h-screen px-5 sm:px-10 flex flex-col justify-center items-center">
                        <h1
                            data-aos="fade-right"
                            className='special-font hero-heading z-40'
                            style={{
                                backgroundImage: 'linear-gradient(to right, #FFCCE5, #FF8CFF, #A7D8FF, #FFEC6D)',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                WebkitTextStroke: '0.8px black',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.02)',
                            }}
                        >
                            KI<b>D</b>S
                        </h1>

                        <h1
                            data-aos="fade-left"
                            className='special-font hero-heading'
                            style={{
                                backgroundImage: 'linear-gradient(to right, #FAE78C, #FF66A6, #FF8F5A, #60E36D)',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                WebkitTextStroke: '0.8px black',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.02)',
                            }}
                        >
                            PAR<b>T</b>Y
                        </h1>

                        <p className='mb-5 text-center max-w-64 text-[20px] text-white font-robert-medium '>
                            Una fiesta inolvidable<br />para los más chiquitos!!
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
