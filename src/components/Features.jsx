import { useState, useRef, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { TiLocationArrow } from "react-icons/ti";


  
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  




  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <img
        src={src}
        alt={title}
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-violet-700 px-5 py-2 text-xs uppercase text-white"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">contáctanos</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh(); // Esto asegura que las animaciones se recalculen cuando sea necesario
  }, []);

  return (
  <section className="bg-gray-950 pb-12">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32" data-aos="fade-right">
        <p className="font-circular-web text-lg text-blue-50" >
          Nos encargamos de tu fiesta!
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Immerse yourself in a rich and ever-expanding universe where a vibrant
          array of products converge into an interconnected overlay experience
          on your world.
        </p>
      </div>

      <BentoTilt
    
  className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]"
>
  <BentoCard
    
    src="img/6.jpg"
    title={
      <div className="backdrop-blur-md bg-black/50 p-2 rounded-md inline-block">
        títu<b>l</b>o
      </div>
    }
    description={
      <div className="backdrop-blur-md bg-black/50 p-2 rounded-md inline-block">
        A cross-world AI Agent - elevating your gameplay to be more fun and productive.
      </div>
    }
    isComingSoon
  />
</BentoTilt>

<div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
  <BentoTilt
    className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2"
  >
    <BentoCard
      src="img/7.jpg"
      title={
        <div className="backdrop-blur-md bg-black/50 p-2 rounded-md inline-block">
          títu<b>l</b>o
        </div>
      }
      description={
        <div className="backdrop-blur-md bg-black/50 p-2 rounded-md inline-block">
          A cross-world AI Agent - elevating your gameplay to be more fun and productive.
        </div>
      }
      isComingSoon
    />
  </BentoTilt>

  <BentoTilt
    className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0"
  >
    <BentoCard
      src="img/8.jpg"
      title={
        <div className="backdrop-blur-md bg-black/50 p-2 rounded-md inline-block">
          títu<b>l</b>o
        </div>
      }
      description={
        <div className="backdrop-blur-md bg-black/50 rounded-md inline-block">
          A cross-world AI Agent - elevating your gameplay to be more fun and productive.
        </div>
      }
      isComingSoon
    />
  </BentoTilt>

  <BentoTilt
    className="bento-tilt_1 me-14 md:col-span-1 md:me-0"
  >
    <BentoCard
      src="img/9.jpg"
      title={
        <div className="backdrop-blur-md bg-black/50 p-2 rounded-md inline-block">
          títu<b>l</b>o
        </div>
      }
      description={
        <div className="backdrop-blur-md bg-black/50 rounded-md inline-block">
          A cross-world AI Agent - elevating your gameplay to be more fun and productive.
        </div>
      }
      isComingSoon
    />
  </BentoTilt>
</div>

      
    </div>
  </section>
)};

export default Features;
