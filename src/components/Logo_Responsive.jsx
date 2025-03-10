import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router";


const property1DefaultLogo = "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Property_1=Default_Logo.svg";
const property1Variant2Logo = "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Property_1=Variant2_Logo.svg";
const property1Variant3Logo = "https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Property_1=Variant3_Logo.svg";


export const LogoResponsive = ({ className }) => {
    const [currentLogo, setCurrentLogo] = useState(property1DefaultLogo);

    const handleMouseEnter = () => {
        setCurrentLogo(property1Variant2Logo);
    };

    const handleMouseLeave = () => {
        setCurrentLogo(property1DefaultLogo);
    };

    const handleMouseDown = () => {
        setCurrentLogo(property1Variant3Logo);
    };

    const handleMouseUp = () => {
        setCurrentLogo(property1Variant2Logo);
    };

    return (
        <Link to="/">
            <img
                className={`w-[150px] md:w-[202px] max-w-[180px] md:max-w-[202px] ${className}`}
                alt="Logo Unimetrail"
                src={currentLogo}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            />
        </Link>
    );
};

LogoResponsive.propTypes = {
    className: PropTypes.string,
};
