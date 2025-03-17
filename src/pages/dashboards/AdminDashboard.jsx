import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { getFirestore, collection, query, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { supabase } from '../../../supabaseClient';
import BotonPrimario from '../../components/BotonPrimario';
import BotonSecundario from '../../components/BotonSecundario';
import AddImageButton from '../../components/AddImageButton';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('usuarios');
  const [rutas, setRutas] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    if (activeTab === 'rutas') {
      cargarRutas();
    }
  }, [activeTab]);

  const cargarRutas = async () => {
    try {
      const rutasRef = collection(db, 'Rutas');
      const querySnapshot = await getDocs(rutasRef);
      const rutasList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRutas(rutasList);
    } catch (error) {
      console.error('Error al cargar rutas:', error);
    }
  };

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
          {activeTab === 'rutas' && <AdminRutas rutas={rutas} onRefresh={cargarRutas} />}
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
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('todos');
  const db = getFirestore();
  const { user } = useAuth();

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

  const toggleRolUsuario = async (userId, currentRole) => {
    if (user.uid === userId && currentRole === 'admin') {
      alert('No puedes cambiar tu propio rol de administrador');
      return;
    }

    const nuevoRol = currentRole === 'guia' ? 'cliente' : 'guia';
    try {
      await updateDoc(doc(db, 'usuarios', userId), {
        role: nuevoRol
      });
      cargarUsuarios();
    } catch (error) {
      console.error('Error al cambiar rol:', error);
    }
  };

  const eliminarUsuario = async (userId) => {
    if (user.uid === userId) {
      alert('No puedes eliminar tu propia cuenta de administrador');
      return;
    }

    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await deleteDoc(doc(db, 'usuarios', userId));
        cargarUsuarios();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
  };

  const usuariosFiltrados = usuarios
    .filter(usuario => 
      usuario.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter(usuario => 
      filtroRol === 'todos' ? true : usuario.role === filtroRol
    );

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="w-full px-4 py-2 border rounded-lg border-teal-600"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-lg border-teal-600"
          value={filtroRol}
          onChange={(e) => setFiltroRol(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="cliente">Clientes</option>
          <option value="guia">Guías</option>
        </select>
      </div>

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
                Cambiar Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado Evento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuariosFiltrados.map(usuario => (
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
                <td className="px-6 py-4 whitespace-nowrap">
                  {usuario.role !== 'admin' && (
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={usuario.role === 'guia'}
                          onChange={() => toggleRolUsuario(usuario.id, usuario.role)}
                          disabled={user.uid === usuario.id && usuario.role === 'admin'}
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out relative ${
                          usuario.role === 'guia' ? 'bg-teal-600' : 'bg-gray-200'
                        }`}>
                          <div
                            className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out transform ${
                              usuario.role === 'guia' ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-3 text-sm text-gray-700">
                        {usuario.role === 'guia' ? 'Guía' : 'Cliente'}
                      </span>
                    </label>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {usuario.role === 'guia' && (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      usuario.confirmacionEvento 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {usuario.confirmacionEvento ? 'Confirmado' : 'No confirmado'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {(user.uid !== usuario.id || usuario.role !== 'admin') && (
                    <button
                      onClick={() => eliminarUsuario(usuario.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      title="Eliminar usuario"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente AdminRutas mejorado
function AdminRutas({ rutas, onRefresh }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const db = getFirestore();

  const eliminarRuta = async (rutaId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta ruta?')) {
      try {
        await deleteDoc(doc(db, 'Rutas', rutaId));
        onRefresh();
      } catch (error) {
        console.error('Error al eliminar ruta:', error);
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Gestión de Rutas</h2>
        <BotonPrimario
          text="Agregar Ruta"
          onClick={() => setMostrarFormulario(true)}
        />
      </div>

      {/* Grid de Rutas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rutas.map(ruta => (
          <div key={ruta.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="relative h-48">
              <img
                src={ruta.image || '/placeholder-ruta.jpg'}
                alt={ruta.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{ruta.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <span className="font-medium mr-2">Precio:</span>
                  ${ruta.price}
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2">Inicio:</span>
                  {ruta.start_point}
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2">Duración:</span>
                  {ruta.duration}
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2">Distancia:</span>
                  {ruta.distance} km
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2">Dificultad:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    ruta.difficulty === 'Fácil' ? 'bg-green-100 text-green-800' :
                    ruta.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {ruta.difficulty}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <BotonSecundario
                  text="Editar"
                  onClick={() => {/* Implementar edición */}}
                />
                <button
                  onClick={() => eliminarRuta(ruta.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Aquí puedes agregar el modal o formulario para agregar/editar rutas */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          {/* Implementar formulario de ruta */}
        </div>
      )}
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
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('imagenes-galeria')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (error) throw error;

      const publicUrls = await Promise.all(data.map(async (file) => {
        const { data: urlData } = supabase.storage
          .from('imagenes-galeria')
          .getPublicUrl(file.name);

        return {
          src: urlData.publicUrl,
          alt: file.name,
          name: file.name
        };
      }));

      setImages(publicUrls);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar imágenes:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDeleteImage = async (image) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
      try {
        console.log('Intentando eliminar imagen:', {
          nombre: image.name,
          ruta: image.src
        });

        // Intentar eliminar directamente
        const { error } = await supabase.storage
          .from('imagenes-galeria')
          .remove([image.name]);

        if (error) {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar la imagen: ' + error.message);
          return;
        }

        // Si no hay error, actualizar la interfaz
        setImages(prevImages => prevImages.filter(img => img.name !== image.name));
        console.log('Imagen eliminada exitosamente');
        
      } catch (err) {
        console.error('Error en el proceso de eliminación:', err);
        alert('Error al procesar la eliminación: ' + err.message);
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-teal-600">Cargando imágenes...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-red-600">Error: {error}</div>
    </div>
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Header mejorado */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Gestión de Galería</h2>
      </div>

      {/* Contenedor de la galería con botón de agregar */}
      <div className="space-y-6">
        {/* Grid de imágenes - Vista de escritorio */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {/* Botón de agregar como primera celda */}
          <div className="aspect-square rounded-lg flex items-center justify-center">
            <AddImageButton onImageAdded={fetchImages} />
          </div>
          
          {/* Resto de las imágenes */}
          {images.map((image) => (
            <div
              key={image.src}
              className="relative group aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
              {/* Overlay con botón de eliminar */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <button
                  onClick={() => handleDeleteImage(image)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  title="Eliminar imagen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Vista móvil - Grid de 2 columnas */}
        <div className="md:hidden space-y-4">
          {/* Botón de agregar en móvil */}
          <div className="border-2 border-dashed border-teal-600 rounded-lg p-4 flex items-center justify-center">
            <AddImageButton onImageAdded={fetchImages} />
          </div>
          
          {/* Grid de imágenes en móvil */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((image) => (
              <div
                key={image.src}
                className="relative group aspect-square"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
                {/* Overlay con botón de eliminar para móvil */}
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => handleDeleteImage(image)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    title="Eliminar imagen"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 