import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import BotonPrimario from './BotonPrimario';
import BotonSecundario from './BotonSecundario';

export default function ClienteDashboard() {
  const [activeTab, setActiveTab] = useState('misReservas');
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-teal-600">Mi Portal</h1>
              </div>
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
              onClick={() => setActiveTab('misReservas')}
              className={`${
                activeTab === 'misReservas'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Mis Reservas
            </button>
            <button
              onClick={() => setActiveTab('rutasDisponibles')}
              className={`${
                activeTab === 'rutasDisponibles'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Rutas Disponibles
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
          </nav>
        </div>

        {/* Contenido basado en el tab activo */}
        <div className="mt-6">
          {activeTab === 'misReservas' && <MisReservas />}
          {activeTab === 'rutasDisponibles' && <RutasDisponibles />}
          {activeTab === 'galeria' && <GaleriaCliente />}
          {activeTab === 'blogs' && <BlogsCliente />}
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar las reservas del cliente
function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const { user } = useAuth();
  const db = getFirestore();

  useEffect(() => {
    const cargarReservas = async () => {
      const reservasRef = collection(db, 'reservas');
      const q = query(reservasRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      
      const reservasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setReservas(reservasData);
    };

    cargarReservas();
  }, [user]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Mis Reservas</h2>
      {reservas.length === 0 ? (
        <p className="text-gray-500">No tienes reservas activas.</p>
      ) : (
        <div className="space-y-4">
          {reservas.map(reserva => (
            <div key={reserva.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{reserva.rutaNombre}</h3>
                  <p className="text-sm text-gray-500">Fecha: {new Date(reserva.fecha).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Guía: {reserva.guiaNombre}</p>
                </div>
                <div className="flex gap-2">
                  <BotonSecundario
                    text="Cancelar"
                    onClick={() => handleCancelarReserva(reserva.id)}
                  />
                  <BotonPrimario
                    text="Ver Detalles"
                    onClick={() => handleVerDetalles(reserva.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Componente para mostrar las rutas disponibles
function RutasDisponibles() {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    const cargarRutas = async () => {
      const rutasRef = collection(db, 'rutas');
      const q = query(rutasRef, where('disponible', '==', true));
      const querySnapshot = await getDocs(q);
      
      const rutasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setRutas(rutasData);
    };

    cargarRutas();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rutas.map(ruta => (
        <div key={ruta.id} className="bg-white rounded-lg shadow overflow-hidden">
          <img 
            src={ruta.imagenURL} 
            alt={ruta.nombre}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg">{ruta.nombre}</h3>
            <p className="text-gray-600 text-sm mt-1">{ruta.descripcion}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-teal-600 font-medium">{ruta.precio}€</span>
              <BotonPrimario
                text="Reservar"
                onClick={() => handleReservar(ruta.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente para mostrar la galería
function GaleriaCliente() {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const cargarImagenes = async () => {
      const imagenesRef = collection(db, 'galeria');
      const querySnapshot = await getDocs(imagenesRef);
      
      const imagenesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setImagenes(imagenesData);
    };

    cargarImagenes();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {imagenes.map(imagen => (
        <div key={imagen.id} className="relative group">
          <img 
            src={imagen.url} 
            alt={imagen.descripcion}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg flex items-center justify-center">
            <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-2">
              {imagen.descripcion}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente para mostrar los blogs
function BlogsCliente() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const cargarBlogs = async () => {
      const blogsRef = collection(db, 'blogs');
      const querySnapshot = await getDocs(blogsRef);
      
      const blogsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setBlogs(blogsData);
    };

    cargarBlogs();
  }, []);

  return (
    <div className="space-y-6">
      {blogs.map(blog => (
        <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img 
                className="h-48 w-full object-cover md:w-48" 
                src={blog.imagenURL} 
                alt={blog.titulo}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-teal-600 font-semibold">
                {blog.categoria}
              </div>
              <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                {blog.titulo}
              </h2>
              <p className="mt-2 text-gray-500">
                {blog.resumen}
              </p>
              <div className="mt-4">
                <BotonPrimario
                  text="Leer más"
                  onClick={() => handleLeerBlog(blog.id)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 