import { useState, useEffect, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import BotonPrimario from '../../components/BotonPrimario';
import GuiaRutas from '../../components/GuiaRutas';
import GuiaGaleria from '../../components/GuiaGaleria';
import GuiaBlogs from '../../components/GuiaBlogs';
import { UserContext } from '../../Context/UserContext';

export default function GuiaDashboard() {
  const [activeTab, setActiveTab] = useState('misRutas');
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const auth = getAuth();
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    const obtenerRutas = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener rutas:', error);
        setLoading(false);
      }
    };

    obtenerRutas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-teal-600">Panel de Guía</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4">{user?.email}</span>
              <BotonPrimario
                text="Cerrar Sesión"
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('misRutas')}
              className={`${
                activeTab === 'misRutas'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Mis Rutas
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


        <div className="mt-6">
          {activeTab === 'galeria' && <GuiaGaleria />}
          {activeTab === 'blogs' && <GuiaBlogs />}
          {activeTab === 'misRutas' && (
            loading ? (
              <div className="text-center">
                <p>Cargando rutas...</p>
              </div>
            ) : (
              <GuiaRutas rutas={rutas} />
            )
          )}
        </div>
      </div>
    </div>
  );
} 