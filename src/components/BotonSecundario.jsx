import React from "react";
import { Link } from "react-router";

export default function BotonSecundario({ text, to }) {
  return (
    <Link to={to}>
      <button className="px-4 py-2 border-2 border-teal-700 text-teal-700 hover:bg-teal-600 hover:text-white active:bg-teal-800 active:text-white whitespace-nowrap rounded-xl" type="button">
        {text}
      </button>
    </Link>
  );
}
