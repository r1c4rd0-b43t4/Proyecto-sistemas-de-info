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
        return actions.order.capture().then(function (details) {
            const name = details.payer.name.given_name;
            console.log(`Gracias por tu compra, ${name}!`);
            
            if (onSuccess) {
                onSuccess();
            }
            
            navigate('/exitosa');
        });
    };

    const simularCompraExitosa = () => {
        console.log("Simulando compra exitosa");
        if (onSuccess) {
            onSuccess();
        }
        navigate('/exitosa');
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
                        style={{ layout: "vertical" }}
                    />
                </PayPalScriptProvider>
            </div>
            
            <div className="flex flex-col items-center">
                <button
                    onClick={simularCompraExitosa}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Comprar Ruta (Modo Prueba)
                </button>
                
                <p className="text-sm text-gray-500 mt-2">
                    Usa el botón de prueba si hay problemas con PayPal
                </p>
            </div>
        </div>
    );
};

export default function BotonPaypal({ precio, onSuccess, disabled }) {
    if (precio === undefined || precio === null || isNaN(precio)) {
        console.error("⚠️ Error: No se pasó un precio válido a BotonPaypal");
        return <p style={{ color: "red" }}>⚠️ Error: Precio inválido</p>;
    }

    return <PaypalButtonComponent precio={precio} onSuccess={onSuccess} disabled={disabled} />;
}