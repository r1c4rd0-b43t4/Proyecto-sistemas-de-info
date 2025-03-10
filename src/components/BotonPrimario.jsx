import React from "react";
import { Link } from "react-router";

export default function BotonPrimario({ text, to  }) {


if(to){
  return (
    <Link to={to} className="px-4 py-2 bg-teal-700 text-white hover:bg-teal-600 active:bg-teal-800 whitespace-nowrap rounded-xl">
      {text}
    </Link>
  );
}

  return (


      
      
      <button className="px-4 py-2 bg-teal-700 text-white hover:bg-teal-600 active:bg-teal-800 whitespace-nowrap rounded-xl" >
        {text}
      </button>
   

  );
}
