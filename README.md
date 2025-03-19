Unimetrail - Plataforma de Rutas de Senderismo
Descripción del Proyecto
Unimetrail es una aplicación web diseñada para conectar a entusiastas del senderismo con guías profesionales y rutas exclusivas. La plataforma permite a los usuarios explorar, reservar y comprar rutas de senderismo, así como compartir experiencias a través de blogs y reseñas.

Características Principales
Catálogo de Rutas: Explora rutas de senderismo con detalles como dificultad, distancia, tiempo y ubicación.
Sistema de Reservas: Reserva y paga rutas con integración de PayPal.
Perfiles de Usuario: Gestiona tu perfil, visualiza tus rutas compradas y deja reseñas.
Blog: Comparte experiencias, consejos y fotografías de tus aventuras.
Galería de Imágenes: Explora fotografías de las rutas y paisajes.
Panel de Administración: Gestiona usuarios, rutas, blogs y contenido del sitio.
Roles de Usuario: Diferentes niveles de acceso para clientes, guías y administradores.
Tecnologías Utilizadas
Frontend: React.js, Tailwind CSS
Backend: Firebase (Firestore, Authentication)
Almacenamiento: Supabase Storage
Pagos: PayPal API
Despliegue: Vercel

Instalación y Configuración
Clonar el repositorio:
git clone https://github.com/tu-usuario/Proyecto-sistemas-de-info.git
cd Proyecto-sistemas-de-info

Instalar dependencias

npm install

Configurar variables de entorno Crea un archivo .env en la raíz del proyecto con las siguientes variables:

REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=tu_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=tu_app_id
REACT_APP_SUPABASE_URL=tu_supabase_url
REACT_APP_SUPABASE_ANON_KEY=tu_supabase_anon_key
REACT_APP_PAYPAL_CLIENT_ID=tu_paypal_client_id

Iniciar la aplicación en modo desarrollo

npm run dev

Estructura del Proyecto
/src: Código fuente de la aplicación
/components: Componentes reutilizables
/Context: Contextos de React (UserContext, etc.)
/pages: Páginas principales de la aplicación
/assets: Recursos estáticos (imágenes, iconos, etc.)
Flujo de Usuario
Registro/Inicio de Sesión: Los usuarios pueden registrarse utilizando correo electrónico o Google.
Exploración: Los usuarios pueden navegar por el catálogo de rutas disponibles.
Compra: Los usuarios pueden reservar rutas mediante pago con PayPal.
Gestión: Los usuarios pueden ver sus rutas adquiridas y participar dejando reseñas.
Comunidad: Los usuarios pueden compartir experiencias a través del blog.
Roles de Usuario
Cliente: Puede explorar rutas, realizar compras y dejar reseñas.
Guía: Puede gestionar sus propias rutas y confirmar eventos.
Administrador: Tiene acceso completo para gestionar usuarios, rutas, blogs y contenido.
Integración con PayPal
La aplicación utiliza la API de PayPal para procesar pagos de manera segura. Para pruebas, se incluyen botones que simulan transacciones exitosas y fallidas.

Despliegue
La aplicación está configurada para desplegarse en Vercel. Para realizar el despliegue:

npm run build
vercel --prod

Contribución
Haz un fork del repositorio
Crea una rama para tu característica (git checkout -b feature/nueva-caracteristica)
Realiza tus cambios y haz commit (git commit -m 'Añadir nueva característica')
Sube tus cambios (git push origin feature/nueva-caracteristica)
Abre un Pull Request
Autores
Rene Barillas
Gustavo Hernández
Sebastián Puertas
Daniel Hernández
Tomás Hernández
Licencia
Este proyecto está bajo la Licencia MIT - consulta el archivo LICENSE.md para más detalles.

React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

@vitejs/plugin-react uses Babel for Fast Refresh
@vitejs/plugin-react-swc uses SWC for Fast Refresh
© 2023 Unimetrail. Todos los derechos reservados.