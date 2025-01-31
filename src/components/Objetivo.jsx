import { FaWhatsapp } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <section id="nosotros" className="bg-gradient-to-b from-gray-700 to-cyan-900 text-white flex flex-col lg:flex-row justify-between items-center font-circular-web py-12 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl w-[48rem]  font-bold text-center ">
          El cumpleaños de tus sueños desde  {" "}
          <span className="text-blue-50 bg-gradient-to-t from-cyan-800 to-pink-500 rounded-full leading-[18rem] md:leading-[15rem] px-8 py-10 mt-8 lg:mt-0 text-5xl  border-4 border-white">$11.111</span>
        </h2>
        <p className="text-2xl w-96 mt-4 text-center text-blue-100">
          Nos ajustamos a tu presupuesto y a lo que imaginas para tu
          celebración.
        </p>

        <h3 className="text-3xl font-bold mt-12 lg:mt-4 text-center text-yellow-300">
          ¿Quiénes somos?
        </h3>
        <p className="text-lg mt-2 w-96 text-center">
          Somos dos hermanos emprendedores con la misión de ofrecer un servicio
          único, donde la diversión y los recuerdos se conviertan en momentos
          inolvidables.
        </p>
        <a href='https://wa.me/59898015337' className=' bg-green-600 hover:bg-green-700 transition text-white font-semibold px-6 py-3 mt-4 rounded-full flex items-center justify-center gap-2 mx-auto mb-12'>
          <FaWhatsapp className='text-xl' /> ¡Consulta más detalles por WhatsApp!
        </a>
      </div>


      <div className="space-y-2">
        <h2 className="text-3xl font-semibold mb-2 text-pink-200 text-center p-4">¿Que Ofrecemos?</h2>
        <h4 className="text-xl font-semibold mb-2 text-pink-200">- Limpieza</h4>
        <p className="text-gray-300">
          Mantenemos el lugar impecable para que solo te preocupes por
          disfrutar.
        </p>

        <h4 className="text-xl font-semibold mb-2 text-pink-200">- Mozos</h4>
        <p className="text-gray-300">
          Personal calificado para atender a tus invitados con excelencia.
        </p>

        <h4 className="text-xl font-semibold mb-2 text-pink-200">
         - Supervisor de salón
        </h4>
        <p className="text-gray-300">
          Nos encargamos de coordinar cada detalle para que todo salga perfecto.
        </p>

        <h4 className="text-xl font-semibold mb-2 text-pink-200">
          - Organización de catering
        </h4>
        <p className="text-gray-300">
          Deliciosos menús adaptados a los gustos y preferencias de tus
          invitados.
        </p>

        <h4 className="text-xl font-semibold mb-2 text-pink-200">
          - Tarjetas de invitación digitales
        </h4>
        <p className="text-gray-300">
          Invitaciones personalizadas para que tus invitados no olviden el gran
          día.
        </p>

        <h4 className="text-xl font-semibold mb-2 text-pink-200">
          - Mesa de dulces
        </h4>
        <p className="text-gray-300">
          Un rincón delicioso que encantará a grandes y pequeños.
        </p>

        <h4 className="text-xl font-semibold mb-2 text-pink-200">
          - Decoración personalizada
        </h4>
        <p className="text-gray-300">
          Transformamos tu evento en un espacio mágico y único.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
