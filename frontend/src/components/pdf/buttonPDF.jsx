import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import PDFLayout from "./layout";

const GeneratePDFButton = ({
    title,
    subtitle,
    logo,
    data,
    layout,
    fileName,
    label
}) => {

    const generatePDF = async () => {

        const container = document.createElement("div");
        document.body.appendChild(container);

        const root = createRoot(container);

        root.render(
            <PDFLayout
                title={title}
                subtitle={subtitle}
                logo={logo}
                data={data}
                layout={layout}
            />
        );

        await new Promise(r => setTimeout(r, 500));

        const canvas = await html2canvas(container.firstChild, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(fileName);

        root.unmount();
        document.body.removeChild(container);
    };

    return (
        <div className="flex justify-center mt-10">
            <button
                onClick={generatePDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
            >
                {label}
            </button>
        </div>
    );
};

export default GeneratePDFButton;