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
    id: 'institucionalizacion',
    title: '13 de enero – Institucionalización',
    date: '1846',
    description: 'Fecha histórica que marca la institucionalización de la Policía Nacional, estableciendo las bases de la organización policial moderna en Ecuador.',
  },
  {
    id: 'profesionalizacion',
    title: '2 de marzo – Profesionalización',
    date: 'Sin fecha específica',
    description: 'Momento clave en que la institución policial inicia su proceso de profesionalización, elevando los estándares de formación y servicio.',
  },
  {
    id: 'escudo_bandera',
    title: '4 de julio – Escudo y Bandera',
    date: '1959',
    description: 'Adopción oficial del escudo y la bandera como símbolos institucionales, representando la identidad y tradición de la Policía Nacional.',
  },
  {
    id: 'servicio_pasivo',
    title: '8 de julio – Policía en Servicio Pasivo',
    date: 'Sin fecha específica',
    description: 'Reconocimiento a los oficiales que pasan a situación de servicio pasivo, manteniendo su vínculo institucional y honor.',
  },
  {
    id: 'incineracion',
    title: '26 de septiembre – Incineración de la Bandera',
    date: 'Sin fecha específica',
    description: 'Ceremonia solemne donde se incineran las banderas que han llegado al final de su vida útil, con el máximo respeto y honor institucional.',
  },
  {
    id: 'virgen_cisne',
    title: '12 de septiembre – Virgen del Cisne (Patrona)',
    date: 'Sin fecha específica',
    description: 'Celebración de la Virgen del Cisne como patrona de la institución policial, fortaleciendo los valores espirituales y culturales.',
  },
  {
    id: 'grupos_especiales',
    title: 'Creación de Grupos Especiales',
    date: 'GOM, GOE, GEMA, GIR',
    description: 'Constitución de los grupos especiales de la Policía Nacional: Grupo de Operaciones Motorizadas (GOM), Grupo de Operaciones Especiales (GOE), Grupo de Especialidades Médicas (GEMA) y Grupo de Investigación (GIR).',
  },
  {
    id: 'llama_eterna',
    title: 'La Llama Eterna',
    date: '2026',
    description: 'Símbolo de memoria y eterno sacrificio de los héroes policiales caídos en cumplimiento del deber, representando la llama que nunca se apaga.',
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
              Las fechas históricas y ceremonias que marcan la tradición y evolución de la Policía Nacional
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
