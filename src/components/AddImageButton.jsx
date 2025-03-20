import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import BotonPrimario from './BotonPrimario';
import BotonSecundario from './BotonSecundario';


const AddImageButton = ({ onImageAdded }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setMessage('Solo se permiten archivos de imagen (JPEG, PNG, etc.)');
      return;
    }

    setFile(selectedFile);
    setMessage('');
  };

  const handleUpload = async (e) => {
    e.stopPropagation();
    if (!file || loading) return;

    try {
      setLoading(true);
      setMessage('');
      
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('imagenes-galeria')
        .upload(fileName, file);

      if (error) throw error;

      setMessage('¡Imagen subida exitosamente!');
      setTimeout(() => {
        setShowPopup(false);
        onImageAdded?.();
        setFile(null);
      }, 1500);
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div 
        className="w-full h-120 bg-white rounded-lg cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center relative overflow-hidden"
        style={{ 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: '2px solid #e5e7eb',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        }}
        onClick={() => setShowPopup(true)}
      >
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>
      </div>

      {showPopup && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50" 
          onClick={() => {
            setShowPopup(false);
            setFile(null);
          }}
        >
          <div 
            className="bg-white p-6 rounded-lg w-96 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Subir nueva imagen</h3>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mb-4 p-2 border rounded"
              disabled={loading}
            />

            <div className="mt-4 flex gap-2">
              <BotonPrimario 
                text={loading ? "Subiendo..." : "Subir imagen"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpload(e);
                }}
                disabled={!file || loading}
              />
              
              <BotonSecundario
                text="Cancelar"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false);
                  setFile(null);
                }}
                
              />
            </div>

            {message && (
              <p className={`mt-3 text-sm ${
                message.includes('Error') ? 'text-red-500' : 'text-green-500'
              }`}>
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddImageButton;
