import React, { useEffect, useState } from 'react';
import { TarjetaRuta } from './TarjetaRuta';
import { doc, getDocs, getFirestore, collection } from "firebase/firestore";
import { app } from '../../credentials';

const FrameRutas = () => {
  const [rutas, setRutas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredRutas = rutas.filter(ruta =>
    ruta.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-screen h-full'>
      <div className='md:px-20 pt-0 px-5 flex align-middle items-center bg-[#F7F7F8] w-screen md:h-screen'>
        <div className='md:w-full md:pt-0 h-fit w-screen justify-left pt-20'>
          <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Humboldt_rutas.svg" alt="humboldt_rutas" className='object-fill w-full md:h-120' />
          <p className='relative md:bottom-14 bottom-5 left-0 md:text-3xl text-sm text-teal-600'>Explora el Ávila</p>
          <h1 className='md:text-9xl text-5xl font-bold'> <span className='text-teal-600'>Rutas</span> <span className='text-[#D76411]'>Unimetrail</span></h1>
        </div>
      </div>
      <div className='text-center mb-8 pt-20 space-y-5'>
        <h1 className='text-5xl font-bold break-words text-teal-600'>Nuevas Aventuras</h1>
        <h3 className='text-4xl break-words text-teal-600'>Explora nuestras rutas</h3>
      </div>
      <div className='flex justify-center mb-8'>
        <input
          type="text"
          placeholder="Buscar rutas..."
          className="w-1/2 p-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='flex justify-center w-full md:px-10 md:py-20'>
        <div className='grid gap-5 w-full' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          {filteredRutas.map(ruta => (
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