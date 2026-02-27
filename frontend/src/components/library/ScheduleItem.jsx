import { Clock, Download, Eye } from 'lucide-react';

// Universal document viewer function
const openDocument = (url) => {
  if (!url || url === '#') {
    alert('Documento pendiente de agregar. Por favor contacte al administrador.');
    return;
  }
  
  const baseUrl = window.location.origin;
  const fullUrl = url.startsWith('http') ? url : baseUrl + url;
  
  // Open directly in new tab
  window.open(fullUrl, '_blank');
};

const ScheduleItem = ({ title, category, description, type, pdfUrl, onView }) => {
  const viewSchedule = () => {
    if (onView) {
      onView();
    } else {
      openDocument(pdfUrl);
    }
  };

  const downloadSchedule = () => {
    if (pdfUrl && pdfUrl !== '#') {
      const link = document.createElement('a');
      link.href = pdfUrl.replace('.pdf', '.xls');
      link.download = title + '.xls';
      link.click();
    } else {
      alert('Documento pendiente de agregar. Por favor contacte al administrador.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border-l-4 border-[#007BFF] hover:shadow-xl transition-all duration-300">
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#e8f4ff] flex items-center justify-center">
            <Clock className="w-6 h-6 text-[#007BFF]" />
          </div>
          <div>
            <h3 className="text-[#0056b3] font-bold text-lg">{title}</h3>
            <span className="text-xs text-[#007BFF] font-semibold uppercase tracking-wider">
              {category}
            </span>
            <p className="text-gray-600 mt-1 text-sm">{description}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={viewSchedule}
            className="flex items-center gap-2 px-4 py-2 bg-[#007BFF] text-white rounded-md hover:bg-[#0056b3] transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            Ver
          </button>
          {pdfUrl && pdfUrl !== '#' && (
            <button
              onClick={downloadSchedule}
              className="flex items-center gap-2 px-4 py-2 border border-[#007BFF] text-[#007BFF] rounded-md hover:bg-[#e8f4ff] transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Descargar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;
