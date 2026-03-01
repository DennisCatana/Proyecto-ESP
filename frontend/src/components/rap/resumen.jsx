import { useEffect, useState } from "react";
import { api } from "../../services/api";

export const ModalResumen = ({ onClose, cadete }) => {

    const [acciones, setAcciones] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalAcciones, setTotalAcciones] = useState(0);
    const [positivas, setPositivas] = useState(0);
    const [negativas, setNegativas] = useState(0);

    useEffect(() => {
        if (cadete?.id) {
            cargarResumen();
        }
    }, [cadete]);

    const cargarResumen = async () => {
        try {
            const data = await api.get(`/cadeteresumen/${cadete.id}`);

            console.log("Respuesta backend:", data);

            setAcciones(Array.isArray(data?.acciones) ? data.acciones : []);
            setTotal(data?.puntajeTotal ?? 0);
            setTotalAcciones(data?.totalAcciones ?? 0);
            setPositivas(data?.accionesPositivas ?? 0);
            setNegativas(data?.accionesNegativas ?? 0);

        } catch (error) {
            console.error(error);
            setAcciones([]);
            setTotal(0);
            setTotalAcciones(0);
            setPositivas(0);
            setNegativas(0);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-300 w-150">

                <h2 className="text-xl font-bold mb-4 border-b pb-2">
                    Resumen del kdt. {cadete?.nombre}
                </h2>

                {/* 🔹 Puntaje Total */}
                <p className="mb-4 font-semibold text-lg">
                    Puntaje Total: {Number(total).toFixed(2)}
                </p>

                {/* 🔹 Estadísticas */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="bg-gray-100 p-3 rounded text-center">
                        <p className="font-semibold">Total</p>
                        <p className="text-lg">{totalAcciones}</p>
                    </div>

                    <div className="bg-green-100 p-3 rounded text-center text-green-700">
                        <p className="font-semibold">Positivas</p>
                        <p className="text-lg">{positivas}</p>
                    </div>

                    <div className="bg-red-100 p-3 rounded text-center text-red-700">
                        <p className="font-semibold">Negativas</p>
                        <p className="text-lg">{negativas}</p>
                    </div>
                </div>

                {/* 🔹 Listado */}
                <div className="max-h-80 overflow-y-auto">

                    {acciones.length === 0 ? (
                        <p>No hay acciones registradas</p>
                    ) : (
                        acciones.map((a) => {

                            const esPositiva = Number(a.puntajeAplicado) >= 0;

                            return (
                                <div
                                    key={a.id}
                                    className={`border-b py-3 text-sm ${
                                        esPositiva ? "bg-green-50" : "bg-red-50"
                                    }`}
                                >
                                    <p className="font-semibold">
                                        {a.accionDefinida?.descripcion}
                                    </p>

                                    <p>
                                        Puntaje aplicado:{" "}
                                        <span
                                            className={`font-bold ${
                                                esPositiva
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {a.puntajeAplicado}
                                        </span>
                                    </p>

                                    {a.observacion && (
                                        <p className="text-gray-600">
                                            Obs: {a.observacion}
                                        </p>
                                    )}

                                    <p className="text-gray-400 text-xs">
                                        {new Date(a.fecha).toLocaleDateString()}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>

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