import React from "react";

const ContactForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen mt-20">
      <div className="flex flex-col lg:flex-row px-4 md:px-8 lg:px-12 py-10 gap-6 md:gap-8 lg:gap-10 w-full max-w-7xl">
        {/* Sección del formulario */}
        <div className="flex-1 p-6 md:p-8 lg:p-10 bg-neutral-100 rounded-2xl flex flex-col gap-6 md:gap-8">
          <div className="w-full flex flex-col gap-4 text-center lg:text-left">
            <h2 className="text-neutral-700 text-2xl md:text-3xl lg:text-4xl font-semibold">
              ¿Alguna pregunta? Escríbenos
            </h2>
            <p className="text-neutral-500 text-base">
              Rellena el siguiente formulario:
            </p>
          </div>

          <div className="w-full flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-3">
                <label className="text-neutral-700 text-sm font-semibold">
                  Nombre
                </label>
                <input
                  className="w-full px-3 py-3 bg-white rounded-lg text-stone-500 text-base"
                  placeholder="Nombre"
                />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <label className="text-neutral-700 text-sm font-semibold">
                  Apellido
                </label>
                <input
                  className="w-full px-3 py-3 bg-white rounded-lg text-stone-500 text-base"
                  placeholder="Apellido"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-neutral-700 text-sm font-semibold">
                E-mail
              </label>
              <input
                className="w-full px-3 py-3 bg-white rounded-lg text-stone-500 text-base"
                placeholder="@ejemplo.com"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-neutral-700 text-sm font-semibold">
                Teléfono
              </label>
              <input
                className="w-full px-3 py-3 bg-white rounded-lg text-stone-500 text-base"
                placeholder="+58 412 1234567"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-neutral-700 text-sm font-semibold">
                Título
              </label>
              <select className="w-full px-3 py-3 bg-white rounded-lg text-stone-500 text-base">
                <option>Titulo del mensaje</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-neutral-700 text-sm font-semibold">
                Mensaje
              </label>
              <textarea
                className="w-full px-3 py-3 bg-white rounded-lg text-stone-500 text-base h-28"
                placeholder="Dejanos un mensaje..."
              ></textarea>
            </div>
          </div>

          <button className="w-full md:w-auto px-6 py-3 bg-teal-700 text-neutral-50 text-lg md:text-xl font-medium rounded-full shadow-md hover:bg-teal-800 transition-all">
            Enviar mensaje
          </button>
        </div>

        {/* Sección de información de contacto */}
        <div className="flex-1 flex flex-col">
          <div className="h-48 md:h-56 lg:h-64 bg-teal-600 rounded-t-2xl flex items-center justify-center text-center px-6">
            <h2 className="text-neutral-50 text-2xl md:text-3xl lg:text-4xl font-semibold">
              Te contactaremos lo antes posible
            </h2>
          </div>
          <div className="p-6 md:p-8 lg:p-10 bg-neutral-100 rounded-b-2xl flex flex-col gap-6 md:gap-8">
            <div className="p-4 md:p-6 bg-slate-300 rounded-lg flex gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-50 flex items-center justify-center rounded-full">
                📧
              </div>
              <div>
                <p className="text-neutral-800 text-base font-semibold">
                  Email
                </p>
                <p className="text-neutral-500 text-base">
                  support@unimetrail.com
                </p>
              </div>
            </div>
            <div className="p-4 md:p-6 bg-slate-300 rounded-lg flex gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-50 flex items-center justify-center rounded-full">
                📞
              </div>
              <div>
                <p className="text-neutral-800 text-base font-semibold">
                  Telefono
                </p>
                <p className="text-neutral-500 text-base">+1 (800) 555-1234</p>
              </div>
            </div>
            <div className="p-4 md:p-6 bg-slate-300 rounded-lg flex gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-50 flex items-center justify-center rounded-full">
                📍
              </div>
              <div>
                <p className="text-neutral-800 text-base font-semibold">
                  Dirección
                </p>
                <p className="text-neutral-500 text-base">
                  123 Calle Principal, Ciudad, País
                </p>
              </div>
            </div>
            <div className="p-4 md:p-6 bg-slate-300 rounded-lg flex gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-50 flex items-center justify-center rounded-full">
                ⏰
              </div>
              <div>
                <p className="text-neutral-800 text-base font-semibold">
                  Horario
                </p>
                <p className="text-neutral-500 text-base">
                  Lunes - Viernes: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
