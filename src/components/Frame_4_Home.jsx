import BotonPrimario from "./BotonPrimario";

export default function Frame_5_Home() {
  return (
    <div className="w-screen min-h-screen py-24 bg-white flex flex-col items-center justify-center gap-16 overflow-hidden">
    {/* Si me dejaran poner este div afuera seria una mujer feliz pero dios me odia y react tambien */}
      <div className="w-full max-w-6xl flex flex-col items-center md:items-start gap-8 px-8">
        <div className="max-w-3xl flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <h1 className="text-4xl md:text-6xl font-semibold text-gray-800">
            Conoce <span className="text-orange-600 font-normal">Unimetrail</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Conozca a los exploradores que alimentan nuestra pasión.
          </p>
        </div>
      </div>
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-32 px-8">
        <div className="flex-[1.5] flex flex-col items-center md:items-start gap-12">
          <Feature
            icon={<img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Mensaje.svg" alt="Mensaje" className="w-6 h-6" />}
            title="Blogs, Feedbacks y foros"
            description="Junto a nuestra comunidad, comparte tus experiencias con nosotros dentro de los foros de discusión y feedbacks..."
          />
          <Feature
            icon={<img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Dolar.svg" alt="Dolar" className="w-6 h-6" />}
            title="Fácil reserva y Accesibilidad"
            description="Nuestras rutas propuestas fueron diseñadas para hacer de tu viaje estudiante una experiencia accesible..."
          />
          <Feature
            icon={<img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Click.svg" alt="Click" className="w-6 h-6" />}
            title="A solo click de una nueva aventura"
            description="¿Qué esperas para hacer una reserva?, inicia sesión en nuestra web y solo con unos pequeños pasos tu reserva estará lista."
          />
          <div className="w-full flex justify-center">
            <BotonPrimario text="Iniciar sesión" to="/login"/>
          </div>
        </div>
        <img
          className="hidden md:block flex-1 h-[300px] md:h-[560px] rounded-2xl w-full object-cover"
          src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Imagen_logo_montana.png" 
          alt="Unimetrail"
        />
      </div>
    </div>
  );
}


function Feature({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4 w-full">
      <div className="w-12 h-12 bg-emerald-50 rounded-full ring-8 ring-green-100 flex justify-center items-center">
        {icon}
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
    </div>
  );
}
