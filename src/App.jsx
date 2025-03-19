import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'	
import NotFound from './pages/NotFound'
import Rutas from './pages/Rutas'
import Galeria from './pages/Galeria'
import VistaProducto from './pages/VistaProducto'
import PagoExitoso from './pages/PagoExitoso'
import EditUser from './pages/EditUser'
import { AdminRoute, GuiaRoute, PublicRoute } from './components/ProtectedRoutes'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import GuiaDashboard from './pages/dashboards/GuiaDashboard'

import Contacto from './pages/Contacto'
import Blogs from './pages/Blogs'
import AgregarBlog from './pages/AgregarBlog'
import DetalleBlog from './components/DetalleBlog'
import Resenas from './pages/Resenas'
import RutasAdquiridasCliente from './pages/RutasAdquiridasCliente'
import PagoFallido from './pages/PagoFallido'
export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route 
          path="login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        <Route path="rutas" element={< Rutas />} />
        <Route path="*" element={< NotFound />} />
        <Route path="galeria" element={< Galeria />} />
        <Route path="edit-user" element={< EditUser />} />
        <Route path="rutas-adquiridas" element={< RutasAdquiridasCliente />} />
        <Route path="contacto" element={< Contacto />} />
        <Route path="blogs" element={< Blogs />} />
        <Route path="resenas" element={< Resenas />} />
        <Route path="agregar-blog" element={< AgregarBlog />} />
        <Route path="/blog/:id" element={<DetalleBlog />} />
        <Route path="producto/:nombreRuta" element={< VistaProducto />} />
        <Route path="exitosa" element={<PagoExitoso />} />
        <Route path="fallida" element={<PagoFallido />} />
        <Route 
          path="/admin/*" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
        
        <Route 
          path="/guia/*" 
          element={
            <GuiaRoute>
              <GuiaDashboard />
            </GuiaRoute>
          } 
        />
      </Routes>
    </Router>
  )
}
