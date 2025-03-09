import React from "react";

export default function BotonPrimario({ text, type }) {
  return (
    <button className="px-4 py-2 bg-teal-700 text-white hover:bg-teal-600 active:bg-teal-800 whitespace-nowrap rounded-xl" type={type}>
      {text}
    </button>
  );
}
