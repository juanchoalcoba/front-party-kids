import { Link } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'  // Importa el ícono de candado
import Button from './Button'

const ButtonAdmin = () => {
  return (
    <div>
        <Link to="private">
        
        <FaLock
        className="text-[12px] text-white bg-transparent"
        />  
          
        </Link>
    </div>
  )
}

export default ButtonAdmin
