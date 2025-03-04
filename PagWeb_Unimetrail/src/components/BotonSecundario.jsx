import React from "react";

export default function BotonSecundario({text}) {
  return (
    <button className="px-4 py-2 border-2 border-teal-700 text-teal-700 rounded hover:bg-teal-600 hover:text-white active:bg-teal-800 active:text-white whitespace-nowrap rounded-xl">
      {text}
    </button>
  );
}