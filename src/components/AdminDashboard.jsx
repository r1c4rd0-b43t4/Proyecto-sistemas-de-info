import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('usuarios');
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-teal-600">Panel de Administración</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs de navegación */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('usuarios')}
              className={`${
                activeTab === 'usuarios'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Usuarios
            </button>
            <button
              onClick={() => setActiveTab('rutas')}
              className={`${
                activeTab === 'rutas'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Rutas
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`${
                activeTab === 'blogs'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Blogs
            </button>
            <button
              onClick={() => setActiveTab('galeria')}
              className={`${
                activeTab === 'galeria'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Galería
            </button>
          </nav>
        </div>

        {/* Contenido basado en el tab activo */}
        <div className="mt-6">
          {activeTab === 'usuarios' && <AdminUsuarios />}
          {activeTab === 'rutas' && <AdminRutas />}
          {activeTab === 'blogs' && <AdminBlogs />}
          {activeTab === 'galeria' && <AdminGaleria />}
        </div>
      </div>
    </div>
  );
}

// Componente para gestionar usuarios
function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const ascenderAGuia = async (userId) => {
    const db = getFirestore();
    try {
      await updateDoc(doc(db, 'usuarios', userId), {
        role: 'guia'
      });
      // Actualizar la lista de usuarios
    } catch (error) {
      console.error('Error al ascender usuario:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Implementa tu tabla de usuarios aquí */}
    </div>
  );
} 