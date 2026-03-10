import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { api } from "../../services/api";
import ModalMensaje from "../../components/ui/Modalalerta";
import BackgroundCarousel from "../../components/layout/Carusel";
import { useEffect } from "react";

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTipo, setModalTipo] = useState("info");
    const [modalMensaje, setModalMensaje] = useState("");

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        const verificarToken = async () => {
            try {
                await api.get(`/recuperarpassword/${token}`);
            } catch (error) {
                setModalTipo("error");
                setModalMensaje("Token inválido o expirado");
                setModalOpen(true);

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        };

        if (token) verificarToken();
    }, [token]);

    const images = [
        "/images/image9.jpeg",
        "/images/image7.jpeg",
        "/images/image6.jpeg",
        "/images/image10.jpeg",
    ];

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            setModalTipo("error");
            setModalMensaje("Las contraseñas no coinciden");
            setModalOpen(true);
            return;
        }

        try {

            await api.post(`/nuevapassword/${token}`, {
                passwordU: password,
                confirmarpassword: confirmPassword
            });

            setModalTipo("success");
            setModalMensaje("Contraseña actualizada correctamente");
            setModalOpen(true);

            setTimeout(() => {
                navigate("/");
            }, 1500);

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
                        Restablecer contraseña
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Nueva contraseña
                        </label>

                        <div className="relative mb-5">

                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#153557]"
                                required
                            />

                        </div>

                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Confirmar contraseña
                        </label>

                        <div className="relative mb-6">

                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#153557]"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#153557] text-white font-bold py-3 rounded-lg hover:bg-[#0f2540]"
                        >
                            Cambiar contraseña
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

export default ResetPassword;