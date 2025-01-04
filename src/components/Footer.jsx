import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-violet-700 text-gray-300 h-12 flex justify-around items-center">
      <div className="flex justify-center items-center">
      <h3 className="text-gray-300 text-md mr-8">Party-Kids 2024</h3>
      <p> Todos los Derechos Reservvados</p>
      </div>
      <Link
      className="text-gray-300"
      to="private"
      >
        Panel
      </Link>
    </footer>
  )
}

export default Footer