import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'	
import NotFound from './pages/NotFound'
import Rutas from './pages/Rutas'
import Galeria from './pages/Galeria'
import Contacto from './pages/Contacto'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="login" element={< Login />} />
        <Route path="register" element={< Register />} />
        <Route path="rutas" element={< Rutas />} />
        <Route path="*" element={< NotFound />} />
        <Route path="galeria" element={< Galeria />} />
        <Route path="contacto" element={< Contacto />}/>
      </Routes>
    </BrowserRouter>
  )
}
