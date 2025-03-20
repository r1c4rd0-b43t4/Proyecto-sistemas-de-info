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
      <header className="bg-white shadow fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3">
            <h1 className="text-2xl font-bold text-teal-600 mb-2 sm:mb-0">
              Panel de Guía
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">{user?.email}</span>
              <BotonPrimario
                text="Cerrar Sesión"
                onClick={handleLogout}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
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

            <div className="p-6">
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
      </main>
    </div>
  );
} 