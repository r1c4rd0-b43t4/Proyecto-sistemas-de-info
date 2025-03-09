import React from "react";
import { TarjetaRuta } from "./TarjetaRuta";
import BotonSecundario from "./BotonSecundario";
import BotonPrimario from "./BotonPrimario";

export function DescubreRutas() {
    return (
        <div className="p-8">
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-start mb-6 w-full max-w-5xl">
                    <div className="flex items-center mb-0">
                        <h1 className="text-5xl font-bold text-green-800 leading-[76px]">Descubre nuestras</h1>
                        <h1 className="text-5xl font-bold text-orange-500 ml-2 leading-[76px]">rutas</h1>
                    </div>
                    <p className="text-[#77878F] mt-0">explora nuevas aventuras</p>
                </div>
                <div className="flex justify-center space-x-8 mb-8 w-full max-w-5xl">
                    <TarjetaRuta nombreRuta="Ruta 1" precio={100} inicio="Punto A" tiempo={2} distancia={10} dificultad={"Jodido"} />
                    <TarjetaRuta nombreRuta="Ruta 2" precio={200} inicio="Punto B" tiempo={1} distancia={7} dificultad={"Ez"} />
                    <TarjetaRuta nombreRuta="Ruta 3" precio={300} inicio="Punto C" tiempo={0.5} distancia={5} dificultad={"zzz"} />
                </div>
                <BotonSecundario text={"Ver más"} />
            </div>
            <div className="flex justify-center mt-8">
                <div className="bg-white py-12 px-6 shadow-lg rounded-lg flex items-center space-x-4 w-full max-w-5xl">
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold text-black">Visita nuestros blogs</h1>
                        <p className="text-[#77878F] mt-2">La experiencia de nuestra comunidad hará de tu viaje uno más sorprendente.</p>
                    </div>
                    <BotonPrimario text={"Blogs Feed"} />
                </div>
            </div>
        </div>
    );
}