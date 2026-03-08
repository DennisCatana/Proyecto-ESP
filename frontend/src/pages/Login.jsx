import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiArrowLeft, FiCheck, FiAlertCircle } from "react-icons/fi";
import { api } from "../services/api";

// Importar imágenes desde src/assets
import image9 from '../assets/images/image9.jpeg';
import image7 from '../assets/images/image7.jpeg';
import image6 from '../assets/images/image6.jpeg';
import image10 from '../assets/images/image10.jpeg';

const LoginPage = () => {
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isRecoveryMode, setIsRecoveryMode] = useState(false);
    const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);
    
    const images = useMemo(() => [
        image9,
        image7,
        image6,
        image10,
    ], []);

    // Manejo de cambio de contraseña
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

        if (passwordU.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
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
                
                // Actualizar el usuario en localStorage
                const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
                usuario.cambioPassword = false;
                localStorage.setItem("usuario", JSON.stringify(usuario));
                
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            }
        } catch (err) {
            console.error("Error cambio password:", err);
            setError(err.response?.data?.msg || err.message || "Error al cambiar la contraseña");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        setError("");
        setSuccess("");

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await api.post("/login", {
                correoU: email,
                passwordU: password
            });

            // Verificar si necesita cambiar contraseña
            if (response.cambioPassword) {
                // Guardar token y datos del usuario
                localStorage.setItem("token", response.token);
                // Crear objeto de usuario con los datos disponibles
                const usuarioData = {
                    id: response.id || response.usuario?.id,
                    nombreU: response.nombreU || response.usuario?.nombreU,
                    correoU: response.correoU || response.usuario?.correoU,
                    rol: response.rol || response.usuario?.rol,
                    cambioPassword: true
                };
                localStorage.setItem("usuario", JSON.stringify(usuarioData));
                // Cambiar al modo de cambio de contraseña
                setIsChangePasswordMode(true);
                return;
            }

            // Guardar token y datos del usuario
            if (response.token) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("usuario", JSON.stringify(response.usuario));
                
                // Redireccionar según el rol
                navigate("/home");
            } else {
                setError("Respuesta inválida del servidor");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message || "Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
    };

    const handleRecovery = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const email = e.target.email.value;

        try {
            await api.post("/recuperarpassword", { correoU: email });
            setSuccess("Se ha enviado un correo de recuperación a tu bandeja de entrada.");
        } catch (err) {
            console.error("Recovery error:", err);
            setError(err.message || "Error al solicitar recuperación de contraseña");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-center overflow-hidden relative bg-gray-100">

            {/* Estilos para la animación personalizada */}
            <style>{`
                @keyframes fadeSlide {
                    0% { opacity: 0; }
                    10% { opacity: 1; }
                    40% { opacity: 1; }
                    50% { opacity: 0; }
                    100% { opacity: 0; }
                }
                .animate-fade-slide {
                    animation: fadeSlide 10s infinite;
                }
            `}</style>

            {/* === FONDO (Background) === */}
            <div className="fixed inset-0 z-0">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 animate-fade-slide"
                        style={{
                            backgroundImage: `url(${img})`,
                            animationDelay: `${index * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* === OVERLAY OSCURO === */}
            <div className="fixed inset-0 bg-black/40 z-10"></div>

            {/* === CONTENEDOR PRINCIPAL === */}
            <div className="relative z-20 w-full max-w-md px-4">
                <h1 className="text-2xl font-bold text-center mb-6 text-[#1a4572]">
                    AETERNUS<br />
                    LXXXIX
                </h1>

                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    
                    {/* === MODO CAMBIO DE CONTRASEÑA === */}
                    {isChangePasswordMode ? (
                        <>
                            <h2 className="text-2xl font-bold text-center mb-2 text-[#153557]">
                                Cambiar Contraseña
                            </h2>
                            
                            <p className="text-center text-gray-600 text-sm mb-6">
                                Esta es tu primera sesión. Por favor ingresa una nueva contraseña.
                            </p>

                            <form onSubmit={handleChangePassword}>
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Nueva Contraseña
                                    </label>
                                    <div className="relative">
                                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                        <input
                                            type="password"
                                            name="passwordU"
                                            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#153557] bg-gray-50"
                                            placeholder="Ingresa tu nueva contraseña"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Confirmar Contraseña
                                    </label>
                                    <div className="relative">
                                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                                        <input
                                            type="password"
                                            name="confirmarpassword"
                                            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#153557] bg-gray-50"
                                            placeholder="Confirma tu nueva contraseña"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm flex items-center gap-2">
                                        <FiAlertCircle />
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm flex items-center gap-2">
                                        <FiCheck />
                                        {success}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || changePasswordSuccess}
                                    className="w-full text-white bg-[#153557] hover:bg-[#0f2540] font-bold rounded-lg text-base px-5 py-3 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Cambiando..." : changePasswordSuccess ? "¡Completado!" : "Cambiar Contraseña"}
                                </button>

                                {!changePasswordSuccess && (
                                    <div className="mt-4 text-center">
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                localStorage.removeItem("token");
                                                localStorage.removeItem("usuario");
                                                setIsChangePasswordMode(false);
                                                setError("");
                                                setSuccess("");
                                            }}
                                            className="text-sm text-red-600 hover:underline"
                                        >
                                            Cancelar y cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </form>
                        </>
                    ) : (
                        <>
                            {/* === MODO LOGIN NORMAL === */}
                            <h2 className="text-2xl font-bold text-center mb-6 text-[#153557]">
                                {isRecoveryMode ? "Recuperar Contraseña" : "Iniciar Sesión"}
                            </h2>

                            <form onSubmit={isRecoveryMode ? handleRecovery : handleSubmit}>

                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        {isRecoveryMode ? "Correo electrónico registrado" : "Correo electrónico"}
                                    </label>

                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#153557] bg-gray-50"
                                            placeholder="correo@ejemplo.com"
                                            required
                                        />
                                    </div>
                                </div>

                                {!isRecoveryMode && (
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Contraseña
                                        </label>
                                        <div className="relative">
                                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                                            <input
                                                type="password"
                                                name="password"
                                                className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#153557] bg-gray-50"
                                                placeholder="**************"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                                        {success}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full text-white bg-[#153557] hover:bg-[#0f2540] font-bold rounded-lg text-base px-5 py-3 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Procesando..." : (isRecoveryMode ? "Enviar correo de recuperación" : "Ingresar")}
                                </button>

                                <div className="mt-5 text-center">
                                    {isRecoveryMode ? (
                                        <button 
                                            type="button"
                                            onClick={() => { setIsRecoveryMode(false); setError(""); setSuccess(""); }}
                                            className="text-sm text-[#153557] hover:underline flex items-center justify-center w-full"
                                        >
                                            <FiArrowLeft className="mr-1" /> Volver a Iniciar Sesión
                                        </button>
                                    ) : (
                                        <button 
                                            type="button"
                                            onClick={() => { setIsRecoveryMode(true); setError(""); setSuccess(""); }}
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
        </div>
    );
};

export default LoginPage;

