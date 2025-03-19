import { useState, useEffect } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import BotonPrimario from './BotonPrimario';
import BotonSecundario from './BotonSecundario';
import { useNavigate } from 'react-router';
import { supabase } from '../../supabaseClient';

export default function Frame_EditUser() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    sobreMi: '',
    fotoURL: ''
  });
  
  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const verificarAutenticacion = () => {
      if (!auth.currentUser) {
        navigate('/login');
        return;
      }
      cargarDatosUsuario();
    };

    verificarAutenticacion();
  }, []);

  useEffect(() => {
    if (archivo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVistaPrevia(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  }, [archivo]);

  const cargarDatosUsuario = async () => {
    if (auth.currentUser) {
      try {
        const docRef = doc(db, 'usuarios', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const datos = docSnap.data();
          setUsuario({
            nombre: datos.nombre || '',
            apellido: datos.apellido || '',
            email: auth.currentUser.email || '',
            telefono: datos.telefono || '',
            sobreMi: datos.sobreMi || '',
            fotoURL: datos.fotoURL || ''
          });
        } else {

          const datosIniciales = {
            nombre: '',
            apellido: '',
            email: auth.currentUser.email || '',
            telefono: '',
            sobreMi: '',
            fotoURL: '',
            createdAt: new Date().toISOString(),
            role: 'cliente'
          };
          await setDoc(docRef, datosIniciales);
          setUsuario(datosIniciales);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        mostrarMensaje('error', 'Error al cargar los datos del usuario');
      }
    }
  };

  const mostrarMensaje = (tipo, texto) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuario(prevState => ({
      ...prevState,
      [name]: value || '' 
    }));
  };

  const subirImagen = async (archivo) => {
    if (!archivo) return null;
    try {

      const fileExt = archivo.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}${Date.now().toString()}.${fileExt}`;
      const filePath = `perfiles/${fileName}`;


      const { data, error } = await supabase.storage
        .from('imagenes')
        .upload(filePath, archivo, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error de Supabase:', error);
        throw error;
      }


      const { data: { publicUrl } } = supabase.storage
        .from('imagenes')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      mostrarMensaje('error', 'Error al subir la imagen. Por favor, intenta de nuevo.');
      return null;
    }
  };

  const actualizarContraseña = async () => {
    if (!nuevaContraseña || nuevaContraseña.length < 6) {
      mostrarMensaje('error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      setCargando(true);
      await updatePassword(auth.currentUser, nuevaContraseña);
      mostrarMensaje('success', 'Contraseña actualizada con éxito');
      setNuevaContraseña('');
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      mostrarMensaje('error', 'Error al actualizar la contraseña. Por favor, inicia sesión de nuevo e intenta otra vez.');
    } finally {
      setCargando(false);
    }
  };

  const actualizarEmail = async () => {
    if (!usuario.email || !usuario.email.includes('@')) {
      mostrarMensaje('error', 'Por favor, ingresa un email válido');
      return;
    }

    try {
      await updateEmail(auth.currentUser, usuario.email);
      mostrarMensaje('success', 'Email actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar email:', error);
      mostrarMensaje('error', 'Error al actualizar el email. Por favor, inicia sesión de nuevo e intenta otra vez.');
      throw error;
    }
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    
    if (!auth.currentUser) {
      mostrarMensaje('error', 'Debes iniciar sesión para guardar los cambios');
      navigate('/login');
      return;
    }

    setCargando(true);
    try {

      let nuevaFotoURL = usuario.fotoURL;
      if (archivo) {
        nuevaFotoURL = await subirImagen(archivo);
        if (!nuevaFotoURL) {
          throw new Error('No se pudo subir la imagen');
        }


        if (usuario.fotoURL) {
          try {
            const oldFilePath = usuario.fotoURL.split('/').pop();
            await supabase.storage
              .from('imagenes')
              .remove([`perfiles/${oldFilePath}`]);
          } catch (error) {
            console.error('Error al eliminar la imagen anterior:', error);
          }
        }

        await updateProfile(auth.currentUser, { 
          photoURL: nuevaFotoURL,
          displayName: `${usuario.nombre} ${usuario.apellido}`
        });
      }


      const userRef = doc(db, 'usuarios', auth.currentUser.uid);
      const datosActualizados = {
        nombre: usuario.nombre || '',
        apellido: usuario.apellido || '',
        telefono: usuario.telefono || '',
        sobreMi: usuario.sobreMi || '',
        fotoURL: nuevaFotoURL || usuario.fotoURL || '',
        ultimaActualizacion: new Date().toISOString()
      };


      Object.keys(datosActualizados).forEach(key => {
        if (datosActualizados[key] === undefined) {
          datosActualizados[key] = '';
        }
      });

      await updateDoc(userRef, datosActualizados);


      if (usuario.email !== auth.currentUser.email) {
        await actualizarEmail();
      }


      mostrarMensaje('success', '¡Tu información se ha guardado exitosamente!');
      

      await cargarDatosUsuario();
      

      setArchivo(null);
      setVistaPrevia(null);

    } catch (error) {
      console.error('Error al guardar cambios:', error);
      mostrarMensaje('error', 'Error al actualizar el perfil. Por favor, verifica tu conexión e intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-screen p-50">
      <form onSubmit={guardarCambios} className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-8">

          {mensaje.texto && (
            <div className={`p-4 rounded-md ${
              mensaje.tipo === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Foto de Perfil</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                {vistaPrevia || usuario.fotoURL ? (
                  <img 
                    src={vistaPrevia || usuario.fotoURL} 
                    alt="Perfil" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-teal-600"
                  />
                ) : (
                  <UserCircleIcon className="w-32 h-32 text-gray-300" />
                )}
                <label 
                  htmlFor="foto-input"
                  className="absolute bottom-0 right-0 bg-teal-600 rounded-full p-2 cursor-pointer hover:bg-teal-700 transition-colors"
                >
                  <PhotoIcon className="w-5 h-5 text-white" />
                </label>
                <input
                  id="foto-input"
                  type="file"
                  onChange={(e) => setArchivo(e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">Cambiar foto de perfil</h3>
                <p className="text-sm text-gray-500">
                  JPG, PNG o GIF. Tamaño máximo 10MB.
                </p>
              </div>
            </div>
          </div>


          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={usuario.nombre}
                  onChange={manejarCambio}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={usuario.apellido}
                  onChange={manejarCambio}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Tu apellido"
                />
              </div>
            </div>
          </div>


          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={usuario.email}
                  onChange={manejarCambio}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={usuario.telefono}
                  onChange={manejarCambio}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="+34 XXX XXX XXX"
                />
              </div>
            </div>
          </div>


          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Seguridad</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={nuevaContraseña}
                  onChange={(e) => setNuevaContraseña(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Nueva contraseña"
                />
              </div>
              <div>
                <BotonSecundario
                  text="Actualizar Contraseña"
                  onClick={actualizarContraseña}
                  disabled={!nuevaContraseña}
                />
              </div>
            </div>
          </div>


          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sobre Mí</h2>
            <textarea
              name="sobreMi"
              value={usuario.sobreMi}
              onChange={manejarCambio}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Cuéntanos sobre ti..."
            />
          </div>


          <div className="flex justify-end gap-4">
            <BotonSecundario
              text="Cancelar"
              onClick={() => window.history.back()}
            />
            <BotonPrimario
              text={cargando ? "Guardando..." : "Guardar Cambios"}
              type="submit"
              disabled={cargando}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
