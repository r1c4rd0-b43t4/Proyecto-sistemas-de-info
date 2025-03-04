import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";

export const BotonSecundario = ({ estado, className, nombre }) => {
    const [state, dispatch] = useReducer(reducer, {
        estado: estado || "enable",
    });

    return (
        <div
            className={`inline-flex flex-wrap items-center max-w-[420px] gap-[15px_15px] justify-center relative ${state.estado === "hovered" ? "opacity-60" : ""} ${state.estado === "hovered" ? "bg-white" : ""} ${className}`}
            onMouseLeave={() => {
                dispatch("mouse_leave");
            }}
            onMouseEnter={() => {
                dispatch("mouse_enter");
            }}
        >
            <div
                className={`border border-solid border-[#00796b] min-w-[140px] inline-flex items-center gap-[5px] flex-[0_0_auto] px-[25px] py-[15px] h-[53px] rounded-lg justify-center relative ${state.estado === "hovered" ? "[background:linear-gradient(180deg,rgb(255,255,255)_8.5%,rgb(153,153,153)_90%)]" : (state.estado === "pressed") ? "[background:linear-gradient(180deg,rgb(255,255,255)_0%,rgb(153,153,153)_0.01%)]" : ""}`}
            >
                <div className="inline-flex mt-[-8.00px] items-center gap-2.5 flex-[0_0_auto] p-[5px] justify-center mb-[-8.00px] relative">
                    <button className="all-[unset] box-border [font-family:'Roboto-Regular',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-[25px] text-[#00796b] font-normal text-center whitespace-nowrap leading-[normal] relative">
                        {nombre}
                    </button>
                </div>
            </div>
        </div>
    );
};

function reducer(state, action) {
    switch (action) {
        case "mouse_enter":
            return {
                ...state,
                estado: "hovered",
            };

        case "mouse_leave":
            return {
                ...state,
                estado: "enable",
            };

        case "mouse_press":
            return {
                ...state,
                estado: "pressed",
            };

        default:
            return state;
    }
}

BotonSecundario.propTypes = {
    estado: PropTypes.oneOf(["hovered", "enable", "pressed"]),
    className: PropTypes.string,
    nombre: PropTypes.string.isRequired,
};

// Ejemplo de uso del componente
// <BotonSecundario className="!left-5 !absolute !top-[239px]" estado="enable" nombre="Texto" />;