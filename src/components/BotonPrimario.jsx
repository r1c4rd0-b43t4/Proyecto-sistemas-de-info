import React from "react";
import { Link } from "react-router"; 

export default function BotonPrimario({ text, to, onClick, ...rest }) {
  const className = "px-4 py-2 bg-teal-700 text-white hover:bg-teal-600 active:bg-teal-800 whitespace-nowrap rounded-xl transition-colors";

  if (to) {
    return (
      <Link 
        to={to} 
        className={className}
        {...rest}
      >
        {text}
      </Link>
    );
  }

  return (
    <button 
      className={className}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
}
