import React, { useEffect, useState } from 'react';
import { TarjetaRuta } from "./TarjetaRuta";
import BotonSecundario from "./BotonSecundario";
import BotonPrimario from "./BotonPrimario";
import { doc, getDocs, getFirestore, collection } from "firebase/firestore";
import { app } from '../../credentials';

export default function Frame_3_Home() {
      const [rutas, setRutas] = useState([]);
      const db = getFirestore(app);
      const tres_rutas = rutas.slice(0,3)
    
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
        <div className="w-screen h-full bg-white text-black">
            <div className="px-5 py-20 flex flex-col justify-start items-start h-full w-screen gap-2">
                <div className="flex flex-col items-start w-full md:px-25 px-10">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-0">
                            <h1 className="md:text-5xl text-3xl font-bold text-[#00796B] leading-[76px]">Descubre nuestras</h1>
                            <h1 className="md:text-5xl text-3xl font-bold text-[#D76411] ml-2 leading-[76px]">rutas</h1>
                        </div>
                        <div className="mt-4">
                            <p className="text-lg text-gray-700">Explora nuevas aventuras y descubre rutas inolvidables.</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center w-full'>
                    
                <div className='grid gap-10 w-11/12 justify-center' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                    {tres_rutas.map(tres_rutas => (
                      <div key={tres_rutas.id} className='p-5 rounded-lg flex flex-col justify-between'>
                        <TarjetaRuta
                          nombreRuta={tres_rutas.name}
                          precio={tres_rutas.price}
                          inicio={tres_rutas.start_point}
                          tiempo={tres_rutas.duration}
                          distancia={tres_rutas.distance}
                          dificultad={tres_rutas.difficulty}
                          icono={tres_rutas.image}
                          cupos={tres_rutas.quotas}
                        />
                      </div>
                    ))}
                </div>
                </div>
                <div className="flex justify-center w-full mt-6">
                    <BotonSecundario text="Ver más" to="/rutas" />
                </div>
                <div className="w-full mt-6 flex justify-center items-center relative">
                    <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Caracas.svg" alt="Avila Background" className="w-full h-auto object-contain" />
                </div>
            </div>
            <div className="flex justify-center w-full mt-0">
                <div className="p-5 bg-white rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center w-full md:w-3/4 h-48 md:h-64">
                    <div className="self-start md:self-center mb-4 md:mb-0 align-center">
                        <h2 className="text-xl font-bold">Visita nuestros blogs</h2>
                        <p className="mt-2 text-gray-700">La experiencia de nuestra comunidad hará de tu viaje<br /> uno más sorprendente.</p>
                    </div>
                    <div className="self-middle md:self-center z-10">
                        <BotonPrimario text="Blogs" to="/blogs" />
                    </div>
                </div>
            </div>
        </div>
    );
}
