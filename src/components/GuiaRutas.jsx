import React, { useState, useEffect, useContext } from 'react';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { UserContext } from '../Context/UserContext';
import { app } from '../../credentials';

const GuiaRutas = () => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const db = getFirestore(app);

  useEffect(() => {
    const obtenerRutasAsignadas = async () => {
      try {
        setLoading(true);
        const rutasRef = collection(db, 'Rutas');
        const q = query(rutasRef, where('guia_id', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const rutasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setRutas(rutasData);
      } catch (error) {
        console.error('Error al obtener rutas asignadas:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      obtenerRutasAsignadas();
    }
  }, [user]);

  const toggleConfirmacionAsistencia = async (rutaId, confirmacionActual) => {
    try {
      const rutaRef = doc(db, 'Rutas', rutaId);
      await updateDoc(rutaRef, {
        confirmacionEvento: !confirmacionActual
      });

      // Actualizar el estado local
      setRutas(prevRutas => 
        prevRutas.map(ruta => 
          ruta.id === rutaId 
            ? { ...ruta, confirmacionEvento: !confirmacionActual }
            : ruta
        )
      );
    } catch (error) {
      console.error('Error al actualizar confirmación:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-600">Cargando rutas...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Mis Rutas Asignadas</h2>
      {rutas.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No tienes rutas asignadas actualmente.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ruta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Punto de inicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cupos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confirmar Asistencia
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rutas.map(ruta => (
                <tr key={ruta.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={ruta.image || '/placeholder-ruta.jpg'}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {ruta.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {ruta.difficulty} • {ruta.distance}km • {ruta.duration}h
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(ruta.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ruta.start_point}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ruta.quotas}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={ruta.confirmacionEvento || false}
                          onChange={() => toggleConfirmacionAsistencia(ruta.id, ruta.confirmacionEvento)}
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out relative ${
                          ruta.confirmacionEvento ? 'bg-teal-600' : 'bg-gray-200'
                        }`}>
                          <div
                            className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out transform ${
                              ruta.confirmacionEvento ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-3 text-sm text-gray-700">
                        {ruta.confirmacionEvento ? 'Confirmado' : 'No confirmado'}
                      </span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GuiaRutas;
