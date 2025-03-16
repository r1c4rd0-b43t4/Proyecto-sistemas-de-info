import React from "react";
import { Link } from "react-router";

export default function BotonFooter({ text , link }) {
  return (
     <Link to = {link}className="px-4 py-2 text-white rounded hover:underline active:underline whitespace-nowrap">{text}</Link>
  );
}
