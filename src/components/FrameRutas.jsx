import React from 'react';
import TarjetaRuta from './TarjetaRuta';
import Humboldt from '../assets/humboldt.svg';

const FrameRutas = () => {
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
                <div className='p-5 rounded-lg flex flex-col justify-between'>
                    <TarjetaRuta nombreRuta="Ruta 2" precio={200} inicio="Punto B" tiempo={1} distancia={7} dificultad={"Ez"} icono={Humboldt} />
                </div>
                <div className='p-5 rounded-lg flex flex-col'>
                    <TarjetaRuta nombreRuta="Ruta 3" precio={300} inicio="Punto C" tiempo={0.5} distancia={5} dificultad={"zzz"} icono={Humboldt} />
                </div>
                <div className='p-5 rounded-lg flex flex-col'>
                    <TarjetaRuta nombreRuta="Ruta 4" precio={400} inicio="Punto D" tiempo={2} distancia={10} dificultad={"gg"} icono={Humboldt} />
                </div>
                <div className='p-5 rounded-lg flex flex-col'>
                    <TarjetaRuta nombreRuta="Ruta 5" precio={500} inicio="Punto E" tiempo={3} distancia={15} dificultad={"GG"} icono={Humboldt} />
                </div>
                <div className='p-5 rounded-lg flex flex-col'>
                    <TarjetaRuta nombreRuta="Ruta 6" precio={600} inicio="Punto F" tiempo={4} distancia={20} dificultad={"Dios mío"} icono={Humboldt} />
                </div>
                <div className='p-5 rounded-lg flex flex-col'>
                    <TarjetaRuta nombreRuta="Ruta 7" precio={600} inicio="Punto G (Quevedo)" tiempo={100} distancia={"∞"} dificultad={"Extreme Demon"} icono={Humboldt} />
                </div>
            </div>
        </div>
    </div>
  );
};

export default FrameRutas;