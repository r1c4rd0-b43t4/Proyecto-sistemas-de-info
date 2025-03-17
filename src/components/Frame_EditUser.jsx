import { useState, useEffect } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import BotonPrimario from './BotonPrimario';
import BotonSecundario from './BotonSecundario';

export default function PerfilUsuario() {
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
  const storage = getStorage();
  const db = getFirestore();

  useEffect(() => {
    cargarDatosUsuario();
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
      const docRef = doc(db, 'usuarios', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUsuario({
          ...docSnap.data(),
          email: auth.currentUser.email
        });
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
      [name]: value
    }));
  };

  const subirImagen = async (archivo) => {
    if (!archivo) return null;
    const storageRef = ref(storage, `perfiles/${auth.currentUser.uid}`);
    await uploadBytes(storageRef, archivo);
    return await getDownloadURL(storageRef);
  };

  const actualizarContraseña = async () => {
    try {
      await updatePassword(auth.currentUser, nuevaContraseña);
      mostrarMensaje('success', 'Contraseña actualizada con éxito');
      setNuevaContraseña('');
    } catch (error) {
      mostrarMensaje('error', 'Error al actualizar la contraseña');
    }
  };

  const actualizarEmail = async () => {
    try {
      await updateEmail(auth.currentUser, usuario.email);
      mostrarMensaje('success', 'Email actualizado con éxito');
    } catch (error) {
      mostrarMensaje('error', 'Error al actualizar el email');
    }
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      let fotoURL = usuario.fotoURL;
      if (archivo) {
        fotoURL = await subirImagen(archivo);
        await updateProfile(auth.currentUser, { photoURL: fotoURL });
      }

      const userRef = doc(db, 'usuarios', auth.currentUser.uid);
      await updateDoc(userRef, {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        sobreMi: usuario.sobreMi,
        fotoURL
      });

      if (usuario.email !== auth.currentUser.email) {
        await actualizarEmail();
      }

      mostrarMensaje('success', 'Perfil actualizado con éxito');
    } catch (error) {
      mostrarMensaje('error', 'Error al actualizar el perfil');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-screen p-50">
      <form onSubmit={guardarCambios} className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-8">
          {/* Mensaje de estado */}
          {mensaje.texto && (
            <div className={`p-4 rounded-md ${
              mensaje.tipo === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {mensaje.texto}
            </div>
          )}

          {/* Sección de Foto */}
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

          {/* Información Personal */}
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

          {/* Información de Contacto */}
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

          {/* Cambiar Contraseña */}
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

          {/* Sobre Mí */}
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

          {/* Botones de acción */}
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
