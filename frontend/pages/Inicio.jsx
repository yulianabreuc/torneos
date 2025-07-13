import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Inicio = () => {
    return (
        <>
            <div className="h-screen flex flex-row">
                <Navbar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className='flex justify-center items-center p-6'>
                        <h1>Bienvenido al sistema</h1>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Inicio
