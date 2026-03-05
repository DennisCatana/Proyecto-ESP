import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Select from "react-select";

export const ModalFormulario = ({ onClose, cadete, tipo, onAccionRegistrada }) => {

    const [acciones, setAcciones] = useState([]);
    const [codigoSeleccionado, setCodigoSeleccionado] = useState("");
    const [observacion, setObservacion] = useState("");
    const opciones = acciones.map(a => ({
        value: a.codigo,
        label: a.descripcion
    }));
    const [fecha, setFechaHora] = useState("");

    useEffect(() => {
        cargarAcciones();
    }, []);

    const cargarAcciones = async () => {
        try {
            const data = await api.get("/acciones");

            // Filtrar por tipo (Positiva / Negativa)
            const filtradas = data.filter(a => a.tipo === tipo && a.activa);

            setAcciones(filtradas);
        } catch (error) {
            console.error("Error cargando acciones:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!codigoSeleccionado) {
            alert("Seleccione una acción");
            return;
        }

        try {
            const response = await api.post("/registroaccion", {
                cadeteId: cadete.id,
                codigo: codigoSeleccionado,
                observacion
            });

            alert("Acción registrada correctamente");
            onAccionRegistrada();
            onClose();

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || "Error al registrar");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">

            <div className="bg-white p-6 rounded-xl w-125 shadow-lg">

                <h2 className="text-xl font-bold mb-4">
                    Acción {tipo} - {cadete.nombre}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <Select
                            options={opciones}
                            value={opciones.find(o => o.value === codigoSeleccionado) || null}
                            onChange={(selected) => setCodigoSeleccionado(selected?.value || "")}
                            placeholder="Seleccione acción"
                            isClearable
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="datetime-local"
                            value={fecha}
                            onChange={(e) => setFechaHora(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <textarea
                        placeholder="Observación (opcional)"
                        value={observacion}
                        onChange={(e) => setObservacion(e.target.value)}
                        className="w-full border p-2 mb-4 rounded"
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 px-4 py-2 rounded text-white"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className={`px-4 py-2 rounded text-white ${tipo === "Positiva"
                                ? "bg-green-600"
                                : "bg-red-600"
                                }`}
                        >
                            Guardar
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};