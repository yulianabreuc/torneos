import '../styles/App.css'
import { useState, useEffect } from 'react'
import imgIniciarsesion from '../assets/imgIniciarsesion.png'
import RegisterForm from '../components/RegisterForm.jsx'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate()


  const sesionLoginSuccess = (data) => {
    console.log('Inicio de sesión exitoso:', data);
    if (data.exito === true) {
      setMessage('Inicio de sesión exitoso');
      setIsError(false);
      //guardar token en localStorage
      localStorage.setItem('token', data.Token);
      //guardar el rol en localStorage
      localStorage.setItem('rol', data.rol);
      //guardar el nombre en localStorage
      localStorage.setItem('nombre', data.nombre);

      navigate('/home')
    } else {
      setMessage(data.error);
      setIsError(true);
    }
  };
  
  const closeModal = () => {
    setMessage('');
    setIsError(false);
  };

  const hasError = (message) => {
    console.error('Error:', message);
    setMessage(''); // Limpiar primero para forzar re-render
    setTimeout(() => {
      setMessage(message);
      setIsError(true);
    }, 10);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const Usuario = event.target[0].value;
    const Contrasena = event.target[1].value;
    //validar que los campos no esten vacios
    if (!Usuario || !Contrasena) {
      hasError('Todos los campos son obligatorios');
      return;
    } else {
      axios.post('http://127.0.0.1:3000/sesion/login', { Usuario, Contrasena })
        .then(response => {
          setShowLogin(false);
          sesionLoginSuccess(response.data);
        })
        .catch(error => {
          console.log(error)
          hasError(error.response.data.error || 'Error al iniciar sesión');
        });
      console.log('Formulario enviado:', { Usuario, Contrasena });

    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
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
        <div className='flex justify-center items-center h-full w-10/12 p-4 border rounded-xl mt-8'>
          <div className='w-1/2'>
            <img src={imgIniciarsesion} alt="Imagen" className='w-full h-full object-cover p-4' />
          </div>
          <div className='w-1/2 p-6 flex flex-col justify-center items-center gap-4'>
            <h2 className='text-4xl font-bold text-salmonThema mb-4'>
                {showRegister ? 'Registrarse' : 'Iniciar Sesión'}
            </h2>
            { !showRegister ? ( 
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4 w-1/2'>
                    <input type="text" placeholder="Usuario" className='p-2 border rounded w-full' />
                    <input type="password" placeholder="Contraseña" className='p-2 border rounded w-full' />
                    <button type="submit" className='bg-grissThema text-salmonThema px-4 py-2 hover:bg-salmonThema/80 transition-colors hover:text-white rounded-xl font-semibold cursor-pointer w-32'>
                        Iniciar Sesión
                    </button>
                </form>
            ) : (
                <RegisterForm setShowRegister={setShowRegister} sesionLoginSuccess={sesionLoginSuccess} hasError={hasError} />
            )}
            <button className='mt-4 text-salmonThema underline cursor-pointer hover:text-white' onClick={() => setShowRegister(!showRegister)}>
              {showRegister ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </div>
        </div>
      )}
      {message && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div className={`bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center ${isError ? 'text-red-900' : 'text-green-900'}`}>
            <h3 className="text-xl font-bold mb-4">{message}</h3>
            <button
              className="mt-2 bg-salmonThema text-white px-6 py-2 rounded hover:bg-salmonThema/80 transition-colors"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
