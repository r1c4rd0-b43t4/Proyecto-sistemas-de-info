import React from "react";
import { TarjetaRuta } from "./TarjetaRuta";
import BotonSecundario from "./BotonSecundario";
import BotonPrimario from "./BotonPrimario";
import Humboldt from "../assets/Humboldt.svg";
import Caracas from "../assets/Caracas.svg";

export default function Frame_3_Home() {
    return (
        <div className="w-screen h-full bg-white text-black">
            <div className="px-5 py-20 flex flex-col justify-start items-start h-full w-screen gap-2">
                <div className="flex flex-col items-start mb-6 w-full">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-0">
                            <h1 className="text-5xl font-bold text-green-800 leading-[76px]">Descubre nuestras</h1>
                            <h1 className="text-5xl font-bold text-orange-500 ml-2 leading-[76px]">rutas</h1>
                        </div>
                        <div className="mt-4">
                            <p className="text-lg text-gray-700">Explora nuevas aventuras y descubre rutas inolvidables.</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center w-full'>
                    <div className='grid gap-30 w-full' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                        <div className='p-5 rounded-lg flex flex-col justify-between'>
                            <TarjetaRuta nombreRuta="Ruta 2" precio={200} inicio="Punto B" tiempo={1} distancia={7} dificultad={"Ez"} icono={Humboldt} />
                        </div>
                        <div className='p-5 rounded-lg flex flex-col'>
                            <TarjetaRuta nombreRuta="Ruta 3" precio={300} inicio="Punto C" tiempo={0.5} distancia={5} dificultad={"zzz"} icono={Humboldt} />
                        </div>
                        <div className='p-5 rounded-lg flex flex-col'>
                            <TarjetaRuta nombreRuta="Ruta 4" precio={400} inicio="Punto D" tiempo={2} distancia={10} dificultad={"Ez"} icono={Humboldt} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full mt-6">
                    <BotonSecundario text="Ver más" />
                </div>
                <div className="w-full mt-6 flex justify-center items-center relative">
                    <img src={Caracas} alt="Avila Background" className="w-full h-auto object-contain" />
                </div>
            </div>
            <div className="flex justify-center w-full mt-0">
                <div className="p-5 bg-white rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center w-full md:w-3/4 h-48 md:h-64">
                    <div className="self-start md:self-center mb-4 md:mb-0">
                        <h2 className="text-xl font-bold">Visita nuestros blogs</h2>
                        <p className="mt-2 text-gray-700">La experiencia de nuestra comunidad hará de tu viaje<br /> uno más sorprendente.</p>
                    </div>
                    <div className="self-start md:self-center z-10">
                        <BotonPrimario text="Acción" />
                    </div>
                </div>
            </div>
        </div>
    );
}