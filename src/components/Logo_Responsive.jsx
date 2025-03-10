import PropTypes from "prop-types";
import React, { useState } from "react";
import property1DefaultLogo from "../assets/Property_1=Default_Logo.svg";
import property1Variant2Logo from "../assets/Property_1=Variant2_Logo.svg";
import property1Variant3Logo from "../assets/Property_1=Variant3_Logo.svg";
import { Link } from "react-router";

// Quite el position absolute porque no se necesita juasjuas
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
