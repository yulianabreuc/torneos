import React, { useState } from 'react';

const RegisterForm = ({ setShowRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar los datos al servidor
    console.log('Formulario enviado:', { username, email, password, confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 w-1/2">
        <input type="text" placeholder="Usuario" value={username} onChange={(event) => setUsername(event.target.value)} className="p-2 border rounded w-full" />
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(event) => setEmail(event.target.value)} className="p-2 border rounded w-full" />
        <input type="password" placeholder="Contraseña" value={password} onChange={(event) => setPassword(event.target.value)} className="p-2 border rounded w-full" />
        <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="p-2 border rounded w-full" />
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