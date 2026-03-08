import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Home } from 'lucide-react';

// Importar imagen 
import espMapImage from '../../assets/images/mapImages/esp.png';

// Importar componentes hijos
import MapCuadrantesOverlay from './MapCuadrantesOverlay';
import MapVistaCuadrante from './MapVistaCuadrante';
import MapInfoPanel from './MapInfoPanel';
import MapHotspot from './MapHotspot';
import { ubicaciones, cuadrantes, heroes } from './data/mapData';

// Memoized hotspot component
const MemoizedMapHotspot = memo(MapHotspot);

// Componente principal
const InteractiveMap = () => {
    const [cuadranteActual, setCuadranteActual] = useState(null);
    const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState(null);

    // Memoize handlers to prevent unnecessary re-renders
    const handleSelectCuadrante = useMemo(() => (id) => {
        setCuadranteActual(id);
    }, []);

    const handleBack = useMemo(() => () => {
        setCuadranteActual(null);
        setUbicacionSeleccionada(null);
    }, []);

    const handleSelectUbicacion = useMemo(() => (ubicacion) => {
        setUbicacionSeleccionada(ubicacion);
    }, []);

    const handleCloseInfo = useMemo(() => () => {
        setUbicacionSeleccionada(null);
    }, []);

    // Memoize current cuadrante name
    const currentCuadranteName = useMemo(() => {
        return cuadranteActual ? cuadrantes[cuadranteActual]?.nombre : 'Vista General';
    }, [cuadranteActual]);

    // Memoize ubicaciones for current cuadrante
    const currentUbicaciones = useMemo(() => {
        return cuadranteActual ? ubicaciones[cuadranteActual] : [];
    }, [cuadranteActual]);

    return (
        <div className="flex flex-col bg-slate-900 rounded-xl overflow-hidden w-full h-full min-h-125 md:min-h-175 lg:min-h-200 xl:min-h-250">
            {/* Barra de navegación del mapa */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-4 bg-slate-800 border-b border-slate-700 gap-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {cuadranteActual && (
                        <motion.button 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onClick={handleBack}
                            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white text-sm sm:text-base"
                        >
                            <ChevronLeft size={18} />
                            <span className="hidden sm:inline">Volver</span>
                        </motion.button>
                    )}
                    <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-slate-700 rounded-lg">
                        <Home size={16} className="text-blue-500" />
                        <span className="text-xs sm:text-sm text-white whitespace-nowrap">
                            {currentCuadranteName}
                        </span>
                    </div>
                </div>
                
                {/* Leyenda */}
                <div className="hidden lg:flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-full" />
                        <span className="text-gray-400 text-sm">Héroes Policiales</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-gray-400 text-sm">Cuadrante 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-gray-400 text-sm">Cuadrante 2</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                        <span className="text-gray-400 text-sm">Cuadrante 3</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                        <span className="text-gray-400 text-sm">Cuadrante 4</span>
                    </div>
                    
                </div>
            </div>

            {/* Mapa */}
            <div className="flex-1 relative w-full" style={{ minHeight: '400px' }}>
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
                                ubicaciones={currentUbicaciones}
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
                                    src={espMapImage} 
                                    alt="Escuela Superior de Policía"
                                    className="w-full h-full object-contain"
                                    loading="lazy"
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
                                <MemoizedMapHotspot
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
                        cuadranteId={cuadranteActual || ubicacionSeleccionada.cuadranteId}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Memoize the entire component
export default memo(InteractiveMap);
