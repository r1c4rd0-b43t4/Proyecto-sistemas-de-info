import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { UserContext } from '../Context/UserContext';
import Loader from '../loader/Loader';
import { useNavigate } from 'react-router';
import StarRating from './StarRating';

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
        const rutasCompradas = userDoc.data().rutasCompradas || [];
        
        if (rutasCompradas.length === 0) {
          setRutasCompradas([]);
          setLoading(false);
          return;
        }
  
       
        const rutasPromises = rutasCompradas.map(async (ruta) => {
          const rutaDoc = await getDoc(doc(db, 'Rutas', ruta.rutaId));
          return rutaDoc.exists() ? { ...rutaDoc.data(), rutaId: ruta.rutaId } : null;
        });
  
        const rutasDetalladas = (await Promise.all(rutasPromises)).filter(ruta => ruta !== null);
        console.log('Rutas compradas:', rutasDetalladas);
        setRutasCompradas(rutasDetalladas);

      }
    } catch (error) {
      console.error('Error al cargar rutas compradas:', error);
      setError('Error al cargar las rutas compradas');
    } finally {
      setLoading(false);
    }
  };
  

  const agregarReseña = async (rutaId, reseña, rating) => {
    try {
      const userRef = doc(db, 'usuarios', user.uid);
      await updateDoc(userRef, {
        reseñas: arrayUnion({
          rutaId,
          texto: reseña,
          rating: rating,
          fecha: new Date().toISOString()
        })
      });


      setRutasCompradas(rutasCompradas.map(ruta => {
        if (ruta.uniqueId === rutaId) {
          return {
            ...ruta,
            reseña: {
              texto: reseña,
              rating: rating,
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
    <div className="min-h-screen py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Rutas Compradas</h1>
        
        {rutasCompradas.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No has comprado ninguna ruta aún.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {rutasCompradas.map((ruta,index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{ruta.name}</h2>
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        <span className="font-medium">Descripción:</span> {ruta.description}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Dificultad:</span> {ruta.difficulty}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Distancia:</span> {ruta.distance} km
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Duración:</span> {ruta.duration} horas
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Punto de partida:</span> {ruta.start_point}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Cupos:</span> {ruta.quotas}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Precio:</span> ${ruta.price}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Fecha:</span>{' '}
                        {ruta.date ? new Date(ruta.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Fecha no disponible'}
                      </p>
                      

                      {ruta.images && ruta.images.length > 0 && (
                        <div className="mt-4">
                          <p className="font-medium mb-2">Galería de imágenes:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {ruta.images.map((img, index) => (
                              <img
                                key={`${ruta.uniqueId}-img-${index}`}
                                src={img}
                                alt={`Imagen ${index + 1} de ${ruta.name}`}
                                className="w-full h-32 object-cover rounded"
                              />
                            ))}
                          </div>
                        </div>
                      )}


                      {ruta.image && (
                        <div className="mt-4">
                          <p className="font-medium mb-2">Imagen principal:</p>
                          <img
                            src={ruta.image}
                            alt={ruta.name}
                            className="w-full h-48 object-cover rounded"
                          />
                        </div>
                      )}
                    </div>


                    {ruta.whatsapp && (
                      <div className="mt-4">
                        <a
                          href={ruta.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.287.129.332.202.045.073.045.419-.1.824z"/>
                          </svg>
                          Unirse al grupo de WhatsAppa
                        </a>
                      </div>
                    )}
                  </div>


                  <div className="border-l pl-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Tu Reseña</h3>
                    {ruta.reseña ? (
                      <div>
                     
                        <StarRating 
                          totalStars={5} 
                          initialRating={ruta.reseña.rating} 
                          readOnly={true}
                          rutaId={ruta.rutaId}
                        />
                    
                        <p className="text-gray-700 mt-2">{ruta.reseña.texto}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(ruta.reseña.fecha).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <div>
                    
                        <p>(Selecciona para colocar la reseña)</p>
                        <StarRating 
                          totalStars={5} 
                          rutaId={ruta.rutaId} 
                          rutaNombre={ruta.name}
                        />
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