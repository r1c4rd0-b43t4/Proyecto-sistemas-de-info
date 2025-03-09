import React from "react";
import BotonPrimario from "./BotonPrimario";

export default function Frame_5_Home() {
    return (
        <div class="w-[1440px] py-24 bg-white inline-flex flex-col justify-start items-center gap-16 overflow-hidden">
            <div class="w-[1280px] flex flex-col justify-start items-start gap-8">
                <div class="self-stretch max-w-[800px] flex flex-col justify-start items-start gap-2">
                    <div class="self-stretch relative justify-start"><span class="text-[#324a38] text-[65px] font-normal font-['Roboto']">Conoce </span><span class="text-[#d76411] text-[65px] font-normal font-['Roboto']">Unimetrail</span></div>
                    <div class="self-stretch relative justify-start text-[#b8babc] text-lg font-normal font-['Fira_Sans'] leading-[27px]">Conozca a los exploradores que alimentan nuestra pasión.</div>
                </div>
            </div>
            <div class="w-[1280px] px-8 inline-flex justify-start items-center gap-16">
                <div class="flex-1 inline-flex flex-col justify-center items-center gap-12">
                    <div class="self-stretch inline-flex justify-start items-start gap-4">
                        <div class="w-12 h-12 bg-emerald-50 rounded-[28px] ring-8 ring-[#d8f8e3] flex justify-center items-center">
                            <div class="w-6 h-6 relative flex flex-col justify-start items-start overflow-hidden">
                                <div class="w-[20.11px] h-5 relative ring-2 ring-[#00796b]"></div>
                            </div>
                        </div>
                        <div class="flex-1 inline-flex flex-col justify-start items-start gap-5">
                            <div class="self-stretch pt-2.5 flex flex-col justify-start items-start gap-2">
                                <div class="self-stretch relative justify-start text-[#0f1728] text-xl font-semibold font-['Inter'] leading-[30px]">Blogs, Feedbacks y foros</div>
                                <div class="self-stretch relative justify-start text-[#475466] text-base font-normal font-['Roboto'] leading-normal">Junto a nuestra comunidad, comparte tus experiencias con nosotros dentro de los foros de discusión y feedbacks, además, podrás encontrar información interesante en blogs creadis por los usuarios donde te ayudaran a mejorar tus viajes al Ávila.</div>
                            </div>
                        </div>
                    </div>
                    <div class="self-stretch inline-flex justify-start items-start gap-4">
                        <div class="w-12 h-12 bg-emerald-50 rounded-[28px] ring-8 ring-[#d8f8e3] flex justify-center items-center">
                            <div class="w-6 h-6 relative flex flex-col justify-start items-start overflow-hidden">
                                <div class="w-5 h-5 relative ring-2 ring-[#00796b]"></div>
                            </div>
                        </div>
                        <div class="flex-1 inline-flex flex-col justify-start items-start gap-5">
                            <div class="self-stretch pt-2.5 flex flex-col justify-start items-start gap-2">
                                <div class="self-stretch relative justify-start text-[#0f1728] text-xl font-semibold font-['Inter'] leading-[30px]">Fácil reserva y Accesibilidad</div>
                                <div class="self-stretch relative justify-start text-[#475466] text-base font-normal font-['Roboto'] leading-normal">Nuestras rutas propuestas fueron diseñadas para hacer de tu viaje estudiante, uno donde los costos estén ajustados a tí, a modo de que la reserva sea la menor de tus tareas para empezar tu aventura lo antes posible y de forma segura.</div>
                            </div>
                        </div>
                    </div>
                    <div class="self-stretch inline-flex justify-start items-start gap-4">
                        <div class="w-12 h-12 bg-emerald-50 rounded-[28px] ring-8 ring-[#d8f8e3] flex justify-center items-center">
                            <div class="w-6 h-6 relative flex flex-col justify-start items-start overflow-hidden">
                                <div class="w-[19.01px] h-[19px] relative ring-2 ring-[#00796b]"></div>
                            </div>
                        </div>
                        <div class="flex-1 inline-flex flex-col justify-start items-start gap-5">
                            <div class="self-stretch pt-2.5 flex flex-col justify-start items-start gap-2">
                                <div class="self-stretch relative justify-start text-[#0f1728] text-xl font-semibold font-['Inter'] leading-[30px]">A solo click de una nueva aventura</div>
                                <div class="self-stretch relative justify-start text-[#475466] text-base font-normal font-['Roboto'] leading-normal">¿Qué esperas para hacer una reserva?, inicia sesión en nuestra web y solo con unos pequeños pasos tu reserva estará lista.</div>
                            </div>
                        </div>
                    </div>
                    <div data-estado="Enable" class="max-w-[420px] bg-[#00796b] rounded-lg inline-flex justify-center items-center gap-[15px] flex-wrap content-center overflow-hidden">
                        <div class="h-[53px] min-w-[140px] p-4 flex justify-center items-center gap-4">
                            <div class="p-[5px] flex justify-center items-center gap-2.5">
                                <BotonPrimario text={"Iniciar Sesión"}/>
                            </div>
                        </div>
                    </div>
                </div>
                <img class="flex-1 h-[560px] relative rounded-2xl" src="https://placehold.co/576x560" />
            </div>
        </div>
    
        );
    }