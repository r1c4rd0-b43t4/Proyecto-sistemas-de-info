import React from "react";
import { Link } from "react-router";

export default function BotonPrimario({ text, to }) {
  return (
    <Link to={to}>
      <button className="px-4 py-2 bg-teal-700 text-white hover:bg-teal-600 active:bg-teal-800 whitespace-nowrap rounded-xl" type="button">
        {text}
      </button>
    </Link>
  );
}
