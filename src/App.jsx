import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'	
import NotFound from './pages/NotFound'
import Rutas from './pages/Rutas'
import Galeria from './pages/Galeria'
import EditUser from './pages/EditUser'
import { AuthProvider } from './context/AuthContext'
import { AdminRoute, GuiaRoute, ClienteRoute } from './components/ProtectedRoutes'
import AdminDashboard from './components/AdminDashboard'
import GuiaDashboard from './components/GuiaDashboard'
import ClienteDashboard from './components/ClienteDashboard'

export default function App() {
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
          <Route path="edit-profile" element={< EditUser />} />
          
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
          
          <Route 
            path="/cliente/*" 
            element={
              <ClienteRoute>
                <ClienteDashboard />
              </ClienteRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
