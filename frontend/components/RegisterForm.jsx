import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ setShowRegister, sesionLoginSuccess, hasError }) => {
  const [Usuario, setUsername] = useState('');
  const [Nombre, setName] = useState('');
  const [Apellido, setLastname] = useState('');
  const [Correo, setEmail] = useState('');
  const [Contrasena, setPassword] = useState('');
  const [ConfirmarContrasena, setConfirmPassword] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();

    //validar que los campos no esten vacios
    if (!Usuario || !Nombre || !Apellido || !Correo || !Contrasena || !ConfirmarContrasena) {
      hasError('Todos los campos son obligatorios');
      return;
    }else {
      if (Contrasena !== ConfirmarContrasena) {
        hasError('Las contraseñas no coinciden');
        return;
      } else {
        axios.post('http://127.0.0.1:3000/sesion/register', { Usuario, Nombre, Apellido, Correo, Contrasena, ConfirmarContrasena })
          .then(response => {
            console.log(response.data);
            setShowRegister(false);
            sesionLoginSuccess(response.data);
          })
          .catch(error => {
            console.log(error)
            hasError(error.response.data.message || 'Error al registrar usuario');
          });
        console.log('Formulario enviado:', { Usuario, Nombre, Apellido, Correo, Contrasena, ConfirmarContrasena });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 w-1/2">
        <input type="text" placeholder="Usuario" value={Usuario} onChange={(event) => setUsername(event.target.value)} className="p-2 border rounded w-full" />
        <input type="text" placeholder="Nombre" value={Nombre} onChange={(event) => setName(event.target.value)} className="p-2 border rounded w-full" />
        <input type="text" placeholder="Apellido" value={Apellido} onChange={(event) => setLastname(event.target.value)} className="p-2 border rounded w-full" />
        <input type="email" placeholder="Correo electrónico" value={Correo} onChange={(event) => setEmail(event.target.value)} className="p-2 border rounded w-full" />
        <input type="password" placeholder="Contraseña" value={Contrasena} onChange={(event) => setPassword(event.target.value)} className="p-2 border rounded w-full" />
        <input type="password" placeholder="Confirmar contraseña" value={ConfirmarContrasena} onChange={(event) => setConfirmPassword(event.target.value)} className="p-2 border rounded w-full" />
        <button
            type="submit"
            className="bg-grissThema text-salmonThema px-4 py-2 hover:bg-salmonThema/80 transition-colors hover:text-white rounded-xl font-semibold cursor-pointer w-32"
        >
            Registrar
        </button>
    </form>
  );
};

export default RegisterForm;