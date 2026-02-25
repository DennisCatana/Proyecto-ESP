import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Users, Clock, Image as ImageIcon, Phone, Mail } from 'lucide-react';

const MapInfoPanel = ({ ubicacion, onClose }) => {
    const [imagenActual, setImagenActual] = useState(0);
    
    if (!ubicacion) return null;
    
    const imagenes = ubicacion.imagenes || ["/images"];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                    {/* Imagen principal */}
                    <div className="relative h-64 bg-gray-800 rounded-t-2xl overflow-hidden">
                        <img 
                            src={imagenes[imagenActual]} 
                            alt={ubicacion.nombre}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "/images";
                            }}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-800 via-transparent to-transparent" />
                        
                        {/* Navegación de imágenes */}
                        {imagenes.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {imagenes.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setImagenActual(idx)}
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                            idx === imagenActual ? 'bg-white' : 'bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}

                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                        >
                            <X size={20} className="text-white" />
                        </button>
                    </div>

                    {/* Contenido */}
                    <div className="p-6 space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">{ubicacion.nombre}</h2>
                            <p className="text-red-500 text-sm mt-1">Escuela Superior de Policía</p>
                        </div>
                        
                        <div>
                            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                                <MapPin size={18} className="text-red-500" /> Descripción
                            </h3>
                            <p className="text-gray-300 leading-relaxed">{ubicacion.descripcion}</p>
                        </div>

                        {/* Mini galería */}
                        {imagenes.length > 1 && (
                            <div>
                                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                                    <ImageIcon size={18} className="text-red-500" /> Galería
                                </h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {imagenes.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setImagenActual(idx)}
                                            className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                                                idx === imagenActual ? 'border-red-500' : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <img 
                                                src={img} 
                                                alt={`Imagen ${idx + 1}`}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    e.target.src = "/images";
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-700/50 p-4 rounded-xl">
                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                    <Users size={16} className="text-red-500" /> Capacidad
                                </div>
                                <p className="text-white font-semibold">{ubicacion.capacidad}</p>
                            </div>
                            <div className="bg-slate-700/50 p-4 rounded-xl">
                                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                                    <Clock size={16} className="text-red-500" /> Horario
                                </div>
                                <p className="text-white font-semibold">{ubicacion.horario}</p>
                            </div>
                        </div>

                        {/* Contacto */}
                        <div className="border-t border-gray-600 pt-4">
                            <h3 className="text-white font-semibold mb-3">Información de Contacto</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Phone size={16} className="text-red-500" />
                                    <span>+593 2 xxx xxxx</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Mail size={16} className="text-red-500" />
                                    <span>informes@esp.edu.ec</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-700 flex gap-3">
                        <button onClick={onClose} className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors">
                            Cerrar
                        </button>
                        <button className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-colors">
                            Cómo Llegar
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MapInfoPanel;
