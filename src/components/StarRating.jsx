import React, { useState } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion ,setDoc} from 'firebase/firestore';
import { UserContext } from '../Context/UserContext';

const Star = ({ filled }) => (
    <div data-svg-wrapper style={{ position: 'relative' }}>
        <svg width="16" height="17" viewBox="0 0 16 17" fill={filled ? "#FA8232" : "none"} xmlns="http://www.w3.org/2000/svg">
            <path d="M8.275 12.4188L11.425 14.4188C11.8312 14.675 12.3312 14.2938 12.2125 13.825L11.3 10.2375C11.2753 10.1381 11.2792 10.0337 11.3113 9.93638C11.3434 9.83907 11.4023 9.7528 11.4812 9.68752L14.3062 7.33127C14.675 7.02502 14.4875 6.40627 14.0062 6.37502L10.3187 6.13752C10.2181 6.13166 10.1214 6.09663 10.0404 6.03669C9.95935 5.97675 9.89754 5.89451 9.8625 5.80002L8.4875 2.33752C8.4511 2.23745 8.38479 2.15102 8.29758 2.08994C8.21037 2.02886 8.10647 1.99609 8 1.99609C7.89352 1.99609 7.78963 2.02886 7.70241 2.08994C7.6152 2.15102 7.54889 2.23745 7.5125 2.33752L6.1375 5.80002C6.10245 5.89451 6.04064 5.97675 5.95962 6.03669C5.87859 6.09663 5.78186 6.13166 5.68125 6.13752L1.99375 6.37502C1.5125 6.40627 1.325 7.02502 1.69375 7.33127L4.51875 9.68752C4.59771 9.7528 4.65661 9.83907 4.68868 9.93638C4.72075 10.0337 4.72467 10.1381 4.7 10.2375L3.85625 13.5625C3.7125 14.125 4.3125 14.5813 4.79375 14.275L7.725 12.4188C7.8072 12.3665 7.90259 12.3387 8 12.3387C8.09741 12.3387 8.1928 12.3665 8.275 12.4188Z" fill={filled ? "#FA8232" : "#000"}/>
        </svg>
    </div>
);

const StarRating = ({ totalStars = 5, rutaId, rutaNombre }) => {
    const [rating, setRating] = useState(0);
    const [comentario, setComentario] = useState('');
    const { user, logged } = React.useContext(UserContext);
    const db = getFirestore();

    const handleRatingSubmit = async () => {
        if (!logged) {
            alert('Debes iniciar sesión para dejar una reseña');
            return;
        }
    
        if (rating === 0) {
            alert('Por favor, selecciona una calificación');
            return;
        }
    
        if (!comentario) {
            alert('Por favor, escribe un comentario');
            return;
        }
    
        try {
            // Usar setDoc para crear un nuevo documento en la colección "resenas"
            const resenaRef = doc(db, 'resenas', `${user.uid}-${rutaId}-${new Date().toISOString()}`);
            console.log(user.uid, rutaId, rating, comentario, new Date().toISOString());
    
            await setDoc(resenaRef, {
                rutaId: rutaId,
                userId: user.uid,
                calificación: rating,
                comentario: comentario,
                fecha: new Date().toISOString()
            });
    
            // Limpiar el formulario
            setRating(0);
            setComentario('');
            alert('¡Gracias por tu reseña!');
        } catch (error) {
            console.log(error)
            console.error('Error al guardar la reseña:', error);
            alert('Error al guardar la reseña. Por favor, intenta nuevamente.');
        }
    };
    

    return (
        <div className="flex flex-col items-start">
            <div className="flex">
                {Array.from({ length: totalStars }, (_, index) => (
                    <div 
                        key={`star-${rutaId}-${index}`}
                        onClick={() => setRating(index + 1)} 
                        className="cursor-pointer"
                    >
                        <Star filled={index < rating} />
                    </div>
                ))}
            </div>
            {rating > 0 && (
                <div className="mt-2 w-full">
                    <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="Escribe tu comentario (opcional)"
                        className="w-full p-2 border rounded-md"
                        rows="3"
                    />
                    <button
                        onClick={handleRatingSubmit}
                        className="mt-2 px-4 py-2 bg-[#FA8232] text-white rounded-md hover:bg-[#e67a2d] transition-colors"
                    >
                        Enviar reseña
                    </button>
                </div>
            )}
        </div>
    );
};

export default StarRating;