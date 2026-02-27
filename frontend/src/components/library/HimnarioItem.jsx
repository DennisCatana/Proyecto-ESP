import { Music } from 'lucide-react';

const HimnarioItem = ({ title, author, description, audioUrl }) => {
  const playHymn = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      alert('Audio pendiente de agregar. Por favor contacte al administrador.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border-t-4 border-[#007BFF] hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#007BFF] to-[#0056b3] flex items-center justify-center mx-auto mb-4">
          <Music className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-[#0056b3] font-bold text-lg text-center mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm text-center mb-1">
          {author}
        </p>
        <p className="text-gray-500 text-xs text-center mb-4">
          {description}
        </p>
        <div className="flex justify-center">
          <button
            onClick={playHymn}
            className="flex items-center gap-2 px-6 py-2 bg-[#007BFF] text-white rounded-full hover:bg-[#0056b3] transition-colors text-sm font-medium"
          >
            <Music className="w-4 h-4" />
            Reproducir
          </button>
        </div>
      </div>
    </div>
  );
};

export default HimnarioItem;
