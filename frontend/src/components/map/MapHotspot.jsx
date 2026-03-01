import { useState, memo } from 'react';
import { useFloating, flip, shift, offset, FloatingArrow } from '@floating-ui/react';
import { motion } from 'framer-motion';
import { Info, User } from 'lucide-react';

// Colores por cuadrante
const getColorByCuadrante = (cuadranteId) => {
    switch (cuadranteId) {
        case 1: return { base: 'bg-blue-600', hover: 'hover:bg-blue-500', border: 'border-blue-300', icon: 'text-blue-600', iconBg: 'bg-blue-600/20', text: 'text-blue-500' };
        case 2: return { base: 'bg-green-600', hover: 'hover:bg-green-500', border: 'border-green-300', icon: 'text-green-600', iconBg: 'bg-green-600/20', text: 'text-green-500' };
        case 3: return { base: 'bg-purple-600', hover: 'hover:bg-purple-500', border: 'border-purple-300', icon: 'text-purple-600', iconBg: 'bg-purple-600/20', text: 'text-purple-500' };
        case 4: return { base: 'bg-orange-500', hover: 'hover:bg-orange-400', border: 'border-orange-300', icon: 'text-orange-500', iconBg: 'bg-orange-500/20', text: 'text-orange-500' };
        default: return { base: 'bg-red-600', hover: 'hover:bg-red-500', border: 'border-white', icon: 'text-red-600', iconBg: 'bg-red-600/20', text: 'text-red-500' };
    }
};

// Helper function to get colors based on tipo and cuadranteId
const getColors = (tipo, cuadranteId) => {
    if (tipo === 'heroe') {
        return { base: 'bg-amber-500', hover: 'hover:bg-amber-400', border: 'border-amber-300', icon: 'text-amber-500', iconBg: 'bg-amber-600/20', text: 'text-amber-500' };
    } else if (cuadranteId) {
        return getColorByCuadrante(cuadranteId);
    }
    return { base: 'bg-red-600', hover: 'hover:bg-red-500', border: 'border-white', icon: 'text-red-600', iconBg: 'bg-red-600/20', text: 'text-red-500' };
};

const MapHotspot = ({ ubicacion, onSelect, isSelected, tipo = 'ubicacion', cuadranteId }) => {
    const [isHover, setIsHover] = useState(false);

    // Memoize colors to prevent recalculation
    const colors = getColors(tipo, cuadranteId);

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
                    cursor-pointer transition-all shadow-lg z-10 border-2 ${colors.border}
                    ${isSelected ? `${colors.base} scale-125` : `${colors.base} ${colors.hover} hover:scale-110}`}`}
                style={{ left: `${ubicacion.x}%`, top: `${ubicacion.y}%` }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: isSelected ? Infinity : 0, duration: 1.5 }}
            >
                
                <span className={`absolute inset-0 rounded-full ${colors.base} animate-ping opacity-75`} />
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
                            <div className={`p-2 ${colors.iconBg} rounded-lg shrink-0`}>
                                {tipo === 'heroe' ? (
                                    <User size={20} className={colors.icon} />
                                ) : (
                                    <Info size={20} className={colors.icon} />
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

// Memoize the component with custom comparison
export default memo(MapHotspot, (prevProps, nextProps) => {
    return (
        prevProps.ubicacion.id === nextProps.ubicacion.id &&
        prevProps.ubicacion.x === nextProps.ubicacion.x &&
        prevProps.ubicacion.y === nextProps.ubicacion.y &&
        prevProps.isSelected === nextProps.isSelected &&
        prevProps.tipo === nextProps.tipo &&
        prevProps.cuadranteId === nextProps.cuadranteId
    );
});
