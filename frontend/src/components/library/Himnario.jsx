import { Music } from 'lucide-react';

const Himnario = () => {
  // Data for hymns (Himnario)
  const hymnsData = {
    title: 'Himnario Institucional',
    description: 'Colección de himnos institucionales de la Escuela Superior de Policía',
    pdfUrl: '/documents/himn.pdf'
  };

  const hymns = [
    {
      id: 1,
      title: 'Himno de la Escuela Superior de Policía',
      author: 'Letra: Tnl. Jorge Salem',
      description: 'Himno oficial institucional',
      audioUrl: null
    },
    {
      id: 2,
      title: 'Himno a la Bandera',
      author: 'Autor:',
      description: 'Himno patrio',
      audioUrl: null
    },
    {
      id: 3,
      title: 'Himno Nacional del Ecuador',
      author: 'Autor:',
      description: 'Himno nacional',
      audioUrl: null
    },
  ];

  // Function to play hymn
  const playHymn = (hymn) => {
    if (hymn.audioUrl) {
      const audio = new Audio(hymn.audioUrl);
      audio.play();
    } else {
      alert('Audio pendiente de agregar. Por favor contacte al administrador.');
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Himnario Document Section */}
      <div className="bg-white rounded-lg shadow-md border-l-4 border-[#007BFF] hover:shadow-xl transition-all duration-300">
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#e8f4ff] flex items-center justify-center">
              <Music className="w-6 h-6 text-[#007BFF]" />
            </div>
            <div>
              <h3 className="text-[#0056b3] font-bold text-lg">{hymnsData.title}</h3>
              <span className="text-xs text-[#007BFF] font-semibold uppercase tracking-wider">
                Documento
              </span>
              <p className="text-gray-600 mt-1 text-sm">{hymnsData.description}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => openDocument(hymnsData.pdfUrl)}
              className="flex items-center gap-2 px-4 py-2 bg-[#007BFF] text-white rounded-md hover:bg-[#0056b3] transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Ver
            </button>
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = hymnsData.pdfUrl;
                link.download = 'Himnario_Institucional.pdf';
                link.click();
              }}
              className="flex items-center gap-2 px-4 py-2 border border-[#007BFF] text-[#007BFF] rounded-md hover:bg-[#e8f4ff] transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#e8f4ff] rounded-lg p-4 mb-6">
        <p className="text-[#0056b3] text-sm">
          <strong>Nota:</strong> Esta sección contiene los himnos institucionales. Haga clic en "Reproducir" para escuchar cada himno.
          Para agregar nuevos himnos, contacte al administrador del sistema.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hymns.map((hymn) => (
          <div key={hymn.id} className="bg-white rounded-lg shadow-md border-t-4 border-[#007BFF] hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-6">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#007BFF] to-[#0056b3] flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#0056b3] font-bold text-lg text-center mb-2">
                {hymn.title}
              </h3>
              <p className="text-gray-600 text-sm text-center mb-1">
                {hymn.author}
              </p>
              <p className="text-gray-500 text-xs text-center mb-4">
                {hymn.description}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => playHymn(hymn)}
                  className="flex items-center gap-2 px-6 py-2 bg-[#007BFF] text-white rounded-full hover:bg-[#0056b3] transition-colors text-sm font-medium"
                >
                  <Music className="w-4 h-4" />
                  Reproducir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Himnario;
