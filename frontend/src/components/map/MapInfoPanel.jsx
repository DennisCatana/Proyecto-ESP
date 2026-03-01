import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Colores por cuadrante
const getColorByCuadrante = (cuadranteId, esHeroe = false) => {
    if (esHeroe) return 'text-amber-400'; // Color dorado para héroes
    
    switch (cuadranteId) {
        case 1: return 'text-blue-500';
        case 2: return 'text-green-500';
        case 3: return 'text-purple-500';
        case 4: return 'text-orange-500';
        default: return 'text-red-500';
    }
};

const MapInfoPanel = ({ ubicacion, onClose, cuadranteId }) => {
    const [imagenActual, setImagenActual] = useState(0);
    
    if (!ubicacion) return null;
    
    const imagenes = ubicacion.imagenes || ["/images/image1.jpeg"];
    // Verificar si es un héroe (tiene la propiedad 'grado')
    const esHeroe = !!ubicacion.grado;
    const tituloColor = getColorByCuadrante(cuadranteId, esHeroe);

    const imagenAnterior = () => {
        setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    };

    const siguienteImagen = () => {
        setImagenActual((prev) => (prev + 1) % imagenes.length);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative bg-slate-800 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[95vh] overflow-hidden"
                >
                    {/* Carrusel de imágenes */}
                    <div className="relative h-48 sm:h-56 md:h-64 bg-gray-800">
                        <img 
                            src={imagenes[imagenActual]} 
                            alt={ubicacion.nombre}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "/images/image1.jpeg";
                            }}
                        />
                        
                        {/* Botones de navegación del carrusel */}
                        {imagenes.length > 1 && (
                            <>
                                <button 
                                    onClick={imagenAnterior}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                                >
                                    <ChevronLeft size={18} className="text-white" />
                                </button>
                                <button 
                                    onClick={siguienteImagen}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                                >
                                    <ChevronRight size={18} className="text-white" />
                                </button>
                                
                                {/* Indicadores */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                    {imagenes.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setImagenActual(idx)}
                                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                                idx === imagenActual ? 'bg-white' : 'bg-white/50'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        <button 
                            onClick={onClose} 
                            className="absolute top-2 right-2 p-1.5 sm:p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                        >
                            <X size={16} className="text-white" />
                        </button>
                    </div>

                    {/* Contenido */}
                    <div className="p-4 sm:p-6">
                        <h2 className={`text-xl sm:text-2xl font-bold mb-3 ${tituloColor}`}>
                            {ubicacion.nombre}
                        </h2>
                        
                        <p className="text-gray-300 text-justify text-sm sm:text-base leading-relaxed">
                            {ubicacion.descripcion}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="p-3 sm:p-4 border-t border-gray-700">
                        <button 
                            onClick={onClose} 
                            className="w-full py-2.5 sm:py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg sm:rounded-xl font-medium transition-colors text-sm sm:text-base"
                        >
                            Cerrar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MapInfoPanel;
