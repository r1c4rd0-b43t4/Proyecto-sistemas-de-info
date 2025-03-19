import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Header_NoSession';
import Footer from '../components/Footer';
import { app } from '../../credentials';

const Resenas = () => {
  const [resenas, setResenas] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarResenas = async () => {
      const db = getFirestore(app);
      try {
        const resenasRef = collection(db, 'resenas');
        const resenasSnap = await getDocs(resenasRef);
        const resenasData = [];

  
        for (const docSnap of resenasSnap.docs) {
          const resena = docSnap.data();
          const rutaRef = doc(db, 'Rutas', resena.rutaId);
          const usuarioRef = doc(db, 'usuarios', resena.userId);

          const rutaSnap = await getDoc(rutaRef);
          const usuarioSnap = await getDoc(usuarioRef);

          resenasData.push({
            id: docSnap.id,
            ...resena,
            ruta_nombre: rutaSnap.exists() ? rutaSnap.data().name : 'Ruta no disponible',
            usuario_email: usuarioSnap.exists() ? usuarioSnap.data().email : 'Usuario no disponible'
          });
        }

        setResenas(resenasData);
        console.log(resenasData);
        console.log('Reseñas cargadas:', resenasData);
      } catch (error) {
        console.error('Error al cargar reseñas:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarResenas();
  }, []);

  const resenasFiltradas = resenas.filter(resena => {
    if (filtro === 'todas') return true;
    return resena.calificación === parseInt(filtro);
  });

  const renderEstrellas = (cantidad) => {
    return Array(5).fill(0).map((_, index) => (
      <svg 
        key={index}
        width="16" 
        height="17" 
        viewBox="0 0 16 17" 
        fill={index < cantidad ? "#FA8232" : "none"} 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8.275 12.4188L11.425 14.4188C11.8312 14.675 12.3312 14.2938 12.2125 13.825L11.3 10.2375C11.2753 10.1381 11.2792 10.0337 11.3113 9.93638C11.3434 9.83907 11.4023 9.7528 11.4812 9.68752L14.3062 7.33127C14.675 7.02502 14.4875 6.40627 14.0062 6.37502L10.3187 6.13752C10.2181 6.13166 10.1214 6.09663 10.0404 6.03669C9.95935 5.97675 9.89754 5.89451 9.8625 5.80002L8.4875 2.33752C8.4511 2.23745 8.38479 2.15102 8.29758 2.08994C8.21037 2.02886 8.10647 1.99609 8 1.99609C7.89352 1.99609 7.78963 2.02886 7.70241 2.08994C7.6152 2.15102 7.54889 2.23745 7.5125 2.33752L6.1375 5.80002C6.10245 5.89451 6.04064 5.97675 5.95962 6.03669C5.87859 6.09663 5.78186 6.13166 5.68125 6.13752L1.99375 6.37502C1.5125 6.40627 1.325 7.02502 1.69375 7.33127L4.51875 9.68752C4.59771 9.7528 4.65661 9.83907 4.68868 9.93638C4.72075 10.0337 4.72467 10.1381 4.7 10.2375L3.85625 13.5625C3.7125 14.125 4.3125 14.5813 4.79375 14.275L7.725 12.4188C7.8072 12.3665 7.90259 12.3387 8 12.3387C8.09741 12.3387 8.1928 12.3665 8.275 12.4188Z" 
        fill={index < cantidad ? "#FA8232" : "#E4E4E4"}
      />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#00796B] mb-4"><span>Reseñas de </span> <span className='text-orange-500'>Unimetrail</span></h1>
            <p className="text-lg text-gray-600">Descubre lo que opinan nuestros aventureros</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setFiltro('todas')}
              className={`px-4 py-2 rounded-full ${
                filtro === 'todas' 
                  ? 'bg-[#00796B] text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Todas
            </button>
            {[5, 4, 3, 2, 1].map(num => (
              <button
                key={num}
                onClick={() => setFiltro(num.toString())}
                className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                  filtro === num.toString() 
                    ? 'bg-[#00796B] text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {num} {renderEstrellas(num)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00796B] mx-auto"></div>
            </div>
          ) : resenasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay reseñas disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resenasFiltradas.map((resena, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {renderEstrellas(resena.calificación)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {resena.usuario_email || 'Usuario anónimo'}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-[#00796B] mb-2">
                    {resena.ruta_nombre || 'Ruta no disponible'}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {resena.comentario}
                  </p>
                  
                  {resena.fecha_creacion && (
                    <div className="text-sm text-gray-500 text-right">
                      {new Date(resena.fecha_creacion.seconds * 1000).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <div className="w-full mt-6 flex justify-center items-center relative">
                    <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Caracas.svg" alt="Avila Background" className="w-full h-auto object-contain" />
      </div>

      <Footer />
    </div>
  );
};

export default Resenas;
