import MapHotspot from './MapHotspot';
import { cuadrantes } from './data/mapData';

const MapVistaCuadrante = ({ id, ubicaciones, onSelectUbicacion, ubicacionSeleccionada }) => {
    const cuadrante = cuadrantes[id];
    
    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Imagen de fondo del cuadrante */}
            <div className="absolute inset-0">
                <img 
                    src={cuadrante.imagen} 
                    alt={cuadrante.nombre}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/30 via-slate-900/50 to-slate-900/300" />
            </div>

            {/* Grid de referencia */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none opacity-20">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="border border-gray-500" />
                ))}
            </div>

            {/* Hotspots */}
            {ubicaciones?.map((ubicacion) => (
                <MapHotspot
                    key={ubicacion.id}
                    ubicacion={ubicacion}
                    onSelect={onSelectUbicacion}
                    isSelected={ubicacionSeleccionada?.id === ubicacion.id}
                />
            ))}
        </div>
    );
};

export default MapVistaCuadrante;
