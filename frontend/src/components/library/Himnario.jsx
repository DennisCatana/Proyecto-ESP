import { Music, Pause, Square, RotateCcw, Repeat } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

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
      title: 'Himno a la Bandera',
      author: 'Himno patrio',
      audioUrl: '/src/assets/audios/Himno-Bandera.mpeg'
    },
    {
      id: 2,
      title: 'Himno al Ecuador',
      author: 'Himno nacional',
      audioUrl: '/src/assets/audios/Himno-Ecuador.mpeg'
    },
    {
      id: 3,
      title: 'Himno a la Patria',
      author: 'Himno patrio',
      audioUrl: '/src/assets/audios/Himno-Patria.mpeg'
    },
    {
      id: 4,
      title: 'Himno a la Policial',
      author: 'Himno institucional',
      audioUrl: '/src/assets/audios/Himno-Policia.mpeg'
    },
    {
      id: 5,
      title: 'Himno a los Héroes',
      author: 'Himno commemorativo',
      audioUrl: '/src/assets/audios/Himno-Heroes.mpeg'
    },
    {
      id: 6,
      title: 'Himno a la Inhepol',
      author: 'Himno commemorativo',
      audioUrl: '/src/assets/audios/Himno-Inhepol.mpeg'
    },
  ];

  // Reference to keep track of currently playing audio
  const currentAudioRef = useRef(null);
  
  // State to track currently playing hymn ID and playing status
  const [playingHymnId, setPlayingHymnId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
    };
  }, []);

  // Function to play hymn
  const playHymn = (hymn) => {
    if (hymn.audioUrl) {
      // If clicking on the same hymn that is playing, toggle pause/play
      if (playingHymnId === hymn.id) {
        if (isPlaying) {
          currentAudioRef.current.pause();
          setIsPlaying(false);
        } else {
          currentAudioRef.current.play();
          setIsPlaying(true);
        }
        return;
      }
      
      // Stop currently playing audio if exists
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      }
      
      // Create and play new audio
      const audio = new Audio(hymn.audioUrl);
      audio.onended = () => {
        if (isLooping) {
          audio.currentTime = 0;
          audio.play();
        } else {
          setIsPlaying(false);
          setPlayingHymnId(null);
        }
      };
      currentAudioRef.current = audio;
      setPlayingHymnId(hymn.id);
      setIsPlaying(true);
      audio.play();
    } else {
      alert('Audio pendiente de agregar. Por favor contacte al administrador.');
    }
  };

  // Function to pause the current hymn
  const pauseHymn = () => {
    if (currentAudioRef.current && isPlaying) {
      currentAudioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Function to stop (pause and reset) the current hymn
  const stopHymn = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      setIsPlaying(false);
      setPlayingHymnId(null);
    }
  };

  // Function to restart the current hymn
  const restartHymn = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Function to toggle loop mode
  const toggleLoop = () => {
    setIsLooping(!isLooping);
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
      {/* Audio Control Panel - Shows when a hymn is playing */}
      {playingHymnId && (
        <div className="bg-[#0056b3] text-white rounded-lg shadow-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-white/70">Reproduciendo:</p>
                <p className="font-bold">{hymns.find(h => h.id === playingHymnId)?.title}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={isPlaying ? pauseHymn : () => {
                  if (currentAudioRef.current) {
                    currentAudioRef.current.play();
                    setIsPlaying(true);
                  }
                }}
                className="flex items-center gap-2 px-3 py-2 bg-white text-[#0056b3] rounded-full hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Music className="w-4 h-4" />
                    Continuar
                  </>
                )}
              </button>
              <button
                onClick={restartHymn}
                className="flex items-center gap-1 px-3 py-2 bg-white text-[#0056b3] rounded-full hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </button>
              <button
                onClick={toggleLoop}
                className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors text-sm font-medium ${
                  isLooping 
                    ? 'bg-[#ffc107] text-[#0056b3] hover:bg-[#e0a800]' 
                    : 'bg-white text-[#0056b3] hover:bg-gray-100'
                }`}
              >
                <Repeat className="w-4 h-4" />
                {isLooping ? 'Repetir: ON' : 'Repetir'}
              </button>
              <button
                onClick={stopHymn}
                className="flex items-center gap-1 px-3 py-2 border border-white text-white rounded-full hover:bg-white/10 transition-colors text-sm font-medium"
              >
                <Square className="w-4 h-4" />
                Detener
              </button>
            </div>
          </div>
        </div>
      )}

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
              <div className="grid-cols-1 w-16 h-16 rounded-full bg-linear-to-br from-[#007BFF] to-[#0056b3] flex items-center justify-center mx-auto mb-4">
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
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => playHymn(hymn)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-sm font-medium ${
                    playingHymnId === hymn.id
                      ? 'bg-[#ffc107] text-[#0056b3] hover:bg-[#e0a800]'
                      : 'bg-[#007BFF] text-white hover:bg-[#0056b3]'
                  }`}
                >
                  {playingHymnId === hymn.id && isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Music className="w-4 h-4" />
                      Reproducir
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (hymn.audioUrl) {
                      const link = document.createElement('a');
                      link.href = hymn.audioUrl;
                      link.download = hymn.title + '.mpeg';
                      link.click();
                    } else {
                      alert('Audio pendiente de agregar. Por favor contacte al administrador.');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-[#007BFF] text-[#007BFF] rounded-full hover:bg-[#e8f4ff] transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Descargar
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
