import React from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../Context/UserContext';
import BotonFooter from "./BotonFooter";

const Footer = () => {
    const navigate = useNavigate();
    const { user, logged } = React.useContext(UserContext);

    const handleInicioClick = () => {
        if (!logged) {
            navigate('/');
        } else {

            const userRole = user?.role || 'cliente';
            switch (userRole) {
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                case 'guia':
                    navigate('/guia/dashboard');
                    break;
                default:
                    navigate('/');
            }
        }
    };
    const upperLinks = [
        { text: "Contáctanos", link: "/contacto" },
        { text: "Inicio", onClick: handleInicioClick },
        { text: "@UnimeTrail", link: "https://www.instagram.com/proyectoavila/" },
        { text: "support@unimetrail.com", link: "mailto:support@unimetrail.com" },
    ];
    const lowerLinks = [
        { text: "Privacy Policy", link: "https://www.youtube.com/watch?v=iDLmYZ5HqgM" },
        { text: "Terms of Service", link: "https://www.youtube.com/watch?v=iDLmYZ5HqgM" },
        { text: "Cookies Settings", link: "https://www.youtube.com/watch?v=iDLmYZ5HqgM" },
    ];

    return (
        <footer className="bg-[#00796B] text-white py-6 w-screen">
            <div className="container mx-auto px-6 w-full">
                <div className="flex flex-col md:flex-row justify-between items-center w-full">
                    <div className="text-lg font-semibold">UnimeTrail</div>
                    <nav className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
                        {upperLinks.map((link, index) => (
                            <BotonFooter key={index} text={link.text} link={link.link} />
                        ))}
                    </nav>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="https://www.facebook.com/ProyectoAvila/" target="_blank" rel="noopener noreferrer" className="text-xl hover:underline">
                            <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Facebook.svg" alt="Facebook" className="w-6 h-6" />
                        </a>
                        <a href="https://www.instagram.com/proyectoavila/" target="_blank" rel="noopener noreferrer" className="text-xl hover:underline">
                            <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Instagram.svg" alt="Instagram" className="w-6 h-6" />
                        </a>
                    </div>
                </div>
                <hr className="my-4 border-gray-400 w-full" />
                <div className="flex flex-col md:flex-row justify-between items-center text-xs w-full">
                    <div className="flex items-center space-x-2">
                        <a href="https://www.unimet.edu.ve/proyecto-avila/" target="_blank" rel="noopener noreferrer" className="text-xl hover:underline">
                            <img src="https://llpzcyzmcfvjivsnjqbk.supabase.co/storage/v1/object/public/imagenes//Logo_unimet.svg" alt="Unimet" className="w-12 h-12" />
                        </a>
                        <p>© 2025 UnimeTrail. All rights reserved.</p>
                    </div>
                    <nav className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm mt-4 md:mt-0 mx-auto w-1/2 p-4">
                        {lowerLinks.map((link, index) => (
                            <BotonFooter key={index} text={link.text} link={link.link} />
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
