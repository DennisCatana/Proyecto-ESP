export const ModalResumen = ({ onClose }) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">

            <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-300 w-150">

                <h2 className="text-xl font-bold mb-4 border-b pb-2">
                    Resumen de Acciones
                </h2>

                <p>Aquí puedes mostrar el historial del cadete...</p>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-green-600 px-4 py-2 rounded text-white"
                    >
                        Cerrar
                    </button>
                </div>

            </div>
        </div>
    );
};