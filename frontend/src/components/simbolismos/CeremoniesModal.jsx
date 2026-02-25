import React, { useState } from 'react';

// Colores institucionales - más claros
const COLORS = {
  azulElectrico: '#3B82F6',
  azulOscuro: '#1E40AF',
  plateado: '#9CA3AF',
  grisOscuro: '#4B5563',
  doradoMetalico: '#D4A84B',
  doradoClaro: '#E8C872',
  fondoClaro: '#F8FAFC',
  fondoOscuro: '#1E293B',
};

// Data for ceremonies - vertical timeline
const ceremoniesData = [
  {
    id: 'juramento',
    title: 'Juramento a la Bandera',
    date: 'Inicio de cada ciclo académico',
    description: 'Ceremonia donde los cadetes juran lealtad a la patria y se comprometen a cumplir con honor su deber policial. Este acto marca el inicio formal de su formación institucional, representando el compromiso supremo con la nación y la aceptación voluntaria de los deberes y responsabilidades que implica ser policía.',
  },
  {
    id: 'ascensos',
    title: 'Ceremonia de Ascensos',
    date: 'Anualmente',
    description: 'Acto solemne donde se reconocen los méritos y logros de los oficiales y cadetes que ascienden en el escalafón institucional. Celebra el desarrollo profesional y la dedicación de quienes han demostrado excelencia en su formación y servicio.',
  },
  {
    id: 'honores',
    title: 'Honores Fúnebres',
    date: 'Según corresponda',
    description: 'Ceremonia dedicada a honrar la memoria de los héroes policiales caídos en cumplimiento del deber. Reconoce el sacrificio supremo y mantiene viva la memoria de quienes entregan su vida en servicio a la nación.',
  },
  {
    id: 'graduacion',
    title: 'Ceremonia de Graduación',
    date: 'Fin de cada ciclo',
    description: 'Acto académico solemne donde los cadetes reciben sus títulos y se convierten en oficiales de policía. Marca la culminación de una etapa de formación y el inicio de una nueva carrera al servicio de la sociedad.',
  },
];

const CeremoniesModal = ({ onClose }) => {
  const [expandedEvent, setExpandedEvent] = useState(null);
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal - Lighter colors */}
      <div 
        className="relative bg-gradient-to-b from-slate-100 to-slate-200 border-2 rounded-xl max-w-5xl w-full my-8 max-h-[90vh] overflow-y-auto"
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
          {/* Title with small description */}
          <div className="text-center mb-8">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: COLORS.doradoMetalico }}
            >
              ACTOS CEREMONIALES
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Los eventos institucionales que representan la tradición, el honor y el compromiso de la Policía Nacional con la sociedad
            </p>
          </div>
          
          {/* Vertical Timeline - Alternating */}
          <div className="relative">
            {/* Timeline line */}
            <div 
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-1/2"
              style={{ background: COLORS.doradoMetalico }}
            />
            
            {/* Timeline items - alternating */}
            {ceremoniesData.map((event, index) => {
              const isLeft = index % 2 === 0;
              const isExpanded = expandedEvent === event.id;
              
              return (
                <div 
                  key={event.id}
                  className={`relative flex items-start mb-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot on center */}
                  <div 
                    className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 z-10 transition-all cursor-pointer ${
                      isExpanded ? 'scale-150' : 'hover:scale-125'
                    }`}
                    style={{ 
                      background: isExpanded ? COLORS.doradoMetalico : COLORS.fondoOscuro,
                      border: `2px solid ${isExpanded ? COLORS.doradoMetalico : COLORS.doradoMetalico}`,
                      boxShadow: isExpanded ? `0 0 15px ${COLORS.doradoMetalico}` : 'none'
                    }}
                    onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                  />
                  
                  {/* Content - alternating sides */}
                  <div className={`ml-12 md:w-1/2 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                    {/* Collapsed: title + date */}
                    {!isExpanded && (
                      <button
                        onClick={() => setExpandedEvent(event.id)}
                        className="block w-full p-3 rounded-lg border transition-all text-left hover:bg-white/50"
                        style={{ borderColor: COLORS.doradoMetalico }}
                      >
                        <h3 
                          className="text-lg font-bold"
                          style={{ color: COLORS.doradoMetalico }}
                        >
                          {event.title}
                        </h3>
                        <p className="text-slate-500 text-sm">{event.date}</p>
                      </button>
                    )}
                    
                    {/* Expanded: full content in place - NO new modal */}
                    {isExpanded && (
                      <div 
                        className="p-4 rounded-xl border transition-all duration-300"
                        style={{ 
                          background: 'white',
                          borderColor: COLORS.doradoMetalico
                        }}
                      >
                        {/* Title and date */}
                        <div className="mb-3">
                          <h3 
                            className="text-xl font-bold"
                            style={{ color: COLORS.doradoMetalico }}
                          >
                            {event.title}
                          </h3>
                          <p className="text-slate-500 text-sm">{event.date}</p>
                        </div>
                        
                        {/* Image - adapts to container */}
                        <div 
                          className="w-full h-40 md:h-48 rounded-lg mb-3 overflow-hidden"
                          style={{ 
                            background: `linear-gradient(135deg, ${COLORS.azulElectrico}20 0%, ${COLORS.azulOscuro}20 100%)`,
                            border: `1px solid ${COLORS.grisOscuro}`
                          }}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <p className="text-slate-400 text-sm">
                              Imagen: {event.id}.png
                            </p>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-slate-700 leading-relaxed text-sm">
                          {event.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Hint */}
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Haz clic en cada evento para ver más detalles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeremoniesModal;
