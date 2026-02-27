import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

const LoginPage = () => {
    const navigate = useNavigate(); // 👈 Hook de navegación

    // Las imágenes en public/ se acceden con ruta string (sin import)
    const images = [
        "/images/image9.jpeg",
        "/images/image7.jpeg",
        "/images/image6.jpeg",
        "/images/image10.jpeg",
    ];

    const handleSubmit = (e) => {
        e.preventDefault(); // evita recarga

        // 🔐 Aquí luego irá tu login real con backend

        navigate("/home"); // redirige a Home
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
                    AETHERNUS<br />
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
                            <a href="#" className="text-sm text-[#153557] hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;