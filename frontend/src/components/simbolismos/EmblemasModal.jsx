import React, { useState, useMemo } from 'react';

// Importar imágenes desde src/assets
import image1 from '../../assets/images/image1.jpeg';
import image2 from '../../assets/images/image2.jpeg';
import image3 from '../../assets/images/image3.jpeg';
import image4 from '../../assets/images/image4.jpg';
import image5 from '../../assets/images/image5.jpeg';
import image6 from '../../assets/images/image6.jpeg';
import image7 from '../../assets/images/image7.jpeg';
import image8 from '../../assets/images/image8.jpeg';
import image9 from '../../assets/images/image9.jpeg';
import image10 from '../../assets/images/image10.jpeg';

// Colores institucionales - más claros
const COLORS = {
  azulElectrico: '#3B82F6',
  azulOscuro: '#1E40AF',
  plateado: '#6B7280',
  doradoMetalico: '#D4A84B',
  doradoClaro: '#E8C872',
  verde: '#22C55E',
  verdeOscuro: '#15803D',
};

// Array de imágenes importadas para el carrusel
const carouselImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

// Data for emblemas
const emblemasData = {
  tree: {
    id: 'tree',
    name: 'El Árbol',
    date: '1970 – 1989',
    description: 'El árbol institucional representa la evolución y crecimiento de la Policía Nacional a lo largo de su historia. Las raíces simbolizan los fundamentos históricos, el tronco la formación sólida, y la copa la proyección hacia el futuro.',
    characteristics: [
      { title: 'Raíces', description: 'Los fundamentos históricos y valores tradicionales de la institución' },
      { title: 'Tronco', description: 'La formación integral y el desarrollo profesional de los policías' },
      { title: 'Copa', description: 'La proyección institucional hacia el futuro y el servicio a la sociedad' },
    ]
  },
  polifemo: {
    id: 'polifemo',
    name: 'Polifemo',
    date: '1972',
    description: 'Polifemo, el cíclope de la mitología griega, representa la vigilancia constante y la omnisciencia. En el contexto institucional, simboliza que la institución siempre está atenta, observando y protegiendo a la ciudadanía.',
    characteristics: [
      { title: 'Vigilancia Permanente', description: 'El ojo observa todo movimiento, representando la capacidad de adaptación y respuesta' },
      { title: 'Transparencia', description: 'El color azul representa la claridad y la honestidad institucional' },
      { title: 'Justicia', description: 'El iris simboliza la imparcialidad y objetividad en el cumplimiento del deber' },
    ]
  },
  banderin: {
    id: 'banderin',
    name: 'Banderín',
    date: 'Sin fecha específica',
    description: 'El banderín es el estandarte institucional que representa la identidad y tradición de la Policía Nacional. Porta los colores y símbolos que identifican a la institución en ceremonias y eventos oficiales.',
    characteristics: [
      { title: 'Identidad', description: 'Representa los colores institucionales y la tradición policial' },
      { title: 'Honor', description: 'Porta el compromiso institucional ante la sociedad' },
      { title: 'Unidad', description: 'Símbolo de cohesión y hermandad entre los miembros de la institución' },
    ]
  },
  mausoleo: {
    id: 'mausoleo',
    name: 'El Mausoleo',
    date: 'Sin fecha específica',
    description: 'El mausoleo es el monumento dedicado a los héroes y mártires de la Policía Nacional que han caído en cumplimiento del deber. Representa el eterno sacrificio y la memoria de quienes dieron su vida por la patria.',
    characteristics: [
      { title: 'Memoria', description: 'Honra a los héroes caídos que entregaron su vida por la institución' },
      { title: 'Sacrificio', description: 'Representa el compromiso supremo de servir a la sociedad' },
      { title: 'Tradición', description: 'Mantiene viva la historia y los valores de la institución' },
    ]
  }
};

