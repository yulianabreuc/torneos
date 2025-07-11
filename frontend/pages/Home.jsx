import '../styles/App.css'
import { useState } from 'react'
import imgIniciarsesion from '../assets/imgIniciarsesion.png'
import RegisterForm from '../components/RegisterForm.jsx'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  return (
    <>
      {!showLogin ? (
        <div className='flex justify-center items-center h-full w-full p-4 flex-col gap-4'>
          <h1 className='text-6xl font-bold text-salmonThema'>Admin Torneos</h1>
          <p className='text-white'>Bienvenido al panel de administración de torneos</p>
          <button
            className='bg-grissThema text-salmonThema px-4 py-2 hover:bg-salmonThema/80 transition-colors hover:text-white rounded-xl font-semibold cursor-pointer'
            onClick={() => setShowLogin(true)}
          >
            Comenzar
          </button>
        </div>
      ) : (
        <div className='flex justify-center items-center h-full w-full p-4 border rounded-xl'>
          <div className='w-1/2'>
            <img src={imgIniciarsesion} alt="Imagen" className='w-full h-full object-cover' />
          </div>
          <div className='w-1/2 p-6 flex flex-col justify-center items-center gap-4'>
            <h2 className='text-4xl font-bold text-salmonThema mb-4'>
                {showRegister ? 'Registrarse' : 'Iniciar Sesión'}
            </h2>
            { !showRegister ? ( 
                <form className='flex flex-col justify-center items-center gap-4 w-1/2'>
                    <input type="text" placeholder="Usuario" className='p-2 border rounded w-full' />
                    <input type="password" placeholder="Contraseña" className='p-2 border rounded w-full' />
                    <button type="submit" className='bg-grissThema text-salmonThema px-4 py-2 hover:bg-salmonThema/80 transition-colors hover:text-white rounded-xl font-semibold cursor-pointer w-32'>
                        Iniciar Sesión
                    </button>
                </form>
            ) : (
                <RegisterForm setShowRegister={setShowRegister} />
            )}
            <button className='mt-4 text-salmonThema underline cursor-pointer hover:text-white' onClick={() => setShowRegister(!showRegister)}>
              {showRegister ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App

