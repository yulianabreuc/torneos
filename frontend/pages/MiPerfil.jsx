import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const MiPerfil = () => {
  return (
    <>
      <div className="h-screen flex flex-row">
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className='flex justify-center items-center p-6'>
            <h1>Mi Perfil</h1>
            {/* Contenido de la página de perfil */}
          </main>
        </div>
      </div>
    </>
  )
}

export default MiPerfil
