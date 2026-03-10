import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { api } from "../../services/api";
import ModalMensaje from "../../components/ui/Modalalerta";
import BackgroundCarousel from "../../components/layout/Carusel"


const RecuperarPassword = () => {

    const [correoU, setCorreoU] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTipo, setModalTipo] = useState("info");
    const [modalMensaje, setModalMensaje] = useState("");
    const navigate = useNavigate();


    // Las imágenes en public/ se acceden con ruta string (sin import)
    const images = [
        "/images/image9.jpeg",
        "/images/image7.jpeg",
        "/images/image6.jpeg",
        "/images/image10.jpeg",
    ];


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/recuperarpassword", {
                correoU
            });

            setModalTipo("success");
            setModalMensaje("Te enviamos un correo para recuperar tu contraseña");
            setModalOpen(true);

        } catch (error) {

            setModalTipo("error");
            setModalMensaje(error.message);
            setModalOpen(true);

        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center overflow-hidden relative bg-gray-100">

            <BackgroundCarousel images={images} />

            <div className="relative z-20 w-full max-w-md px-4">
                <h1 className="text-2xl font-bold text-center mb-6 text-[#1a4572]">
                    AETERNUS<br />
                    LXXXIX
                </h1>

                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-center mb-6 text-[#153557]">
                        Olvido Su Contraseña
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Ingresa tu correo
                        </label>

                        <div className="relative mb-6">

                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                            <input
                                type="email"
                                value={correoU}
                                onChange={(e) => setCorreoU(e.target.value)}
                                className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#153557]  bg-gray-50"
                                placeholder="correo@email.com"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#153557] text-white font-bold py-3 rounded-lg hover:bg-[#0f2540]"
                        >
                            Enviar correo
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="w-full mt-4 text-sm text-gray-500 hover:underline"
                        >
                            Volver al login
                        </button>
                    </form>
                </div>
            </div>
            <ModalMensaje
                open={modalOpen}
                tipo={modalTipo}
                mensaje={modalMensaje}
                onClose={() => setModalOpen(false)}
            />

        </div>

    );
};

export default RecuperarPassword;