import { useState } from "react";
import { MdAddCircle, MdInfo } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";

import { ModalFormulario } from "./formulario";
import { ModalResumen } from "./resumen";

const Table = () => {

    const [modal, setModal] = useState(null);
    // null | "agregar" | "eliminar" | "resumen"

    const cerrarModal = () => {
        setModal(null);
    };

    return (
        <>
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
                    <tr className="hover:bg-gray-300 text-center">
                        <td>1</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>

                        <td className="py-2 text-center">

                            {/* AGREGAR */}
                            <MdAddCircle
                                title="Agregar acción"
                                onClick={() => setModal("agregar")}
                                className="h-7 w-7 text-green-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                            />

                            {/* ELIMINAR */}
                            <IoIosRemoveCircle
                                title="Eliminar acción"
                                onClick={() => setModal("eliminar")}
                                className="h-7 w-7 text-red-900 cursor-pointer inline-block mr-2 hover:text-red-600"
                            />

                            {/* RESUMEN */}
                            <MdInfo
                                title="Ver resumen"
                                onClick={() => setModal("resumen")}
                                className="h-7 w-7 text-blue-800 cursor-pointer inline-block mr-2 hover:text-blue-600"
                            />

                        </td>
                    </tr>
                </tbody>
            </table>

            {/* ================= MODALES ================= */}

            {modal === "agregar" && (
                <ModalFormulario
                    accion="Agregar Acción"
                    onClose={cerrarModal}
                />
            )}

            {modal === "eliminar" && (
                <ModalFormulario
                    accion="Eliminar Acción"
                    onClose={cerrarModal}
                />
            )}

            {modal === "resumen" && (
                <ModalResumen
                    onClose={cerrarModal}
                />
            )}
        </>
    );
};

export default Table;