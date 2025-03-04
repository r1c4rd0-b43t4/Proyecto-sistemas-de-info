import React from "react";

export default function BotonFooter({ text , link }) {
  return (
     <a href = {link}className="px-4 py-2 text-white rounded hover:underline active:underline whitespace-nowrap">{text}</a>
  );
}
