import React from "react";
import TarjetaGuia from "./TarjetaGuia";

export default function Frame_5_Home() {
    return (
        <div className="min-h-screen w-screen flex flex-col justify-start items-center bg-[#f3f3f3] overflow-hidden ">
            {/* Título y descripción */}
            <div className="w-full flex flex-col justify-start items-center gap-8 md:gap-16 py-12 md:py-24">
                <div className="w-full flex justify-center items-start">
                    <div className="w-full max-w-[800px] flex flex-col justify-start items-start gap-2 px-4 md:px-20">
                        <h1 className="text-center text-4xl md:text-[65px] font-normal">
                            <span className="text-[#00796b]">Conoce a nuestros </span>
                            <span className="text-[#d76411]">Guías principales</span>
                        </h1>
                        <p className="text-center text-[#b8babc] text-lg md:text-xl font-normal leading-7 md:leading-[30px]">
                            Aquellos que se preparan para hacer de tu experiencia una inolvidable.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tarjetas de guías */}
            <div className="w-full flex-grow flex flex-col justify-center items-center px-4 md:px-[101px]">
                <div className="w-full max-w-[1440px] flex justify-center items-center gap-4 md:gap-[100px] flex-wrap">
                    {/* La idea es hacer que estas tarjetas se vinculen despues con los guias que esten disponibles */}
                    {/* Tarjeta 1 */}
                    <TarjetaGuia
                        imagen="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Miguel_Moreno.png"
                        nombre="Miguel Moreno"
                        rol="Experto en senderismo"
                    />

                    {/* Tarjeta 2 */}
                    <TarjetaGuia
                        imagen="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Nohemi_Rangel.png"
                        nombre="Nohemi Rangel"
                        rol="Amante de la naturaleza"
                    />

                    {/* Tarjeta 3 */}
                    <TarjetaGuia
                        imagen="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Javier_Tovar.png"
                        nombre="Javier Tovar"
                        rol="Experto en supervivencia"
                    />

                    {/* Tarjeta 4 */}
                    <TarjetaGuia
                        imagen="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Elena_Sanchez.png"
                        nombre="Elena Sanchez"
                        rol="Montañista excepcional"
                    />
                </div>
            </div>
            <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Avila_Vector_BG.svg" alt="Vector_Avila_SVG" className="relative w-screen bottom-0" />
        </div>
    );
}