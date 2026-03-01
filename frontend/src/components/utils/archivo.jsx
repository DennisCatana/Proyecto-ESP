import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Pdf = ({ targetRef, fileName = "documento.pdf", label = "Descargar PDF" }) => {

    const handleDownload = async () => {
        if (!targetRef?.current) return;

        const canvas = await html2canvas(targetRef.current, {
            scale: 2, // mejor calidad
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(fileName);
    };

    return (
        <div className="flex justify-center mt-10">
            <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
            >
                {label}
            </button>
        </div>
    );
};

export default Pdf;