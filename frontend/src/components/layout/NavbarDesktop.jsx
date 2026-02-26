import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavbarDesktop = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();

    const cerrarSesion = () => {
        //localStorage.removeItem("token"); // elimina tu JWT
        navigate("/", { replace: true }); // vuelve al login
    };

    const simpleLinks = [
        { name: 'Inicio', path: '/home' },
        { name: 'APP', path: '/rap' },
        { name: 'Contactos', path: '/contacts' },
        { name: 'Galería', path: '/gallery' },
    ];

    const scaleItems = [
        { name: 'Cúpula Policial', path: '/identity/mission' },
        { name: 'Cúpula Institucional', path: '/identity/values' },
        { name: 'Instructores', path: '/instructors' },
        { name: 'Brigadieres', path: '/identity/structure' },
        { name: 'Comandantes', path: '/identity/hymn' },
    ]

    const identityItems = [
        { name: 'Historia', path: '/identity/history' },
        { name: 'Simbolismos', path: '/identity/simbolismos' },
        { name: 'Ética Institucional', path: '/identity/values' },
        { name: 'Mapa interactivo', path: '/identity/structure' },
        { name: 'Más datos', path: '/identity/hymn' },
    ];

    const libraryItems = [
        { name: 'Reglamentos', path: '/library/regulations' },
        { name: 'Horarios', path: '/library/disciplinary' },
        { name: 'Formatos', path: '/library/internal' },
        { name: 'Más documentos', path: '/library/procedures' },
    ];

    return (
        <nav className="flex">
            <ul className="flex items-center gap-5 list-none m-0 p-0 px-15">
                {/* Links simples */}
                {simpleLinks.map((link) => (
                    <li key={link.name}>
                        <Link
                            to={link.path}
                            className="text-white no-underline font-medium transition-all duration-300 px-3 py-2 rounded-md hover:bg-white/20"
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}

                {/* Dropdown - Escalafón */}
                <li
                    className="relative"
                    onMouseEnter={() => setOpenDropdown('scale')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <Link
                        className="text-white no-underline font-medium transition-all duration-300 px-3 py-2 rounded-md hover:bg-white/20 flex items-center gap-1 cursor-pointer"
                    >
                        Jerarquía
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'scale' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </Link>

                    {openDropdown === 'scale' && (
                        <div className="absolute top-full left-0 min-w-42 bg-white rounded-lg shadow-xl py-2 z-50 animate-fade-in">
                            {scaleItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </li>

                {/* Dropdown - Identidad */}
                <li
                    className="relative"
                    onMouseEnter={() => setOpenDropdown('identity')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <Link
                        className="text-white no-underline font-medium transition-all duration-300 px-3 py-2 rounded-md hover:bg-white/20 flex items-center gap-1 cursor-pointer"
                    >
                        Identidad
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'identity' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </Link>

                    {openDropdown === 'identity' && (
                        <div className="absolute top-full left-0 min-w-42 bg-white rounded-lg shadow-xl py-2 z-50 animate-fade-in">
                            {identityItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </li>

                {/* Dropdown - Biblioteca */}
                <li
                    className="relative"
                    onMouseEnter={() => setOpenDropdown('library')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <Link
                        className="text-white no-underline font-medium transition-all duration-300 px-3 py-2 rounded-md hover:bg-white/20 flex items-center gap-1 cursor-pointer"
                    >
                        Biblioteca
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'library' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </Link>

                    {openDropdown === 'library' && (
                        <div className="absolute top-full left-0 min-w-42 bg-white rounded-lg shadow-xl py-2 z-50 animate-fade-in">
                            {libraryItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </li>
            </ul>
            {/* BOTÓN CERRAR SESIÓN */}
            <button
                onClick={cerrarSesion}
                className="mr-10 bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition"
            >
                Cerrar sesión
            </button>

        </nav>
    );
};

export default NavbarDesktop;