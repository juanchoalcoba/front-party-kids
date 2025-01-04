import { Link } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'  // Importa el ícono de candado
import Button from './Button'

const ButtonAdmin = () => {
  return (
    <div>
        <Link to="private">
          <Button 
            id="watch-trailer"
            title={
              <button className='text-[13px] text-white font-general text-center flex items-center justify-center'>
                <FaLock />  {/* Ícono de candado blanco */}
              </button>
            }
            containerClass="font-bold bg-transparent block"
          />
        </Link>
    </div>
  )
}

export default ButtonAdmin
