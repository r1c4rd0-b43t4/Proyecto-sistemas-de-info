import React, { useEffect, useState } from 'react';
import { TarjetaRuta } from './TarjetaRuta';
import { doc, getDocs, getFirestore, collection } from "firebase/firestore";
import { app } from '../../credentials';

const FrameRutas = () => {
  const [rutas, setRutas] = useState([]);
  const db = getFirestore(app);

  async function getRutas() {
    const usersCollectionRef = collection(db, 'Rutas');
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
    <div className='w-screen h-full'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold break-words'>Nuevas Aventuras</h1>
        <h3 className='text-2xl break-words'>Explora nuestras rutas</h3>
      </div>
      <div className='flex justify-center mb-8'>
        <input
          type="text"
          placeholder="Buscar rutas..."
          className="w-1/2 p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className='flex justify-center w-full'>
        <div className='grid gap-5 w-full' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          {rutas.map(ruta => (
            <div key={ruta.id} className='p-5 rounded-lg flex flex-col justify-between'>
              <TarjetaRuta
                nombreRuta={ruta.name}
                precio={ruta.price}
                inicio={ruta.start_point}
                tiempo={ruta.duration}
                distancia={ruta.distance}
                dificultad={ruta.difficulty}
                icono={ruta.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameRutas;