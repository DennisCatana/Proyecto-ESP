import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiAlertCircle, FiCheck, FiArrowLeft } from "react-icons/fi";
import { api } from "../../services/api";
import BackgroundCarousel from "../../components/layout/Carusel";
import ModalMensaje from "../../components/ui/Modalalerta";

const LoginPage = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [isRecoveryMode, setIsRecoveryMode] = useState(false);
    const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTipo, setModalTipo] = useState("info");
    const [modalMensaje, setModalMensaje] = useState("");

    const images = [
        "/images/image9.jpeg",
        "/images/image7.jpeg",
        "/images/image6.jpeg",
        "/images/image10.jpeg",
    ];

    // LOGIN
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {

            const response = await api.post("/login", {
                correoU: email,
                passwordU: password
            });

            if (response.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("usuario", JSON.stringify(response.usuario));
            }

            // Primer login -> cambiar contraseña
            if (response.cambioPassword) {
                setIsChangePasswordMode(true);
                setLoading(false);
                return;
            }

            setModalTipo("success");
            setModalMensaje("Inicio de sesión correcto");
            setModalOpen(true);

            setTimeout(() => {
                navigate("/home");
            }, 1200);

        } catch (err) {

            console.error(err);

            setModalTipo("error");
            setModalMensaje(err.response?.data?.msg || "Credenciales incorrectas");
            setModalOpen(true);

        } finally {
            setLoading(false);
        }
    };

    // CAMBIAR PASSWORD
    const handleChangePassword = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        const passwordU = e.target.passwordU.value;
        const confirmarpassword = e.target.confirmarpassword.value;

        if (passwordU !== confirmarpassword) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        try {

            const response = await api.put("/cambiarpassword", {
                passwordU,
                confirmarpassword
            });

            if (response.msg) {

                setChangePasswordSuccess(true);
                setSuccess("Contraseña actualizada correctamente");

                const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
                usuario.cambioPassword = false;
                localStorage.setItem("usuario", JSON.stringify(usuario));

                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            }

        } catch (err) {

            setError(err.response?.data?.msg || "Error al cambiar la contraseña");

        } finally {
            setLoading(false);
        }
    };

    // RECUPERAR PASSWORD
    const handleRecovery = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        const email = e.target.email.value;

        try {

            await api.post("/recuperarpassword", {
                correoU: email
            });

            setSuccess("Se ha enviado un correo de recuperación.");

        } catch (err) {

            setError(err.response?.data?.msg || "Error al recuperar contraseña");

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center overflow-hidden relative bg-gray-100">

            <BackgroundCarousel images={images} />

            <div className="relative z-20 w-full max-w-md px-4">

                <h1 className="text-2xl font-bold text-center mb-6 text-[#1a4572]">
                    AETERNUS <br /> LXXXIX
                </h1>

                <div className="bg-white p-8 rounded-xl shadow-2xl">

                    {isChangePasswordMode ? (

                        <>
                            <h2 className="text-2xl font-bold text-center mb-2 text-[#153557]">
                                Cambiar Contraseña
                            </h2>

                            <p className="text-center text-gray-600 text-sm mb-6">
                                Esta es tu primera sesión. Ingresa una nueva contraseña.
                            </p>

                            <form onSubmit={handleChangePassword}>

                                <div className="mb-5">

                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Nueva Contraseña
                                    </label>

                                    <div className="relative">

                                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                        <input
                                            type="password"
                                            name="passwordU"
                                            required
                                            minLength={6}
                                            className="w-full pl-10 p-3 border rounded-lg"
                                        />

                                    </div>

                                </div>

                                <div className="mb-6">

                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Confirmar Contraseña
                                    </label>

                                    <div className="relative">

                                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                        <input
                                            type="password"
                                            name="confirmarpassword"
                                            required
                                            minLength={6}
                                            className="w-full pl-10 p-3 border rounded-lg"
                                        />

                                    </div>

                                </div>

                                {error && (
                                    <div className="text-red-600 text-sm mb-3 flex items-center gap-2">
                                        <FiAlertCircle /> {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="text-green-600 text-sm mb-3 flex items-center gap-2">
                                        <FiCheck /> {success}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#153557] text-white py-3 rounded-lg"
                                >
                                    {loading ? "Cambiando..." : "Cambiar contraseña"}
                                </button>

                            </form>

                        </>

                    ) : (

                        <>
                            <h2 className="text-2xl font-bold text-center mb-6 text-[#153557]">
                                {isRecoveryMode ? "Recuperar contraseña" : "Iniciar sesión"}
                            </h2>

                            <form onSubmit={isRecoveryMode ? handleRecovery : handleSubmit}>

                                <div className="mb-5">

                                    <label className="block mb-2 text-sm font-medium">
                                        Correo electrónico
                                    </label>

                                    <div className="relative">

                                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="w-full pl-10 p-3 border rounded-lg"
                                        />

                                    </div>

                                </div>

                                {!isRecoveryMode && (

                                    <div className="mb-6">

                                        <label className="block mb-2 text-sm font-medium">
                                            Contraseña
                                        </label>

                                        <div className="relative">

                                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                            <input
                                                type="password"
                                                name="password"
                                                required
                                                className="w-full pl-10 p-3 border rounded-lg"
                                            />

                                        </div>

                                    </div>

                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#153557] text-white py-3 rounded-lg"
                                >
                                    {loading ? "Procesando..." : isRecoveryMode ? "Enviar correo" : "Ingresar"}
                                </button>

                                <div className="mt-5 text-center">

                                    {isRecoveryMode ? (

                                        <button
                                            type="button"
                                            onClick={() => setIsRecoveryMode(false)}
                                            className="text-sm text-[#153557] hover:underline"
                                        >
                                            <FiArrowLeft className="inline mr-1" />
                                            Volver al login
                                        </button>

                                    ) : (

                                        <button
                                            type="button"
                                            onClick={() => setIsRecoveryMode(true)}
                                            className="text-sm text-[#153557] hover:underline"
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </button>

                                    )}

                                </div>

                            </form>

                        </>
                    )}

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