// Image Carousel Component for Emblemas
const ImageCarousel = ({ emblemaId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Optimización: usar useMemo para evitar recrear el array en cada render
  const images = useMemo(() => {
    // Different images for different emblems
    switch(emblemaId) {
      case 'tree':
        return [image4, image5, image6];
      case 'polifemo':
        return [image7, image8, image9];
      case 'banderin':
        return [image10, image1, image2];
      case 'mausoleo':
        return [image3, image4, image5];
      default:
        return [image1, image2, image3];
    }
  }, [emblemaId]);
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <div className="relative w-full h-64 md:h-80 rounded-xl">
      <img 
        src={images[currentIndex]} 
        alt={`${emblemaId} - Imagen ${currentIndex + 1}`}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = 'none';
          const bg = emblemaId === 'tree' 
            ? 'linear-gradient(180deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)'
            : emblemaId === 'polifemo'
            ? `linear-gradient(135deg, ${COLORS.azulElectrico}20 0%, ${COLORS.azulOscuro}20 100%)`
            : 'white';
          e.target.parentElement.innerHTML = `
            <div class="w-full h-full flex items-center justify-center" style="background: ${bg}">
              <p class="text-slate-400 text-sm">Imagen: ${emblemaId}.png</p>
            </div>
          `;
        }}
      />
      
      {/* Carousel Controls */}
      {images.length > 1 && (
        <>
          <button 
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const EmblemasModal = ({ onClose }) => {
  const [selectedEmblema, setSelectedEmblema] = useState('tree');
  
  const currentEmblema = emblemasData[selectedEmblema];
  
  return (
    <div className="fixed text-justify inset-0 z-50 flex items-start justify-center p-4">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal - Lighter colors */}
      <div 
        className="relative bg-linear-to-b from-slate-100 to-slate-200 border-2 rounded-xl max-w-6xl w-full my-8 max-h-[90vh] overflow-y-auto"
        style={{ 
          borderColor: COLORS.doradoMetalico,
          boxShadow: `0 0 40px rgba(212, 168, 75, 0.3)`
        }}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 text-3xl z-10 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center transition-all hover:bg-white"
        >
          ×
        </button>
        
        <div className="p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: COLORS.doradoMetalico }}
            >
              EMBLEMAS INSTITUCIONALES
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Los símbolos que representan la identidad, historia y compromiso de la Policía Nacional con la sociedad
            </p>
          </div>
          
          {/* Options - 4 buttons in a row */}
          <div className="mb-8">
            <h3 className="text-slate-500 text-sm uppercase tracking-wider mb-4 font-semibold text-center">
              Selecciona un emblema
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.values(emblemasData).map(emblema => (
                <button
                  key={emblema.id}
                  onClick={() => setSelectedEmblema(emblema.id)}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    selectedEmblema === emblema.id 
                      ? 'border-2' 
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                  style={{ 
                    background: selectedEmblema === emblema.id 
                      ? `linear-gradient(135deg, ${COLORS.doradoMetalico}30 0%, white 100%)`
                      : 'white',
                    borderColor: selectedEmblema === emblema.id ? COLORS.doradoMetalico : undefined,
                  }}
                >
                  <span 
                    className="font-bold block text-sm"
                    style={{ color: selectedEmblema === emblema.id ? COLORS.doradoMetalico : '#475569' }}
                  >
                    {emblema.name}
                  </span>
                  <span 
                    className="text-xs block"
                    style={{ color: selectedEmblema === emblema.id ? COLORS.doradoMetalico : '#94A3B8' }}
                  >
                    {emblema.date}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Image Carousel */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: COLORS.doradoMetalico }}
              >
                {currentEmblema.name}
                <span className="text-sm font-normal text-slate-500 ml-2">({currentEmblema.date})</span>
              </h3>
              
              {/* Image Carousel */}
              <ImageCarousel emblemaId={currentEmblema.id} />
            </div>
            
            {/* Right: Description + Characteristics */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: COLORS.doradoMetalico }}
              >
                Descripción
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg mb-6">
                {currentEmblema.description}
              </p>
              
              {/* Characteristics */}
              <div>
                <h4 className="text-slate-500 text-sm uppercase tracking-wider mb-3">
                  Características
                </h4>
                <div className="space-y-3">
                  {currentEmblema.characteristics.map((char, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg bg-white"
                      style={{ borderLeft: `3px solid ${COLORS.doradoMetalico}` }}
                    >
                      <h5 className="font-bold text-slate-700 mb-1">{char.title}</h5>
                      <p className="text-slate-500 text-sm">{char.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblemasModal;
