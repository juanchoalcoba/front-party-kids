// ImageSlider.jsx
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const images = [
  "/img/foto1.jpg", "/img/foto2.jpg", "/img/foto3.jpg",
  "/img/foto4.jpg", "/img/foto5.jpg", "/img/foto6.jpg",
];

export default function ImageSlider() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const s = swiperRef.current;
    if (s && s.autoplay && !s.autoplay.running) {
      s.autoplay.start();
    }
  }, []);

  return (
    
    <div className="w-full max-w-3xl mx-auto text-center mt-12 ">
      {/* Título y párrafo */}
      
      <p className="text-gray-200 text-md md:text-2xl mb-6">
        Una fiesta pensada para compartir momentos únicos.
      </p>

      {/* Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        onSwiper={(sw) => (swiperRef.current = sw)}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`slide-${index}`}
              className="w-full h-[600px] object-cover p-4 rounded-lg shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Estilos flechas */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          transform: scale(1);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
