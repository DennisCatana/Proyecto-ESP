import { motion } from 'framer-motion';
import { cuadrantes, ubicaciones } from './data/mapData';

const MapCuadrantesOverlay = ({ onSelect }) => {
    const posiciones = {
        1: { top: '14%', left: '28%', width: '38%', height: '35%' },
        2: { top: '39%', left: '51%', width: '18%', height: '29%' },
        3: { top: '50%', left: '28%', width: '24%', height: '42%' },
        4: { top: '69%', left: '48%', width: '18%', height: '27%' }
    };

    const formasPersonalizadas = {
    1: 'polygon(64% 1%, 99% 1%, 99% 54%,66% 54%, 66% 99%, 25% 99%, 25% 24%, 36% 18%)', // CUADRANTE 1
    2: 'polygon(24% 1%, 81% 1%, 81% 54%, 81% 99%, 79% 99%, 1% 99%, 16% 57%, 24% 34%)', // CUADRANTE 2
    3: 'polygon(60% 1%, 99% 1%, 74% 80%, 74% 99%, 34% 95%, 5% 63%, 13% 50%, 29% 1%)', // CUADRANTE 3
    4: 'polygon(80% 1%, 99% 1%, 97% 81%, 99% 99%, 38% 93%, 3% 88%, 2% 50%, 16% 1%)' // CUADRANTE 4
};

    return (
        <div className="absolute inset-0">
            {Object.entries(posiciones).map(([id, pos]) => (
                <motion.button
                    key={id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(Number(id))}
                    className={`absolute bg-linear-to-br ${cuadrantes[id].color} opacity-30 hover:opacity-80 
                        border-2 ${cuadrantes[id].borderColor} hover:border-white/70 rounded-lg 
                        flex items-center justify-center cursor-pointer transition-all
                        group overflow-hidden`}
                    style={{
                        top: pos.top,
                        left: pos.left,
                        width: pos.width,
                        height: pos.height,
                        clipPath: formasPersonalizadas[id],
                        borderRadius: 0  // Importante para que no conflito con clip-path
                    }}
                >
                    <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 
                        group-hover:opacity-100 transition-opacity" />
                    <div className="text-center text-white p-4">
                        <span className="md:text-1xl font-bold block mb-1">
                            {cuadrantes[id].nombre}
                        </span>
                        <span className="text-sm md:text-base opacity-100">
                            {ubicaciones[id]?.length} lugares
                        </span>
                    </div>
                </motion.button>
            ))}
        </div>
    );
};

export default MapCuadrantesOverlay;
