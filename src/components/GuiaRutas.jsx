import React, { useState, useEffect, useContext } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { UserContext } from '../Context/UserContext';
import { app } from '../../credentials';
import RutasAsignadas from './RutasAsignadas';

const GuiaRutas = () => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const db = getFirestore(app);

  useEffect(() => {
    const obtenerRutasAsignadas = async () => {
      try {
        setLoading(true);
        const rutasRef = collection(db, 'RutasAsignadas');
        const q = query(rutasRef, where('guiaId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const rutasData = [];
        for (const doc of querySnapshot.docs) {
          const rutaAsignada = doc.data();
          // Obtener los detalles de la ruta
          const rutaRef = await getDocs(collection(db, 'Rutas'));
          const rutaDoc = rutaRef.docs.find(d => d.id === rutaAsignada.rutaId);
          
          if (rutaDoc) {
            rutasData.push({
              id: doc.id,
              ...rutaAsignada,
              ...rutaDoc.data()
            });
          }
        }
        
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
        <RutasAsignadas rutas={rutas} />
      )}
    </div>
  );
};

export default GuiaRutas;
