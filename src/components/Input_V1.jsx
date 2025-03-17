import React from 'react'

export default function Input({ titulo, placeholder, type, name = '', value, onChange}) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold text-[#00796B] mb-1">
        {titulo}
      </label>    
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-auto
          border border-gray-300
          rounded-md
          p-2
          focus:border-[#00796B]
          focus:ring-2 
          focus:ring-[#00796B]
          focus:ring-opacity-50
          transition-all
          duration-150
          outline-none
        `}
      />
    </div>
  )
}

