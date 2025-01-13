import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FiMenu, FiX } from "react-icons/fi"; // Importamos el icono de hamburguesa y de cierre
import { FaMusic } from "react-icons/fa"; // Ícono musical

import Button from "./Button";
import ButtonAdmin from "./ButtonAdmin";
import { Link } from "react-router-dom";

const navItems = ["Inicio", "Fiestas", "Servicios", "Sobre Nosotros", "Contacto"];

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false); // Estado para controlar el menú en pantallas pequeñas

    const audioElementRef = useRef(null);
    const navContainerRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    const toggleNavMenu = () => {
        setIsNavOpen((prev) => !prev);
    };

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isNavVisible]);

    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
        >
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        <img src="/logo.png" alt="" className="w-[70px] rounded-full" />
                        <Link to="booking">
                        <Button
                            id="product-button"
                            title="RESERVAR"
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 font-bold md:flex hidden items-center justify-center gap-1"
                        />
                        </Link>
                        <ButtonAdmin />
                    </div>

                    <div className="flex h-full items-center">
                        {/* Menú en pantallas grandes */}
                        <div className="hidden lg:block">
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.toLowerCase()}`}
                                    className="nav-hover-btn"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* Ícono de hamburguesa para pantallas pequeñas */}
                       <button
    className="block lg:hidden text-blue-50 z-50 relative"
    onClick={toggleNavMenu}
>
    {isNavOpen ? (
        <FiX className="text-2xl text-black" />
    ) : (
        <FiMenu className="text-2xlt text-blue-50" />
    )}
</button>

                        {/* Menú desplegable en pantallas pequeñas */}
                        <div
                            className={clsx(
                                "fixed inset-0 z-40 flex flex-col items-center justify-center h-screen bg-white bg-opacity-90 backdrop-blur-lg transition-transform transform",
                                {
                                    "translate-y-full opacity-0": !isNavOpen, // Oculta el menú cuando no está abierto
                                    "translate-y-0 opacity-100": isNavOpen, // Muestra el menú cuando está abierto
                                }
                            )}
                            style={{ transition: "all 0.5s ease-in-out" }}
                        >
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-2xl mb-4 font-bold text-center"
                                    onClick={toggleNavMenu}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* Indicador de audio */}
                        <button
                            onClick={toggleAudioIndicator}
                            className="ml-10 flex items-center space-x-0.5"
                        >
                            <audio
                                src="audio/loop.mp3"
                                ref={audioElementRef}
                                className="hidden"
                                loop
                            />
                            {!isAudioPlaying ? (
    <FaMusic className="text-[14px] text-blue-50 " /> // Ícono cuando no está reproduciendo
) : (
    [1, 2, 3, 4].map((bar) => (
        <div
            key={bar}
            className={clsx("indicator-line", {
                active: isIndicatorActive,
            })}
            style={{
                animationDelay: `${bar * 0.1}s`,
            }}
        />
    ))
)}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;
