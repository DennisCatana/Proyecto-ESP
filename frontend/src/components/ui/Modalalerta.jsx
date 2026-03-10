import { motion } from "framer-motion";

const ModalMensaje = ({ open, onClose, tipo = "info", mensaje = "" }) => {

    if (!open) return null;

    const colores = {
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500",
        info: "bg-blue-500"
    };

    const iconos = {
        success: "✓",
        error: "✕",
        warning: "⚠",
        info: "i"
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl shadow-2xl p-6 w-80 text-center"
            >

                <div className={`w-14 h-14 mx-auto mb-4 rounded-full ${colores[tipo]} flex items-center justify-center text-white text-2xl`}>
                    {iconos[tipo]}
                </div>

                <p className="text-gray-700 mb-6">
                    {typeof mensaje === "string" ? mensaje : "Mensaje no válido"}
                </p>

                <button
                    onClick={onClose}
                    className="px-5 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
                >
                    Aceptar
                </button>

            </motion.div>
        </div>
    );
};

export default ModalMensaje;