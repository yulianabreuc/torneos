import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import '../styles/index.css'
import Home from '../pages/Home.jsx'
import Inicio from '../pages/Inicio.jsx'
import Competencias from '../pages/Competencias.jsx'
import Records from '../pages/Records.jsx'
import MiPerfil from '../pages/MiPerfil.jsx'
import NotFoundRedirect from '../components/NotFoundRedirect'
import NoPermiso from '../components/NoPermiso'

// Componente de ruta privada
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <NoPermiso />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Inicio />
            </PrivateRoute>
          }
        />
        <Route
          path="/competencias"
          element={
            <PrivateRoute>
              <Competencias />
            </PrivateRoute>
          }
        />
        <Route
          path="/records"
          element={
            <PrivateRoute>
              <Records />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <MiPerfil />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <NotFoundRedirect />
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)