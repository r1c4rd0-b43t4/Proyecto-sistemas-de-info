import React, { useEffect, useState } from 'react';
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { app } from '../../credentials';
import BotonPrimario from './BotonPrimario';

const VerRutasAd = () => {
  const [rutas, setRutas] = useState([]);
  const db = getFirestore(app);

  async function getRutas() {
    const usersCollectionRef = collection(db, 'RutasCompradas');
    const querySnapshot = await getDocs(usersCollectionRef);
    const usersList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setRutas(usersList);
  }

  useEffect(() => {
    getRutas();
  }, []);

  return (
    <div className="w-screen h-full p-5">
      <h1 className="text-3xl font-bold mb-5">Mis Rutas Compradas</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Ruta</th>
            <th className="py-2 px-4 border-b">Hora de encuentro</th>
            <th className="py-2 px-4 border-b">Lugar de encuentro</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Crear reseña</th>
            <th className="py-2 px-4 border-b">Grupo de WhatsApp</th>
          </tr>
        </thead>
        <tbody>
          {rutas.map(ruta => (
            <tr key={ruta.id}>
              <td className="py-2 px-4 border-b">{ruta.name}</td>
              <td className="py-2 px-4 border-b">{ruta.meeting_time}</td>
              <td className="py-2 px-4 border-b">{ruta.meeting_place}</td>
              <td className="py-2 px-4 border-b">{ruta.date}</td>
              <td className="py-2 px-4 border-b">
                <BotonPrimario text="Crear reseña" />
              </td>
              <td className="py-2 px-4 border-b">
                <a href={ruta.whatsapp_group} className="text-blue-500">Unirse</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerRutasAd;