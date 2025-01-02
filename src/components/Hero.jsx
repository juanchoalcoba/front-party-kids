import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { TiLocationArrow } from "react-icons/ti";

import { useEffect, useState, useRef } from 'react';

import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
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
        <div className='relative h-dvh w-screen overflow-x-hidden bg-violet-950'>
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
                    src="videos/hero-1.mp4"
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    style={{ filter: 'blur(5px)' }}
                    className='absolute left-0 aspect-w-16 aspect-h-9 top-0 size-full  object-cover'
                    onLoadedData={handleVideoLoad}
                />

                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className="mt-8 min-h-screen px-5 sm:px-10 flex flex-col justify-center items-center">
                <h1 className='special-font hero-heading z-40 text-blue-75'>
                    KI<b>D</b>S
                </h1>
                        <h1 className='special-font hero-heading text-blue-100'>
                            PAR<b>T</b>Y
                        </h1>
                        <p className='mb-5 text-center max-w-64 text-[20px] font-robert-regular text-blue-100'>
                            Una fiesta inolvidable<br />para los mas chiquitos!!
                        </p>
                        <Button 
                            id="watch-trailer"
                            title="RESERVAR"
                            leftIcon={<TiLocationArrow />}
                            containerClass="font-bold bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>

       </div>
    );
};

export default Hero;
