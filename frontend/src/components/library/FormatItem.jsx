import { File, Download, FileType, Eye } from 'lucide-react';

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

const FormatItem = ({ name, type, size, downloadUrl }) => {
  const fileType = type ? type.toLowerCase() : 'docx';
  
  const getTypeIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return <File className="w-8 h-8 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileType className="w-8 h-8 text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <FileType className="w-8 h-8 text-green-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const getTypeColor = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return 'bg-red-50 border-red-200';
      case 'doc':
      case 'docx':
        return 'bg-blue-50 border-blue-200';
      case 'xls':
      case 'xlsx':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getButtonStyle = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return 'bg-red-500 hover:bg-red-600';
      case 'doc':
      case 'docx':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'xls':
      case 'xlsx':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-[#007BFF] hover:bg-[#0056b3]';
    }
  };

  const downloadFile = () => {
    if (downloadUrl && downloadUrl !== '#') {
      // For PDF files, download with different extension (docx for formats)
      let downloadUrlFinal = downloadUrl;
      let downloadName = name;
      
      if (downloadUrl.endsWith('.pdf')) {
        downloadUrlFinal = downloadUrl.replace('.pdf', '.docx');
        downloadName = name + '.docx';
      } else if (downloadUrl.endsWith('.docx')) {
        downloadUrlFinal = downloadUrl.replace('.docx', '.doc');
        downloadName = name + '.doc';
      }
      
      const link = document.createElement('a');
      link.href = downloadUrlFinal;
      link.download = downloadName;
      link.click();
    } else {
      alert('Documento pendiente de agregar. Por favor contacte al administrador.');
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${getTypeColor(fileType)} hover:shadow-md transition-all`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
          {getTypeIcon(fileType)}
        </div>
        <div>
          <h4 className="text-[#0056b3] font-semibold">{name}</h4>
          <div className="flex items-center gap-3 mt-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded uppercase ${
              fileType === 'pdf' ? 'bg-red-100 text-red-700' :
              fileType === 'doc' || fileType === 'docx' ? 'bg-blue-100 text-blue-700' :
              fileType === 'xls' || fileType === 'xlsx' ? 'bg-green-100 text-green-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {type}
            </span>
            {size && <span className="text-xs text-gray-500">{size}</span>}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        {downloadUrl && downloadUrl !== '#' && (
          <button
            onClick={() => openDocument(downloadUrl)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#007BFF] text-[#007BFF] rounded-md hover:bg-[#e8f4ff] transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            Ver
          </button>
        )}
        
        <button
          onClick={downloadFile}
          className={`flex items-center gap-2 px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors text-sm font-medium ${getButtonStyle(fileType)}`}
        >
          <Download className="w-4 h-4" />
          Descargar
        </button>
      </div>
    </div>
  );
};

export default FormatItem;
