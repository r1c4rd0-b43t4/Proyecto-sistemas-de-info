import React from "react";

export default function BotonPrimario({text}) {
  return (
    <button className="w-36 h-12 bg-teal-700 text-white rounded hover:bg-teal-600 active:bg-teal-800">
      {text}
    </button>
  );
}
