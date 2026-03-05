import { useState, useEffect } from "react";
import { MdAddCircle, MdInfo } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import { api } from "../../services/api.js";
import { ModalFormulario } from "./formulario";
import { ModalResumen } from "./resumen";

const Table = () => {

    const [cadetes, setCadetes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [cadeteSeleccionado, setCadeteSeleccionado] = useState(null);
    const [refreshResumen, setRefreshResumen] = useState(0);
    const [modal, setModal] = useState(null);

    const registrosPorPagina = 10;

    useEffect(() => {
        cargarCadetes();
    }, []);

    const cargarCadetes = async () => {
        try {
            const data = await api.get("/cadetes");
            setCadetes(data);
        } catch (error) {
            console.error("Error cargando cadetes:", error);
        }
    };

    const cerrarModal = () => {
        setModal(null);
        setCadeteSeleccionado(null);
    };

    // 🔎 FILTRAR POR NOMBRE
    const cadetesFiltrados = cadetes.filter((cadete) =>
        cadete.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    // 🔹 PAGINACIÓN
    const indiceInicial = (paginaActual - 1) * registrosPorPagina;
    const indiceFinal = indiceInicial + registrosPorPagina;
    const totalPaginas = Math.ceil(cadetesFiltrados.length / registrosPorPagina);

    const cadetesPaginados = cadetesFiltrados.slice(indiceInicial, indiceFinal);

    return (
        <>
            {/* 🔎 BUSCADOR */}
            <div className="flex justify-end mt-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(e.target.value);
                        setPaginaActual(1); // volver a página 1 al buscar
                    }}
                    className="border px-3 py-2 rounded w-64"
                />
            </div>

            <table className="w-full mt-5 table-auto shadow-lg bg-white">

                <thead className="bg-gray-800 text-slate-400">
                    <tr>
                        {["N°", "Promoción", "CIA", "Cédula", "Nombre y Apellido", "Antigüedad", "Sección", "Acciones"]
                            .map((header) => (
                                <th key={header} className="p-2">{header}</th>
                            ))}
                    </tr>
                </thead>

                <tbody>
                    {cadetesPaginados.map((cadete, index) => (
                        <tr key={cadete.id} className="hover:bg-gray-300 text-center">

                            <td>{indiceInicial + index + 1}</td>
                            <td>{cadete.promocion}</td>
                            <td>{cadete.cia}</td>
                            <td>{cadete.cedula}</td>
                            <td>kdt. {cadete.nombre}</td>
                            <td>{cadete.antiguedad}</td>
                            <td>{cadete.seccion}</td>

                            <td className="py-2 text-center">

                                <MdAddCircle
                                    onClick={() => {
                                        setCadeteSeleccionado(cadete);
                                        setModal("agregar");
                                    }}
                                    className="h-7 w-7 text-green-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                                />

                                <IoIosRemoveCircle
                                    onClick={() => {
                                        setCadeteSeleccionado(cadete);
                                        setModal("eliminar");
                                    }}
                                    className="h-7 w-7 text-red-900 cursor-pointer inline-block mr-2 hover:text-red-600"
                                />

                                <MdInfo
                                    onClick={() => {
                                        setCadeteSeleccionado(cadete);
                                        setModal("resumen");
                                    }}
                                    className="h-7 w-7 text-blue-800 cursor-pointer inline-block hover:text-blue-600"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 🔹 PAGINACIÓN */}
            <div className="flex justify-center items-center gap-4 mt-4">

                <button
                    onClick={() => setPaginaActual(paginaActual - 1)}
                    disabled={paginaActual === 1}
                    className="px-3 py-1 bg-gray-700 text-white rounded disabled:bg-gray-400"
                >
                    ←
                </button>

                <span className="font-semibold">
                    Página {paginaActual} de {totalPaginas || 1}
                </span>

                <button
                    onClick={() => setPaginaActual(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                    className="px-3 py-1 bg-gray-700 text-white rounded disabled:bg-gray-400"
                >
                    →
                </button>

            </div>

            {/* ================= MODALES ================= */}

            {modal === "agregar" && (
                <ModalFormulario
                    tipo="Positiva"
                    accion="Agregar Acción"
                    cadete={cadeteSeleccionado}
                    onClose={cerrarModal}
                    onAccionRegistrada={() => setRefreshResumen(prev => prev + 1)}
                />
            )}

            {modal === "eliminar" && (
                <ModalFormulario
                    tipo="Negativa"
                    accion="Eliminar Acción"
                    cadete={cadeteSeleccionado}
                    onClose={cerrarModal}
                    onAccionRegistrada={() => setRefreshResumen(prev => prev + 1)}
                />
            )}

            {modal === "resumen" && (
                <ModalResumen
                    cadete={cadeteSeleccionado}
                    onClose={cerrarModal}
                    refresh={refreshResumen}

                />
            )}
        </>
    );
};

export default Table;
