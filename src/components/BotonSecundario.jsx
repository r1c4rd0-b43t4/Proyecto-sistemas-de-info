import React from "react";
import { Link } from "react-router";

export default function BotonSecundario({ text, to, onClick, className, ...rest }) {
  const baseStyles = `px-4 py-2 border-2 border-teal-700 text-teal-700 rounded-xl whitespace-nowrap transition-colors hover:bg-teal-600 hover:border-teal-600 hover:text-white active:bg-teal-800 active:border-teal-800 ${className || ''}`;

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
      type="button"
      {...rest}
    >
      {text}
    </button>
  );
}