import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'	
import NotFound from './pages/NotFound'
import Rutas from './pages/Rutas'
import Galeria from './pages/Galeria'
import EditUser from './pages/EditUser'
import { AdminRoute, GuiaRoute } from './components/ProtectedRoutes'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import GuiaDashboard from './pages/dashboards/GuiaDashboard'
import { AuthProvider } from './context/AuthContext'
import ClienteRutasAdquiridas from './pages/dashboards/ClienteRutasAdquiridas'
import Contacto from './pages/Contacto'
import Blogs from './pages/Blogs'

export default function App() {
  console.log('hola')
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="login" element={< Login />} />
          <Route path="register" element={< Register />} />
          <Route path="rutas" element={< Rutas />} />
          <Route path="*" element={< NotFound />} />
          <Route path="galeria" element={< Galeria />} />
          <Route path="edit-user" element={< EditUser />} />
          <Route path="VerRutasAd" element={< ClienteRutasAdquiridas />} />
          <Route path="contacto" element={< Contacto />} />
          <Route path="blogs" element={< Blogs />} />
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
        </AuthProvider>
    </Router>
  )
}
