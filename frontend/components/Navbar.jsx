import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'Competencias', path: '/competencias' },
    { label: 'Records', path: '/records' },
    { label: 'Mi Perfil', path: '/perfil' }
]

const Navbar = () => {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()
    let role = ''
    if (typeof window !== 'undefined') {
        role = localStorage.getItem('rol') || ''
    }

    let linksToShow = []
    if (role === 'userAdmin') {
        linksToShow = navLinks
    } else if (role === 'userComun') {
        linksToShow = navLinks.filter(link => link.label === 'Competencias')
    }

    return (
        <div className="relative h-full">
            <nav
                className={`
                    h-full bg-[#263238] text-white py-8 flex flex-col gap-4
                    transition-all duration-300
                    ${collapsed ? 'w-16' : 'w-[220px]'}
                    overflow-hidden
                    relative
                    z-40
                `}
                style={{
                    minWidth: collapsed ? '4rem' : '220px',
                    width: collapsed ? '4rem' : '220px'
                }}
            >
                <button
                    className="absolute top-4 right-4 z-50 bg-salmonThema text-white rounded-full p-2 shadow-md transition-transform duration-300"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label={collapsed ? 'Mostrar menú' : 'Ocultar menú'}
                >
                    {collapsed ? (
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 6l-6 6 6 6" />
                        </svg>
                    )}
                </button>
                <div className="flex flex-col items-start mt-12">
                    {!collapsed && linksToShow.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`block w-full px-6 py-3 rounded-md font-medium transition-colors ${
                                location.pathname === link.path ? 'bg-[#37474f]' : 'hover:bg-[#37474f]'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                {collapsed && (
                    <div className="flex flex-col items-center justify-center h-full">
                        {/* Puedes agregar un logo pequeño aquí si lo deseas */}
                    </div>
                )}
            </nav>
        </div>
    )
}
export default Navbar
