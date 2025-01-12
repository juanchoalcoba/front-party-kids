import { useState, useRef } from "react";
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


  return (
    <>
  <section className="bg-gray-950 pb-12">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32" data-aos="fade-right">
        <p className="font-circular-web text-3xl text-blue-50" >
        ¡Nos encargamos de tu fiesta!
        </p>
        <p className="max-w-md font-circular-web text-xl text-justify text-blue-50 opacity-50 mt-4">
        Sumérgete en un universo lleno de posibilidades donde una amplia gama de servicios se fusiona para crear una experiencia única y divertida en tu celebración.
        </p>
      </div>

      <BentoTilt
    
  className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]"
>
  <BentoCard
    
    src="img/6.jpg"
    title={
      <div className="backdrop-blur-md tracking-widest bg-black/50 p-2 rounded-md inline-block">
        divers<b>i</b>ón
      </div>
    }
    description={
      <div className="backdrop-blur-md bg-black/50 p-2 rounded-md inline-block">
        Un asistente virtual para fiestas infantiles, optimizando la organización y diversión de cada evento para hacerlo más memorable y fácil de gestionar
      </div>
    }
    isComingSoon
  />
</BentoTilt>

<div className="grid h-[135vh] w-full md:grid-cols-2 md:grid-rows-3 gap-7">
  <BentoTilt
    className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2"
  >
    <BentoCard
      src="img/7.jpg"
      title={
        <div className="backdrop-blur-md tracking-widest bg-black/50 p-2 rounded-md inline-block">
          fies<b>t</b>a
        </div>
      }
      description={
        <div className="backdrop-blur-md bg-black/50 p-2 rounded-md inline-block">
          Haz de tu evento algo especial, con un salón equipado para todo tipo de celebraciones y una atención dedicada a cada detalle.
        </div>
      }
      isComingSoon
    />
  </BentoTilt>

  <BentoTilt
    className="bento-tilt_1 row-span-1 md:col-span-1 md:ms-0"
  >
    <BentoCard
      src="img/8.jpg"
      title={
        <div className="backdrop-blur-md tracking-widest bg-black/50 p-2 rounded-md inline-block">
          celebraci<b>ó</b>n
        </div>
      }
      description={
        <div className="backdrop-blur-md bg-black/50 rounded-md inline-A cross-world AI Agent - elevating your gameplay to be more fun and productive.block">
          Cada celebración es única, por eso creamos ambientes personalizados que harán de tu fiesta un evento memorable.
        </div>
      }
      isComingSoon
    />
  </BentoTilt>

  <BentoTilt
    className="bento-tilt_1  md:col-span-1 md:me-0"
  >
    <BentoCard
      src="img/9.jpg"
      title={
        <div className="backdrop-blur-md tracking-widest bg-black/50 p-2 rounded-md inline-block">
          sonris<b>a</b>s
        </div>
      }
      description={
        <div className="backdrop-blur-md bg-black/50 rounded-md inline-block">
          La diversión nunca termina, y nos encargamos de que todos los invitados, sin importar la edad, disfruten juntos.
        </div>
      }
      isComingSoon
    />
  </BentoTilt>
</div>

      
    </div>

    
  </section>
  </>
)};

export default Features;
