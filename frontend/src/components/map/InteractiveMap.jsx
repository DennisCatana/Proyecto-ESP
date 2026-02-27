import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Home, User } from 'lucide-react';

// Importar componentes hijos
import MapCuadrantesOverlay from './MapCuadrantesOverlay';
import MapVistaCuadrante from './MapVistaCuadrante';
import MapInfoPanel from './MapInfoPanel';
import MapHotspot from './MapHotspot';
import { ubicaciones, cuadrantes, heroes } from './data/mapData';

// Componente principal
const InteractiveMap = () => {
    const [cuadranteActual, setCuadranteActual] = useState(null);
    const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState(null);

    const handleSelectCuadrante = (id) => {
        setCuadranteActual(id);
    };

    const handleBack = () => {
        setCuadranteActual(null);
        setUbicacionSeleccionada(null);
    };

    const handleSelectUbicacion = (ubicacion) => {
        setUbicacionSeleccionada(ubicacion);
    };

    const handleCloseInfo = () => {
        setUbicacionSeleccionada(null);
    };

    return (
        <div className="flex flex-col bg-slate-900 rounded-xl overflow-hidden">
            {/* Barra de navegación del mapa */}
            <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    {cuadranteActual && (
                        <button 
                            onClick={handleBack}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
                        >
                            <ChevronLeft size={20} />
                            <span>Volver</span>
                        </button>
                    )}
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg">
                        <Home size={18} className="text-blue-500" />
                        <span className="text-sm text-white">
                            {cuadranteActual ? cuadrantes[cuadranteActual].nombre : 'Vista General'}
                        </span>
                    </div>
                </div>
                
                {/* Leyenda */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                        <span className="text-gray-400 text-sm">Ubicación</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-full" />
                        <span className="text-gray-400 text-sm">Héroes Policiales</span>
                    </div>
                </div>
            </div>

            {/* Mapa */}
            <div className="flex-1 relative" style={{ minHeight: '1000px' }}>
                <AnimatePresence mode="wait">
                    {cuadranteActual ? (
                        <motion.div
                            key="cuadrante"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                        >
                            <MapVistaCuadrante 
                                id={cuadranteActual}
                                ubicaciones={ubicaciones[cuadranteActual]}
                                onSelectUbicacion={handleSelectUbicacion}
                                ubicacionSeleccionada={ubicacionSeleccionada}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="general"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0"
                        >
                            {/* Imagen de fondo principal */}
                            <div className="absolute inset-0">
                                <img 
                                    src="/images/mapImages/esp.png" 
                                    alt="Escuela Superior de Policía"
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/30 via-slate-900/50 to-slate-900/30" />
                            </div>
                            
                            {/* Overlay de cuadrantes */}
                            <MapCuadrantesOverlay onSelect={handleSelectCuadrante} />

                            {/* Hotspots de Héroes en vista general */}
                            {heroes.map((heroe) => (
                                <MapHotspot
                                    key={heroe.id}
                                    ubicacion={heroe}
                                    onSelect={handleSelectUbicacion}
                                    isSelected={ubicacionSeleccionada?.id === heroe.id}
                                    tipo="heroe"
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Panel de información emergente */}
            <AnimatePresence>
                {ubicacionSeleccionada && (
                    <MapInfoPanel 
                        ubicacion={ubicacionSeleccionada} 
                        onClose={handleCloseInfo} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveMap;
