import React from 'react'
import { Link } from 'react-router-dom'

export default function NoPermiso() {
  return (
    <div className="flex justify-center items-center h-full w-full p-4 flex-col gap-4">
      <h1 className="text-6xl font-bold text-salmonThema">Admin Torneos</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center gap-4 border">
        <h2 className="text-4xl font-bold text-salmonThema mb-4">Acceso Denegado</h2>
        <p className="text-grissThema mb-6 text-center">
          No tienes permisos para acceder a esta ruta.<br />Por favor inicia sesión para continuar.
        </p>
        <Link
          to="/"
          className="bg-grissThema text-salmonThema px-4 py-2 hover:bg-salmonThema/80 transition-colors hover:text-white rounded-xl font-semibold cursor-pointer w-32 text-center"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  )
}
