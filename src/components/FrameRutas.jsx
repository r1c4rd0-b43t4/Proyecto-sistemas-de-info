import React, { useEffect, useState } from 'react';
import { TarjetaRuta } from './TarjetaRuta';
import { doc, getDocs, getFirestore, collection } from "firebase/firestore";
import { app } from '../../credentials';

const FrameRutas = () => {
  const [rutas, setRutas] = useState([]);
  const [rutasFiltradas, setRutasFiltradas] = useState([]);
  const [dificultadSeleccionada, setDificultadSeleccionada] = useState('todas');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  async function getRutas() {
    try {
      setLoading(true);
      setError(null);
      const usersCollectionRef = collection(db, 'Rutas');
      const querySnapshot = await getDocs(usersCollectionRef);
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Rutas obtenidas:', usersList);
      setRutas(usersList);
      setRutasFiltradas(usersList);
    } catch (error) {
      console.error('Error al obtener rutas:', error);
      setError('Error al cargar las rutas. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRutas();
  }, []);

  useEffect(() => {
    let rutasFiltradas = [...rutas];
    

    if (dificultadSeleccionada !== 'todas') {
      rutasFiltradas = rutasFiltradas.filter(ruta => ruta.difficulty === dificultadSeleccionada);
    }
    

    if (terminoBusqueda.trim() !== '') {
      const busqueda = terminoBusqueda.toLowerCase();
      rutasFiltradas = rutasFiltradas.filter(ruta => 
        ruta.name.toLowerCase().includes(busqueda)
      );
    }
    
    setRutasFiltradas(rutasFiltradas);
  }, [dificultadSeleccionada, rutas, terminoBusqueda]);

  return (
    <div className='w-screen h-full'>
      <div className='md:px-20 px-5 flex align-middle items-center bg-[#F7F7F8] w-screen md:h-screen'>
        <div className='md:w-full w-screen relative'>
          <div className='relative w-full h-full'>
            <img 
              src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Humboldt_rutas.svg" 
              alt="humboldt_rutas" 
              className='w-full h-full object-cover'
            />

          </div>
          <h1 className='md:text-9xl text-5xl font-bold'> 
                <span className='text-teal-600'>Rutas </span> 
                <span className='text-[#D76411]'>Unimetrail</span>
              </h1>
        </div>
      </div>
      <div className='bg-[url(https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Avila_Vector_BG.svg)] mt-10 bg-contain bg-no-repeat bg-center '>
        <div className='text-center mb-8 pt-20 space-y-5'>
          <h1 className='text-5xl font-bold break-words text-teal-600'>Nuevas Aventuras</h1>
          <h3 className='text-4xl break-words text-teal-600'>Explora nuestras rutas</h3>
        </div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-4 w-screen h-fill px-4'>
          <input
            type="text"
            placeholder="Buscar rutas..."
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            className="w-full md:w-1/2 p-2 border border-teal-600 rounded-lg bg-white"
          />
          <select
            value={dificultadSeleccionada}
            onChange={(e) => setDificultadSeleccionada(e.target.value)}
            className="w-full md:w-1/4 p-2 border border-teal-600 rounded-lg bg-white text-gray-700"
          >
            <option value="todas">Todas las dificultades</option>
            <option value="Extrema">Extrema</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
      </div>

      <div className='flex justify-center w-full md:px-10 md:py-10'>
        {loading ? (
          <div className="text-center text-xl text-teal-600">Cargando rutas...</div>
        ) : error ? (
          <div className="text-center text-xl text-red-600">{error}</div>
        ) : rutasFiltradas.length === 0 ? (
          <div className="text-center text-xl text-teal-600">No se encontraron rutas</div>
        ) : (
          <div className='grid gap-8 w-full max-w-7xl mx-auto px-4' 
               style={{ 
                 gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                 justifyItems: 'center'
               }}>
            {rutasFiltradas.map(ruta => (
              <div key={ruta.id} className='w-full max-w-md p-5 rounded-lg flex flex-col justify-between'>
                <TarjetaRuta
                  nombreRuta={ruta.name}
                  precio={ruta.price}
                  inicio={ruta.start_point}
                  tiempo={ruta.duration}
                  distancia={ruta.distance}
                  dificultad={ruta.difficulty}
                  icono={ruta.image}
                  cupos={ruta.quotas}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FrameRutas;