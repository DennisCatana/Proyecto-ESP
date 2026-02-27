import { FileText, Download, Eye } from 'lucide-react';

const RegulationCard = ({ title, category, description, pdfUrl }) => {
  const viewDocument = () => {
    if (!pdfUrl || pdfUrl === '#') {
      alert('Documento pendiente de agregar. Por favor contacte al administrador.');
      return;
    }
    // Open PDF directly in browser
    window.open(pdfUrl, '_blank');
  };

  const downloadDocument = () => {
    if (!pdfUrl || pdfUrl === '#') {
      alert('Documento pendiente de agregar. Por favor contacte al administrador.');
      return;
    }
    // Download the file
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border-l-4 border-[#007BFF] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#e8f4ff] flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#007BFF]" />
            </div>
            <div>
              <h3 className="text-[#0056b3] font-bold text-lg">{title}</h3>
              <span className="text-xs text-[#007BFF] font-semibold uppercase tracking-wider">
                {category}
              </span>
            </div>
          </div>
        </div>
        
        {description && (
          <p className="text-gray-600 mt-3 text-sm">{description}</p>
        )}
        
        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={viewDocument}
            className="flex items-center gap-2 px-4 py-2 bg-[#007BFF] text-white rounded-md hover:bg-[#0056b3] transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            Ver
          </button>
          <button
            onClick={downloadDocument}
            className="flex items-center gap-2 px-4 py-2 border border-[#007BFF] text-[#007BFF] rounded-md hover:bg-[#e8f4ff] transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegulationCard;
