import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-violet-950 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo y nombre de la empresa */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold">Kids Party</h2>
          <p className="text-xs mt-1">Fiestas Infantiles</p>
        </div>

        {/* Links adicionales */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left text-sm mb-4 md:mb-0">
          <Link to="/about" className="hover:text-yellow-300 transition duration-300">Sobre Nosotros</Link>
          <Link to="/services" className="hover:text-yellow-300 transition duration-300">Términos</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition duration-300">Contacto</Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs mt-4 text-gray-400">
        © {new Date().getFullYear()} Kids Party. Todos los derechos reservados.
      </div>
    </footer>
  )
}

export default Footer
