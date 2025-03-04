import React from "react";

export default function BotonPrimario({ text }) {
  return (
    <button className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-600 active:bg-teal-800 whitespace-nowrap">
      {text}
    </button>
  );
}
