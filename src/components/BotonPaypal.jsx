import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";

const PaypalButtonComponent = ({ precio }) => {
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
                        value: parseFloat(precio).toFixed(2), // Asegurar que sea un número con 2 decimales
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const name = details.payer.name.given_name;
            console.log(`Gracias por tu compra, ${name}!`);
            
            navigate('/exitosa');
        });
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
    );
};

export default function BotonPaypal({ precio }) {
    if (precio === undefined || precio === null || isNaN(precio)) {
        console.error("⚠️ Error: No se pasó un precio válido a BotonPaypal");
        return <p style={{ color: "red" }}>⚠️ Error: Precio inválido</p>;
    }

    return <PaypalButtonComponent precio={precio} />;
}
