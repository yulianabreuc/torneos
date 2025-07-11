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
    <form onSubmit={handleSubmit} className="flex flex-col justify-items-center gap-1 w-1/2">
        <label className="text-salmonThema">
            Nombre de usuario:
            <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="p-2 border rounded"
            />
        </label>
        <br />
        <label className="text-salmonThema">
            Correo electrónico:
            <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="p-2 border rounded"
            />
        </label>
        <br />
        <label className="text-salmonThema">
            Contraseña:
            <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="p-2 border rounded"
            />
        </label>
        <br />
        <label className="text-salmonThema">
            Confirmar contraseña:
            <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="p-2 border rounded"
            />
        </label>
        <br />
        <button
            type="submit"
            className="bg-grissThema text-salmonThema px-4 py-2 hover:bg-salmonThema/80 transition-colors hover:text-white rounded-xl font-semibold cursor-pointer"
        >
            Registrar
        </button>
    </form>
  );
};

export default RegisterForm;