import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const username = typeof window !== 'undefined' ? localStorage.getItem('nombre') : ''
    const [showModal, setShowModal] = useState(false)

    const handleLogout = () => {
        setShowModal(true)
    }

    const confirmLogout = () => {
        localStorage.clear()
        setShowModal(false)
        navigate('/')
    }

    const cancelLogout = () => {
        setShowModal(false)
    }

    return (
        <>
            <header className="flex items-center justify-between px-4 py-2 bg-salmonThema border-b border-azulThema-200 text-azulThema">
                <div className="font-bold text-lg">
                    Admin Torneos
                </div>
                <div className="flex items-center gap-4">
                    <span>{username}</span>
                    <button onClick={handleLogout} className="px-4 py-2 bg-azulThema text-white rounded-md hover:bg-grissThema cursor-pointer">
                        Cerrar sesión
                    </button>
                </div>
            </header>
            {showModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{ background: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center text-azulThema">
                        <h3 className="text-xl font-bold mb-4">¿Estás seguro de cerrar sesión?</h3>
                        <div className="flex gap-4">
                            <button
                                className="bg-salmonThema text-white px-6 py-2 rounded hover:bg-salmonThema/80 transition-colors"
                                onClick={confirmLogout}
                            >
                                Sí
                            </button>
                            <button
                                className="bg-grissThema text-white px-6 py-2 rounded hover:bg-salmonThema/80 transition-colors"
                                onClick={cancelLogout}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header

