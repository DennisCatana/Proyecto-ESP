import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ title, items, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Cerrar dropdown cuando se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
        {/* Botón del dropdown */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white no-underline font-medium transition-all duration-300 px-3 py-2 rounded-md hover:bg-white/20 flex items-center gap-1"
        >
            {title}
            <svg
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        {/* Menú desplegable */}
        {isOpen && (
            <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-xl py-2 z-50 animate-fade-in">
            {items.map((item, index) => (
                <Link
                key={index}
                to={item.path}
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
                >
                {item.name}
                </Link>
            ))}
            </div>
        )}
        </div>
    );
};

export default Dropdown;