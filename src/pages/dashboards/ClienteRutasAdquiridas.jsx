import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { UserContext } from '../../Context/UserContext';
import Loader from '../../loader/Loader';
import { useNavigate } from 'react-router';

export default function ClienteRutasAdquiridas() {
  const [rutasCompradas, setRutasCompradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logged } = React.useContext(UserContext);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    if (!logged) {
      navigate('/login');
      return;
    }
    cargarRutasCompradas();
  }, [logged, navigate]);

  const cargarRutasCompradas = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      if (userDoc.exists()) {
        setRutasCompradas(userDoc.data().rutasCompradas || []);
      }
    } catch (error) {
      console.error('Error al cargar rutas compradas:', error);
      setError('Error al cargar las rutas compradas');
    } finally {
      setLoading(false);
    }
  };

  const agregarReseña = async (rutaId, reseña) => {
    try {
      const userRef = doc(db, 'usuarios', user.uid);
      await updateDoc(userRef, {
        reseñas: arrayUnion({
          rutaId,
          texto: reseña,
          fecha: new Date().toISOString()
        })
      });

      // Actualizar el estado local
      setRutasCompradas(rutasCompradas.map(ruta => {
        if (ruta.rutaId === rutaId) {
          return {
            ...ruta,
            reseña: {
              texto: reseña,
              fecha: new Date().toISOString()
            }
          };
        }
        return ruta;
      }));
    } catch (error) {
      console.error('Error al agregar reseña:', error);
      setError('Error al agregar la reseña');
    }
  };

  if (!logged) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Rutas Compradas</h1>
        
        {rutasCompradas.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No has comprado ninguna ruta aún.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rutasCompradas.map((ruta) => (
              <div key={ruta.rutaId} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={ruta.imagen || '/placeholder-ruta.jpg'}
                    alt={ruta.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{ruta.nombre}</h2>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">
                      <span className="font-medium">Precio:</span> ${ruta.precio}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Fecha de compra:</span>{' '}
                      {new Date(ruta.fechaCompra).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Sección de WhatsApp */}
                  {ruta.whatsapp && (
                    <div className="mb-4">
                      <a
                        href={ruta.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 hover:text-green-700"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.287.129.332.202.045.073.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 19.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                        </svg>
                        Unirse al grupo de WhatsApp
                      </a>
                    </div>
                  )}

                  {/* Sección de Reseñas */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Tu Reseña</h3>
                    {ruta.reseña ? (
                      <div>
                        <p className="text-gray-700">{ruta.reseña.texto}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(ruta.reseña.fecha).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          rows="3"
                          placeholder="Escribe tu reseña aquí..."
                        />
                        <button
                          onClick={(e) => {
                            const reseña = e.target.previousElementSibling.value;
                            if (reseña.trim()) {
                              agregarReseña(ruta.rutaId, reseña);
                              e.target.previousElementSibling.value = '';
                            }
                          }}
                          className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          Enviar Reseña
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}