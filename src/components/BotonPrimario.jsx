import React from "react";
import { Link } from "react-router"; 

export default function BotonPrimario({ text, to, onClick, className, ...rest }) {
  const baseStyles = `px-4 py-2 bg-teal-700 text-white hover:bg-teal-600 active:bg-teal-800 rounded-xl transition-colors ${className || ''}`;

  if (to) {
    return (
      <Link 
        to={to} 
        className={baseStyles}
        {...rest}
      >
        {text}
      </Link>
    );
  }

  return (
    <button 
      className={baseStyles}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
}
