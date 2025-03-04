
import BotonFooter from "./BotonFooter";
import InstagramIcon from '../assets/instagram.svg';
import FacebookIcon from '../assets/facebook.svg';
import UnimetIcon from '../assets/Logo unimet.svg';

export default function Footer() {
    const upperLinks = [
        { text: "Contáctanos", link: "#" },
        { text: "Inicio", link: "#" },
        { text: "@UnimeTrail", link: "#" },
        { text: "support@unimetrail.com", link: "mailto:support@unimetrail.com" },
    ];
    const lowerLinks = [
        { text: "Privacy Policy", link: "#" },
        { text: "Terms of Service", link: "#" },
        { text: "Cookies Settings", link: "#" },
    ];

    return (
        <footer className="bg-teal-700 text-white py-6 w-screen">
            <div className="container mx-auto px-6 w-full">
                <div className="flex flex-col md:flex-row justify-between items-center w-full">
                    <div className="text-lg font-semibold">UnimeTrail</div>
                    <nav className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
                        {upperLinks.map((link, index) => (
                            <BotonFooter key={index} text={link.text} link={link.link} />
                        ))}
                    </nav>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-xl hover:underline">
                            <img src={FacebookIcon} alt="Facebook" className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-xl hover:underline">
                            <img src={InstagramIcon} alt="Instagram" className="w-6 h-6" />
                        </a>
                    </div>
                </div>
                <hr className="my-4 border-gray-400 w-full" />
                <div className="flex flex-col md:flex-row justify-between items-center text-xs w-full">
                    <div className="flex items-center space-x-2">
                    <a href="#" className="text-xl hover:underline"> <img src={UnimetIcon} alt="Unimet" className="w-12 h-12" /> </a>
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
}