import { useRef, useState, useEffect } from "react";

export const ModalFormulario = ({ onClose, accion }) => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [mostrarCamara, setMostrarCamara] = useState(false);
    const [imagen, setImagen] = useState(null); // base64 preview
    const [imagenFile, setImagenFile] = useState(null); // archivo real
    const [stream, setStream] = useState(null);

    const [formData, setFormData] = useState({
        accion: "",
        fecha: "",
        hora: "",
        observacion: ""
    });

    // ===============================
    // ABRIR CÁMARA
    // ===============================
    const abrirCamara = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            setMostrarCamara(true);
        } catch (error) {
            alert("No se pudo acceder a la cámara");
        }
    };

    useEffect(() => {
        if (mostrarCamara && videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [mostrarCamara, stream]);

    // ===============================
    // CAPTURAR FOTO
    // ===============================
    const capturarFoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);

        const base64 = canvas.toDataURL("image/png");
        setImagen(base64);

        // Convertir base64 a archivo real
        const byteString = atob(base64.split(",")[1]);
        const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        const file = new File([ab], "foto.png", { type: mimeString });
        setImagenFile(file);

        cerrarCamara();
    };

    // ===============================
    // CERRAR CÁMARA
    // ===============================
    const cerrarCamara = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setMostrarCamara(false);
        setStream(null);
    };

    // ===============================
    // MANEJAR INPUTS
    // ===============================
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ===============================
    // ENVIAR AL BACKEND (PRISMA)
    // ===============================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagenFile) {
            alert("Debe capturar una foto");
            return;
        }

        const data = new FormData();
        data.append("accion", formData.accion);
        data.append("fecha", formData.fecha);
        data.append("hora", formData.hora);
        data.append("observacion", formData.observacion);
        data.append("imagen", imagenFile);

        try {
            const response = await fetch("http://localhost:3000/api/acciones", {
                method: "POST",
                body: data
            });

            if (!response.ok) throw new Error("Error al guardar");

            alert("Acción registrada correctamente");
            onClose();

        } catch (error) {
            console.error(error);
            alert("Error al registrar la acción");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">

            <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-300 w-150">

                <h2 className="text-xl font-bold mb-4 border-b pb-2">
                    {accion}
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="accion"
                        value={formData.accion}
                        onChange={handleChange}
                        placeholder="Ingrese la acción"
                        list="acciones"
                        className="w-full border p-2 mb-3 rounded"
                        required
                    />

                    <datalist id="acciones">
                        <option value="Calzado limpio" />
                        <option value="Técnico" />
                        <option value="Tesorero" />
                        <option value="Administrador" />
                    </datalist>

                    <input
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        className="w-full border p-2 mb-3 rounded"
                        required
                    />

                    <input
                        type="time"
                        name="hora"
                        value={formData.hora}
                        onChange={handleChange}
                        className="w-full border p-2 mb-3 rounded"
                        required
                    />

                    <input
                        type="text"
                        name="observacion"
                        value={formData.observacion}
                        onChange={handleChange}
                        placeholder="Observaciones"
                        className="w-full border p-2 mb-3 rounded"
                    />

                    <div className="relative flex items-center mt-4">

                        <button
                            type="button"
                            onClick={() => { cerrarCamara(); onClose(); }}
                            className="bg-gray-500 px-4 py-2 rounded text-white"
                        >
                            Cancelar
                        </button>

                        <div className="absolute left-1/2 -translate-x-1/2">
                            <button
                                type="button"
                                onClick={abrirCamara}
                                className="bg-blue-600 px-5 py-2 rounded-full text-white"
                            >
                                📷 Cámara
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="ml-auto bg-green-600 px-4 py-2 rounded text-white"
                        >
                            Guardar
                        </button>

                    </div>

                    {mostrarCamara && (
                        <div className="mt-6 text-center">
                            <video
                                ref={videoRef}
                                autoPlay
                                className="w-[320px] h-60 object-cover rounded-lg border shadow-md mx-auto"
                            />
                            <button
                                type="button"
                                onClick={capturarFoto}
                                className="mt-3 bg-red-600 px-4 py-2 rounded text-white"
                            >
                                Capturar
                            </button>
                        </div>
                    )}

                    <canvas ref={canvasRef} style={{ display: "none" }} />

                    {imagen && (
                        <div className="mt-6 text-center">
                            <img
                                src={imagen}
                                alt="Captura"
                                className="w-[320px] h-60 object-cover rounded-lg border shadow-md mx-auto"
                            />
                        </div>
                    )}

                </form>

            </div>
        </div>
    );
};