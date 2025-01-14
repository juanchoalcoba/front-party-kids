import gsap from "gsap";
import {useGSAP} from '@gsap/react';

import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true
            }
        })


        clipAnimation.to(".mask-clip-path", {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
        })
    })

    return (
        <div id="about" className="min-h-screen w-screen">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <p className="font-general text-sm uppercase md:text-[10px]">
                    Bienvenidos a Kids Party
                </p>

                <AnimatedTitle
                title="Descubre lo que tenemos para ofrecerte"
                containerClass="mt-5 !text-black text-center text-[40px]"
                />
                <div className="about-subtext">
                    <p className="pt-4 w-full">Festejos inolvidables: magia, diversión y momentos únicos.</p>
                    <p className="tetx-gray-500 p-2">
                    Fiestas infantiles perfectas: diversión, recuerdos imborrables.
                    </p>
                </div>
            </div>

            <div className="h-dvh w-screen" id="clip">
                <div className="mask-clip-path about-image">
                    <img 
                    className="absolute left-0 top-0 size-full object-cover"
                    src="img/6.jpg" alt="" 
                    />
                </div>
            </div>
        </div>
    )
}

export default About