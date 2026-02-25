import { useState } from 'react';
import { useFloating, flip, shift, offset, FloatingArrow } from '@floating-ui/react';
import { motion } from 'framer-motion';
import { MapPin, Info, User } from 'lucide-react';

const MapHotspot = ({ ubicacion, onSelect, isSelected, tipo = 'ubicacion' }) => {
    const [isHover, setIsHover] = useState(false);

    // Color según el tipo
    const colorBase = tipo === 'heroe' ? 'bg-amber-500' : 'bg-red-600';
    const colorHover = tipo === 'heroe' ? 'hover:bg-amber-400' : 'hover:bg-red-500';
    const borderColor = tipo === 'heroe' ? 'border-amber-300' : 'border-white';
    const iconColor = tipo === 'heroe' ? 'text-amber-500' : 'text-red-600';
    const iconBg = tipo === 'heroe' ? 'bg-amber-600/20' : 'bg-red-600/20';

    const { refs, floatingStyles, context } = useFloating({
        placement: 'top',
        open: isHover,
        onOpenChange: setIsHover,
        middleware: [
            offset(12),
            flip({ padding: 10, fallbackPlacements: ['bottom', 'left', 'right'] }),
            shift({ padding: 10 })
        ]
    });

    return (
        <>
            <motion.button
                ref={refs.setReference}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={() => onSelect(ubicacion)}
                className={`absolute w-5 h-5 -ml-5 -mt-5 rounded-full flex items-center justify-center 
                    cursor-pointer transition-all shadow-lg z-10 border-2 ${borderColor}
                    ${isSelected ? `${colorBase} scale-125` : `${colorBase} ${colorHover} hover:scale-110}`}`}
                style={{ left: `${ubicacion.x}%`, top: `${ubicacion.y}%` }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: isSelected ? Infinity : 0, duration: 1.5 }}
            >
                
                <span className={`absolute inset-0 rounded-full ${colorBase} animate-ping opacity-75`} />
            </motion.button>

            {isHover && (
                <div 
                    ref={refs.setFloating} 
                    style={floatingStyles}
                    className="bg-slate-800 text-white rounded-xl shadow-2xl z-50 max-w-xs w-64"
                >
                    <FloatingArrow ref={refs.arrow} context={context} className="fill-slate-800" />
                    <div className="p-4">
                        <div className="flex items-start gap-3">
                            <div className={`p-2 ${iconBg} rounded-lg shrink-0`}>
                                {tipo === 'heroe' ? (
                                    <User size={20} className={iconColor} />
                                ) : (
                                    <Info size={20} className={iconColor} />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{ubicacion.nombre}</h3>
                                {ubicacion.grado && (
                                    <p className="text-amber-400 text-sm">{ubicacion.grado}</p>
                                )}
                                <p className="text-gray-300 text-sm mt-1">{ubicacion.descripcion}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )}
        </>
    );
};

export default MapHotspot;