import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { getFirestore, collection, query, getDocs, updateDoc, doc } from 'firebase/firestore';
import BotonPrimario from '../../components/BotonPrimario';
import BotonSecundario from '../../components/BotonSecundario';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('usuarios');
  const { user } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-teal-600">Panel de Administración</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Perfil" 
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-gray-700">{user?.email}</span>
              </div>
              <BotonPrimario
                text="Cerrar Sesión"
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
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
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const usuariosRef = collection(db, 'usuarios');
      const querySnapshot = await getDocs(usuariosRef);
      const usuariosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsuarios(usuariosData);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setLoading(false);
    }
  };

  const ascenderAGuia = async (userId) => {
    try {
      await updateDoc(doc(db, 'usuarios', userId), {
        role: 'guia'
      });
      cargarUsuarios(); // Recargar la lista
    } catch (error) {
      console.error('Error al ascender usuario:', error);
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    {usuario.fotoURL ? (
                      <img 
                        className="h-10 w-10 rounded-full" 
                        src={usuario.fotoURL} 
                        alt="" 
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white">
                        {usuario.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {usuario.nombre} {usuario.apellido}
                    </div>
                    <div className="text-sm text-gray-500">
                      {usuario.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  usuario.role === 'admin' 
                    ? 'bg-red-100 text-red-800' 
                    : usuario.role === 'guia'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {usuario.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {usuario.role === 'cliente' && (
                  <BotonSecundario
                    text="Ascender a Guía"
                    onClick={() => ascenderAGuia(usuario.id)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Componentes para las otras secciones
function AdminRutas() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Gestión de Rutas</h2>
      {/* Implementa la gestión de rutas aquí */}
    </div>
  );
}

function AdminBlogs() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Gestión de Blogs</h2>
      {/* Implementa la gestión de blogs aquí */}
    </div>
  );
}

function AdminGaleria() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Gestión de Galería</h2>
      {/* Implementa la gestión de la galería aquí */}
    </div>
  );
} 