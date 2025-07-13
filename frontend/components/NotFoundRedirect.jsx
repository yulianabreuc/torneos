import React from 'react'

export default function NotFoundRedirect() {
  const token = localStorage.getItem('token')
  const handleRedirect = () => {
    window.location.href = token ? '/home' : '/'
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl mb-4">La ruta no existe</h2>
      <button
       className='bg-grissThema text-salmonThema px-4 py-2 hover:bg-salmonThema/80 transition-colors hover:text-white rounded-xl font-semibold cursor-pointer'
        onClick={handleRedirect}
      >
        Ir al inicio
      </button>
    </div>
  )
}
