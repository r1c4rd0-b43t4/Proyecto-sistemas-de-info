import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";

const PaypalButtonComponent = ({ precio, onSuccess, disabled }) => {
    const navigate = useNavigate();

    const initialOptions = {
        "client-id": "AfE2YsA1DwI9Rbzha1bccIWTwFZp5abKZG8YfKIhYbDYy1VHkniyNpU2CrxKjAXSf8eal7Q308vLjkBj",
        currency: "USD",
        intent: "capture",
    };

    const createOrder = (data, actions) => {
        if (precio === undefined || precio === null || isNaN(precio)) {
            console.error("⚠️ Error: precio inválido", precio);
            navigate('/fallida');
            return Promise.reject(new Error("Precio inválido"));
        }

        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: parseFloat(precio).toFixed(2),
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture()
            .then(function (details) {
                const name = details.payer.name.given_name;
                console.log(`Gracias por tu compra, ${name}!`);
                
                if (onSuccess) {
                    onSuccess();
                }
                
                navigate('/exitosa');
            })
            .catch(error => {
                console.error("Error en la captura del pago:", error);
                navigate('/fallida');
            });
    };

    const onError = (err) => {
        console.error("Error en PayPal:", err);
        navigate('/fallida');
    };

    const simularCompraExitosa = () => {
        console.log("Simulando compra exitosa");
        try {
            if (onSuccess) {
                onSuccess();
            }
            navigate('/exitosa');
        } catch (error) {
            console.error("Error al procesar la compra simulada:", error);
            navigate('/fallida');
        }
    };

    const simularCompraFallida = () => {
        console.log("Simulando compra fallida");
        navigate('/fallida');
    };

    if (disabled) {
        return (
            <div className="flex flex-col items-center">
                <button
                    disabled
                    className="bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed opacity-70"
                >
                    No disponible
                </button>
                <p className="text-sm text-red-500 mt-2">
                    No hay cupos disponibles para esta ruta
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center">
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons 
                        createOrder={createOrder} 
                        onApprove={onApprove}
                        onError={onError}
                        style={{ layout: "vertical" }}
                    />
                </PayPalScriptProvider>
            </div>
            
            <div className="flex flex-col items-center">
                <div className="flex gap-2">
                    <button
                        onClick={simularCompraExitosa}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Compra Exitosa (Prueba)
                    </button>
                    
                    <button
                        onClick={simularCompraFallida}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Compra Fallida (Prueba)
                    </button>
                </div>
                
                <p className="text-sm text-gray-500 mt-2">
                    Usa los botones de prueba si hay problemas con PayPal
                </p>
            </div>
        </div>
    );
};

export default function BotonPaypal({ precio, onSuccess, disabled }) {
    const navigate = useNavigate();
    
    if (precio === undefined || precio === null || isNaN(precio)) {
        console.error("⚠️ Error: No se pasó un precio válido a BotonPaypal");
        setTimeout(() => navigate('/fallida'), 1000);
        return <p style={{ color: "red" }}>⚠️ Error: Precio inválido. Redirigiendo...</p>;
    }

    return <PaypalButtonComponent precio={precio} onSuccess={onSuccess} disabled={disabled} />;
}