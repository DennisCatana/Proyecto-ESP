import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { api } from "../../services/api"; // ajusta la ruta si es necesario
import BackgroundCarousel from "../../components/layout/Carusel"
import ModalMensaje from "../../components/ui/Modalalerta";

const LoginPage = () => {
    const [correoU, setCorreoU] = useState("");
    const [passwordU, setPasswordU] = useState("");
    const navigate = useNavigate(); // 👈 Hook de navegación

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTipo, setModalTipo] = useState("info");
    const [modalMensaje, setModalMensaje] = useState("");

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

            const data = await api.post("/login", {
                correoU,
                passwordU
            });

            if (data.token) {

                localStorage.setItem("token", data.token);

                if (data.usuario) {
                    localStorage.setItem("usuario", JSON.stringify(data.usuario));
                }

                setModalTipo("success");
                setModalMensaje("Inicio de sesión correcto");
                setModalOpen(true);

                setTimeout(() => {

                    if (data.cambioPassword) {
                        navigate("/cambiar-password");
                    } else {
                        navigate("/home");
                    }

                }, 1200);

            }

        } catch (error) {

            setModalTipo("error");
            setModalMensaje(error.message);
            setModalOpen(true);

        }
    };


    return (
        <div className="min-h-screen flex justify-center items-center overflow-hidden relative bg-gray-100">

            <BackgroundCarousel images={images} />

            {/* === CONTENEDOR PRINCIPAL === */}
            <div className="relative z-20 w-full max-w-md px-4">
                <h1 className="text-2xl font-bold text-center mb-6 text-[#1a4572]">
                    AETERNUS<br />
                    LXXXIX
                </h1>

                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-center mb-6 text-[#153557]">
                        Iniciar Sesión
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Correo electrónico
                            </label>

                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                                <input
                                    type="email"
                                    value={correoU}
                                    onChange={(e) => setCorreoU(e.target.value)}
                                    className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#153557] bg-gray-50"
                                    placeholder="denniscataña@gmail.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Contraseña
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                                <input
                                    type="password"
                                    value={passwordU}
                                    onChange={(e) => setPasswordU(e.target.value)}
                                    className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#153557] bg-gray-50"
                                    placeholder="**************"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-[#153557] hover:bg-[#0f2540] font-bold rounded-lg text-base px-5 py-3 transition-colors duration-200"
                        >
                            Ingresar
                        </button>

                        <div className="mt-5 text-center">
                            <button
                                type="button"
                                onClick={() => navigate("/recuperarpassword")}
                                className="text-sm text-[#153557] hover:underline"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
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

export default LoginPage;