import PropTypes from "prop-types";
import React from "react";
import { LogoResponsive } from "./Logo_Responsive.jsx";

export const Header = ({ property1 }) => {
  return (
    <div className="w-[1440px] h-[92px] bg-white">
      <div className="flex flex-col w-[1440px] items-center justify-center px-20 py-4 relative shadow-shadow-xxsmall">
        <div className="flex flex-col w-[1376px] items-center justify-center relative flex-[0_0_auto] ml-[-48.00px] mr-[-48.00px]">
          <div className="flex w-[1376px] items-center justify-between relative flex-[0_0_auto]">
            <div className="flex items-center justify-end gap-4 relative flex-1 grow">
              <div className="flex w-[1020px] items-center gap-4 pl-10 pr-0 py-0 relative rounded-lg">
                <LogoResponsive className="!relative !w-[201.72px] !h-[43.62px]" />
                <button className="all-[unset] box-border inline-flex items-center justify-center gap-1 px-4 py-2 relative flex-[0_0_auto] rounded overflow-hidden">
                  <div className="relative w-fit mt-[-1.00px] font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#005047] text-[length:var(--text-xl-regular-font-size)] text-center tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] whitespace-nowrap [font-style:var(--text-xl-regular-font-style)]">
                    Rutas
                  </div>
                </button>
                <div className="relative w-0.5 h-7 bg-[#00796b] rounded" />
                <button className="all-[unset] box-border inline-flex items-center justify-center gap-1 px-4 py-2 relative flex-[0_0_auto] rounded overflow-hidden">
                  <div className="relative w-fit font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#005047] text-[length:var(--text-xl-regular-font-size)] tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] whitespace-nowrap [font-style:var(--text-xl-regular-font-style)]">
                    Galería
                  </div>
                </button>
                <div className="relative w-0.5 h-7 bg-[#00796b] rounded" />
                <button className="all-[unset] box-border inline-flex items-center justify-center gap-2 px-4 py-2 relative flex-[0_0_auto] rounded overflow-hidden">
                  <div className="relative w-fit mt-[-1.00px] font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#005047] text-[length:var(--text-xl-regular-font-size)] tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] whitespace-nowrap [font-style:var(--text-xl-regular-font-style)]">
                    Reseñas
                  </div>
                </button>
                <div className="relative w-0.5 h-7 bg-[#00796b] rounded" />
                <button className="all-[unset] box-border inline-flex items-center justify-center gap-1 px-4 py-2 relative flex-[0_0_auto] rounded overflow-hidden">
                  <div className="relative w-fit mt-[-1.00px] font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#005047] text-[length:var(--text-xl-regular-font-size)] tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] whitespace-nowrap [font-style:var(--text-xl-regular-font-style)]">
                    Blogs
                  </div>
                </button>
              </div>
              <button className="all-[unset] box-border inline-flex items-center justify-center gap-2.5 px-8 py-4 relative flex-[0_0_auto] bg-primary60-base rounded-[80px] overflow-hidden shadow-shadow-xsmall">
                <div className="relative w-fit mt-[-1.00px] font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-grey-10 text-[length:var(--text-xl-regular-font-size)] text-center tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] whitespace-nowrap [font-style:var(--text-xl-regular-font-style)]">
                  Iniciar sesión
                </div>
              </button>
              <button className="all-[unset] box-border inline-flex items-center justify-center gap-1 px-4 py-2 relative flex-[0_0_auto] rounded overflow-hidden">
                <div className="relative w-fit mt-[-1.00px] font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-primary-40 text-[length:var(--text-xl-regular-font-size)] tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] whitespace-nowrap [font-style:var(--text-xl-regular-font-style)]">
                  Registrarse
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  property1: PropTypes.oneOf(["default"]),
};


