import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    FiLogOut, 
    FiBookOpen, 
    FiUser, 
    FiHome, 
    FiGrid, 
    FiUsers, 
    FiImage, 
    FiPhone 
} from "react-icons/fi";

const NavbarMobile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
        setIsOpen(false);
    };

    // 🔥 Guardamos el componente del icono, no JSX
    const simpleLinks = [
        { name: 'Inicio', path: '/home', icon: FiHome },
        { name: 'APP', path: '/rap', icon: FiGrid },
        { name: 'Estructura Orgánica', path: '/officers', icon: FiUsers },
        { name: 'Galería', path: '/gallery', icon: FiImage },
        { name: 'Servicios', path: '/contacts', icon: FiPhone },
    ];

    const doctrineItems = [
        { name: '- Historia', path: '/identity/history' },
        { name: '- Simbolismos', path: '/identity/mission' },
        { name: '- Ética Institucional', path: '/identity/values' },
        { name: '- Mapa interactivo', path: '/identity/structure' },
        { name: '- Más datos', path: '/identity/hymn' },
    ];

    const regulationsItems = [
        { name: '- Reglamentos', path: '/library/regulations' },
        { name: '- Horarios', path: '/library/disciplinary' },
        { name: '- Formatos', path: '/library/internal' },
        { name: '- Más documentos', path: '/library/procedures' },
    ];

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setOpenDropdown(null);
    };

    return (
        <div className="relative">
            
            {/* Botón hamburguesa */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Menú desplegable */}
            {isOpen && (
                <div className="absolute top-full right-0 w-64 bg-blue-700 shadow-lg rounded-bl-lg z-50">
                    <ul className="py-2">

                        {/* LINKS SIMPLES CON ICONOS */}
                        {simpleLinks.map((link) => {
                            const Icon = link.icon;

                            return (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="w-full flex items-center gap-3 text-white px-4 py-2 hover:bg-white/20 transition-colors"
                                        onClick={closeMenu}
                                    >
                                        <Icon size={18} />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            );
                        })}

                        {/* Dropdown - Identidad */}
                        <li>
                            <button
                                onClick={() => toggleDropdown('doctrine')}
                                className="w-full flex items-center justify-between px-4 py-2 text-white hover:bg-white/20 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <FiUser size={18} />
                                    <span>Identidad</span>
                                </div>

                                <svg
                                    className={`w-5 h-5 transition-transform duration-300 ${
                                        openDropdown === 'doctrine' ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openDropdown === 'doctrine' && (
                                <ul className="bg-blue-800/50">
                                    {doctrineItems.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.path}
                                                className="block text-white/90 px-8 py-2 text-sm hover:bg-white/10 transition-colors"
                                                onClick={closeMenu}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        {/* Dropdown - Biblioteca */}
                        <li>
                            <button
                                onClick={() => toggleDropdown('regulations')}
                                className="w-full flex items-center justify-between px-4 py-2 text-white hover:bg-white/20 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <FiBookOpen size={18} />
                                    <span>Biblioteca</span>
                                </div>

                                <svg
                                    className={`w-5 h-5 transition-transform duration-300 ${
                                        openDropdown === 'regulations' ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openDropdown === 'regulations' && (
                                <ul className="bg-blue-800/50">
                                    {regulationsItems.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.path}
                                                className="block text-white/90 px-8 py-2 text-sm hover:bg-white/10 transition-colors"
                                                onClick={closeMenu}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        {/* CERRAR SESIÓN */}
                        <li>
                            <button
                                onClick={cerrarSesion}
                                className="w-full flex items-center gap-3 text-white px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors"
                            >
                                <FiLogOut size={18} />
                                <span>Cerrar sesión</span>
                            </button>
                        </li>

                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavbarMobile;