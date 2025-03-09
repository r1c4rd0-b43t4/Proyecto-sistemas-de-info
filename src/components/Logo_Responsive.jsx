import PropTypes from "prop-types";
import React, { useState } from "react";
import property1DefaultLogo from "../assets/Property_1=Default_Logo.svg";
import property1Variant2Logo from "../assets/Property_1=Variant2_Logo.svg";
import property1Variant3Logo from "../assets/Property_1=Variant3_Logo.svg";

export const LogoResponsive = ({ property1, className }) => {
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
        <img
            className={`w-[202px] left-0 top-0 h-11 absolute ${className}`}
            alt="Property default"
            src={currentLogo}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        />
    );
};

LogoResponsive.propTypes = {
    property1: PropTypes.oneOf([
        "default-logo",
        "variant3-logo",
        "variant2-logo",
    ]),
    className: PropTypes.string,
};
