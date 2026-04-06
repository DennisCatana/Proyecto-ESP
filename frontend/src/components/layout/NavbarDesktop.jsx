import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";

const NavbarDesktop = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();

    const cerrarSesion = () => {
        navigate("/", { replace: true });
    };

    const simpleLinks = [
        { name: 'Inicio', path: '/home' },
        { name: 'Biblioteca', path: '/library/regulations' },
        { name: 'Servicios', path: '/contacts' },
        { name: 'Galería', path: '/gallery' },
    ];

    const appsItems = [
        { name: 'Control Disciplinario', path: '/aplications/disciplina' },
        { name: 'Descansos Médicos', path: '/aplications/descansos' },
        { name: 'Control Vehicular', path: '/aplications/vehiculos' },
    ];    

    const scaleItems = [
        { name: 'Mando Politico', path: '/organic/politicos' },
        { name: 'Cúpula Intitucional', path: '/organic/minstitucional' },
        { name: 'Cúpula ESP', path: '/organic/cupula' },
        { name: 'Instructores', path: '/organic/instructors' },
        { name: 'Brigadieres', path: '/organic/brigs' },
        { name: 'Comandantes', path: '/organic/comandantes' },
    ];

    const identityItems = [
        { name: 'Historia', path: '/identity/historia' },
        { name: 'Simbolismos', path: '/identity/simbolismos' },
        { name: 'Ética Institucional', path: '/identity/values' },
        { name: 'Mapa interactivo', path: '/identity/structure' },
        { name: 'Más datos', path: '/identity/hymn' },
    ];

    return (
        <nav className="flex justify-between items-center w-full">
            <ul className="flex items-center gap-5 list-none m-0 p-0 px-10">
                {/* Links simples */}
                {simpleLinks.map((link) => (
                    <li key={link.name}>
                        <Link
                            to={link.path}
                            className="text-white font-medium transition-all duration-300 px-3 py-2 rounded-md hover:bg-white/20"
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}

                {/* Dropdown Aplicaciones */}
                <li
                    className="relative"
                    onMouseEnter={() => setOpenDropdown('applications')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <button className="text-white font-medium px-3 py-2 rounded-md hover:bg-white/20 flex items-center gap-1">
                        Aplicaciones
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'applications' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {openDropdown === 'applications' && (
                        <div className="absolute top-full left-0 min-w-44 bg-white rounded-lg shadow-xl py-2 z-50">
                            {appsItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </li>

                {/* Dropdown Orgánico */}
                <li
                    className="relative"
                    onMouseEnter={() => setOpenDropdown('organic')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <button className="text-white font-medium px-3 py-2 rounded-md hover:bg-white/20 flex items-center gap-1">
                        Orgánico
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'organic' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {openDropdown === 'organic' && (
                        <div className="absolute top-full left-0 min-w-44 bg-white rounded-lg shadow-xl py-2 z-50">
                            {scaleItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </li>

                {/* Dropdown Identidad */}
                <li
                    className="relative"
                    onMouseEnter={() => setOpenDropdown('identity')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <button className="text-white font-medium px-3 py-2 rounded-md hover:bg-white/20 flex items-center gap-1">
                        Identidad
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'identity' ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {openDropdown === 'identity' && (
                        <div className="absolute top-full left-0 min-w-44 bg-white rounded-lg shadow-xl py-2 z-50">
                            {identityItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </li>
            </ul>

            {/* Botón Cerrar Sesión */}
            <button
                onClick={cerrarSesion}
                className="mr-5 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition flex items-center justify-center"
                title="Cerrar sesión"
            >
                <FiLogOut size={18} />
            </button>
        </nav>
    );
};

export default NavbarDesktop;

