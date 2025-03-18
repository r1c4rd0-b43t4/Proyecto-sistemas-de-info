import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';

export default function RutasCompradas() {
  const [rutasCompradas, setRutasCompradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const db = getFirestore();

  useEffect(() => {
    cargarRutasCompradas();
  }, []);

  const cargarRutasCompradas = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      if (userDoc.exists()) {
        setRutasCompradas(userDoc.data().rutasCompradas || []);
      }
    } catch (error) {
      console.error('Error al cargar rutas compradas:', error);
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
      alert('Error al agregar la reseña. Por favor, intente nuevamente.');
    }
  };

  if (loading) {
    return <div>Cargando rutas compradas...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Mis Rutas Compradas</h2>
      
      {rutasCompradas.length === 0 ? (
        <p className="text-gray-500">No has comprado ninguna ruta aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rutasCompradas.map((ruta) => (
            <div key={ruta.rutaId} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900">{ruta.nombre}</h3>
              <p className="text-gray-600">Precio: ${ruta.precio}</p>
              <p className="text-gray-600">Fecha de compra: {new Date(ruta.fechaCompra).toLocaleDateString()}</p>
              
              {/* Sección de WhatsApp */}
              <div className="mt-4">
                <a
                  href={ruta.whatsappLink}
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

              {/* Sección de Reseñas */}
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-900">Tu Reseña</h4>
                {ruta.reseña ? (
                  <div className="mt-2">
                    <p className="text-gray-700">{ruta.reseña.texto}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(ruta.reseña.fecha).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <div className="mt-2">
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
          ))}
        </div>
      )}
    </div>
  );
} 