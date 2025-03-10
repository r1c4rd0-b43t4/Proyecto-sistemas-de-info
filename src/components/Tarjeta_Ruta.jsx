import React from "react";
import { BotonPrimario } from "./BotonPrimario";
import { Clock } from "../assets/Clock.svg";
import { MapPin } from "../assets/MapPin.svg";
import { Path } from "../assets/Path.svg";
import { PersonSimpleHike } from "../assets/PersonSimpleHike.svg";
import { Star } from "../assets/Star.svg";

export const TarjetaRuta = () => {
    return (
        <div className="inline-flex flex-col items-start relative">
            <div className="flex flex-col w-[400px] h-[493px] items-start gap-6 p-6 relative bg-grey-20 rounded-[20px] border border-solid border-[#ebebeb]">
                <div className="relative w-[350px] h-[300px] rounded-[10px] overflow-hidden bg-amber-50 bg-cover bg-[50%_50%]">
                    <div className="inline-flex items-center gap-2.5 pt-0.5 pb-1 px-2.5 relative top-[260px] left-4 bg-neutral-100 rounded-[40px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
                        <div className="relative w-fit mt-[-1.00px] font-text-xs-medium font-[number:var(--text-xs-medium-font-weight)] text-black text-[length:var(--text-xs-medium-font-size)] text-center tracking-[var(--text-xs-medium-letter-spacing)] leading-[var(--text-xs-medium-line-height)] whitespace-nowrap [font-style:var(--text-xs-medium-font-style)]">
                            Fecha:20/04/2025
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative self-stretch mt-[-1.00px] font-heading-4-semibold font-[number:var(--heading-4-semibold-font-weight)] text-grey-90 text-[length:var(--heading-4-semibold-font-size)] tracking-[var(--heading-4-semibold-letter-spacing)] leading-[var(--heading-4-semibold-line-height)] [font-style:var(--heading-4-semibold-font-style)]">
                        Nombre de la ruta
                    </div>

                    <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                            <MapPin className="!relative !w-5 !h-5" color="#424242" />
                            <div className="relative w-fit mt-[-1.00px] font-text-lg-regular font-[number:var(--text-lg-regular-font-weight)] text-grey-80 text-[length:var(--text-lg-regular-font-size)] tracking-[var(--text-lg-regular-letter-spacing)] leading-[var(--text-lg-regular-line-height)] whitespace-nowrap [font-style:var(--text-lg-regular-font-style)]">
                                Punto de inicio:
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="inline-flex items-center gap-[95px] absolute top-[409px] left-6">
                <div className="inline-flex flex-col items-start gap-[5px] relative flex-[0_0_auto]">
                    <div className="relative self-stretch w-full h-8">
                        <div className="inline-flex items-end gap-1 relative">
                            <div className="relative w-fit mt-[-1.00px] font-heading-4-semibold font-[number:var(--heading-4-semibold-font-weight)] text-[#d76411] text-[length:var(--heading-4-semibold-font-size)] tracking-[var(--heading-4-semibold-letter-spacing)] leading-[var(--heading-4-semibold-line-height)] whitespace-nowrap [font-style:var(--heading-4-semibold-font-style)]">
                                $ 20
                            </div>

                            <div className="relative w-[82px] font-text-lg-medium font-[number:var(--text-lg-medium-font-weight)] text-grey-70 text-[length:var(--text-lg-medium-font-size)] tracking-[var(--text-lg-medium-letter-spacing)] leading-[var(--text-lg-medium-line-height)] [font-style:var(--text-lg-medium-font-style)]">
                                /reserva
                            </div>
                        </div>
                    </div>

                    <div className="relative w-[114px] h-4">
                        <div className="inline-flex items-start absolute top-0 left-0">
                            <Star className="!relative !w-4 !h-4" />
                            <Star className="!relative !w-4 !h-4" />
                            <Star className="!relative !w-4 !h-4" />
                            <Star className="!relative !w-4 !h-4" />
                            <Star className="!relative !w-4 !h-4" />
                        </div>

                        <div className="absolute -top-px left-[84px] font-body-tiny-400 font-[number:var(--body-tiny-400-font-weight)] text-gray-500 text-[length:var(--body-tiny-400-font-size)] tracking-[var(--body-tiny-400-letter-spacing)] leading-[var(--body-tiny-400-line-height)] whitespace-nowrap [font-style:var(--body-tiny-400-font-style)]">
                            (423)
                        </div>
                    </div>
                </div>

                <BotonPrimario
                    CTAClassName="!text-xl"
                    botNReservaClassName="!mt-[-7.50px] !mb-[-7.50px]"
                    className="!h-[38px] !flex !w-[140px]"
                    estado="enable"
                    text="Conocer"
                    textContainerClassName="!mt-[-6.00px] !mb-[-6.00px]"
                />
            </div>

            <div className="inline-flex items-center gap-5 p-2.5 absolute top-5 left-12 bg-neutral-100 rounded-[0px_0px_10px_10px] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
                <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                    <Clock className="!relative !w-4 !h-4" color="#757575" />
                    <div className="relative w-fit mt-[-1.00px] font-text-md-semibold font-[number:var(--text-md-semibold-font-weight)] text-[#757575] text-[length:var(--text-md-semibold-font-size)] tracking-[var(--text-md-semibold-letter-spacing)] leading-[var(--text-md-semibold-line-height)] whitespace-nowrap [font-style:var(--text-md-semibold-font-style)]">
                        Tiempo
                    </div>
                </div>

                <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                    <PersonSimpleHike className="!relative !w-4 !h-4" />
                    <div className="relative w-fit mt-[-1.00px] font-text-md-semibold font-[number:var(--text-md-semibold-font-weight)] text-[#757575] text-[length:var(--text-md-semibold-font-size)] tracking-[var(--text-md-semibold-letter-spacing)] leading-[var(--text-md-semibold-line-height)] whitespace-nowrap [font-style:var(--text-md-semibold-font-style)]">
                        Difucultad
                    </div>
                </div>

                <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                    <Path className="!relative !w-4 !h-4" color="#757575" />
                    <div className="relative w-fit mt-[-1.00px] font-text-md-semibold font-[number:var(--text-md-semibold-font-weight)] text-[#757575] text-[length:var(--text-md-semibold-font-size)] tracking-[var(--text-md-semibold-letter-spacing)] leading-[var(--text-md-semibold-line-height)] whitespace-nowrap [font-style:var(--text-md-semibold-font-style)]">
                        Distancia
                    </div>
                </div>
            </div>
        </div>
    );
};

