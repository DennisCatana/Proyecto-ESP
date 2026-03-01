import React, { useState } from 'react';

const IMAGES = {
  baston: '/src/assets/heraldry/baston.jpg', 
  sable: '/src/assets/heraldry/sable.jpg',
  sablin: '/src/assets/heraldry/sablin.jpeg',
};

// Colores institucionales - más claros
const COLORS = {
  azulElectrico: '#3B82F6',
  azulOscuro: '#1E40AF',
  plateado: '#6B7280',
  doradoMetalico: '#D4A84B',
  doradoClaro: '#E8C872',
};

// Data for attributes options - ORDER: Bastón, Sable, Sablín
const attributesOptions = {
  baston: {
    id: 'baston',
    name: 'El Bastón',
    type: 'weapon',
    description: 'El bastón de mando es el símbolo máximo de la autoridad institucional. Representa el poder deleg ado por el Estado y la responsabilidad suprema del mando.',
    parts: [
      { id: 'cabeza', name: 'Cabeza', description: 'Parte superior decorativa, representa la autoridad suprema' },
      { id: 'cuerpo', name: 'Cuerpo', description: 'Varilla central, simboliza la continuidad institucional' },
      { id: 'base', name: 'Base', description: 'Fundamento del mando, estabilidad y servicio' },
      { id: 'bocamayor', name: 'Bocamayor', description: 'Anillo superior, honor al rango' },
      { id: 'bocamenor', name: 'Bocamenor', description: 'Anillo inferior, continuidad del mando' },
    ]
  },
  sable: {
    id: 'sable',
    name: 'El Sable',
    type: 'weapon',
    description: 'El sable es el arma tradicional de los oficiales de la Policía Nacional. Representa la autoridad, el honor y la tradición militar que se remonta a los orígenes de la institución policial.',
    parts: [
      { id: 'hoja', name: 'Hoja', description: 'Parte cortante del sable, simboliza la capacidad de acción y defensa' },
      { id: 'empuñadura', name: 'Empuñadura', description: 'Parte donde se agarra el arma, representa el control y dominio' },
      { id: 'guarda', name: 'Guarda', description: 'Protección de la mano, simboliza la protección del lawful' },
      { id: 'pomo', name: 'Pomo', description: 'Extremo del mango, representa la culminación del deber' },
      { id: 'vaina', name: 'Vaina', description: 'Funda del sable, representa la disciplina y el autocontrol' },
    ]
  },
  sablin: {
    id: 'sablin',
    name: 'El Sablín',
    type: 'weapon',
    description: 'El sablín es el arma tradicional de los suboficiales. Simboliza la experiencia, el conocimiento táctico y el liderazgo en el servicio.',
    parts: [
      { id: 'hoja', name: 'Hoja', description: 'Parte cortante del sablín, representa la efectividad en el servicio' },
      { id: 'empuñadura', name: 'Empuñadura', description: 'Agarre del arma, simboliza el dominio técnico' },
      { id: 'guarda', name: 'Guarda', description: 'Protección manual, representa la responsabilidad' },
      { id: 'pomo', name: 'Pomo', description: 'Extremo decorativo, honor al rango' },
      { id: 'vaina', name: 'Vaina', description: 'Funda protectora, disciplina operacional' },
    ]
  }
};

const AttributesModal = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState('baston');
  const [selectedPart, setSelectedPart] = useState(null);
  
  const currentOption = attributesOptions[selectedOption];
  
  return (
    <div className="fixed text-justify inset-0 z-50 flex items-start justify-center p-4 ">
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
              ATRIBUTOS DE MANDO
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Los símbolos de autoridad que representan la jerarquía, tradición y honor institucional de la Policía Nacional
            </p>
          </div>
          
          {/* Options - 3 buttons */}
          <div className="mb-8">
            <h3 className="text-slate-500 text-sm uppercase tracking-wider mb-4 font-semibold text-center">
              Selecciona un atributo
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {Object.values(attributesOptions).map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedOption(option.id);
                    setSelectedPart(null);
                  }}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    selectedOption === option.id 
                      ? 'border-2' 
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                  style={{ 
                    background: selectedOption === option.id 
                      ? `linear-gradient(135deg, ${COLORS.doradoMetalico}30 0%, white 100%)`
                      : 'white',
                    borderColor: selectedOption === option.id ? COLORS.doradoMetalico : undefined,
                  }}
                >
                  <span 
                    className="font-bold block"
                    style={{ color: selectedOption === option.id ? COLORS.doradoMetalico : '#475569' }}
                  >
                    {option.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Image */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: COLORS.doradoMetalico }}
              >
                {currentOption.name}
              </h3>
              
              {/* Image container - with arrow indicator */}
              <div 
                className="w-full h-64 md:h-80 rounded-xl overflow-hidden relative"
                style={{ 
                  background: 'white',
                  border: `1px solid #cbd5e1`
                }}
              >
                <img 
                  src={IMAGES[selectedOption]} 
                  alt={currentOption.name}
                  className="w-full h-full object-contain"
                />
                {/* Arrow indicator for selected part */}
                {selectedPart && (
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce"
                    style={{ color: COLORS.doradoMetalico }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-12 w-12 drop-shadow-lg"
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                    </svg>
                    <span className="text-xs font-bold bg-white px-2 py-1 rounded shadow mt-1">
                      {currentOption.parts.find(p => p.id === selectedPart)?.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right: Description + Parts below */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: COLORS.doradoMetalico }}
              >
                Descripción
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg mb-6">
                {currentOption.description}
              </p>
              
              {/* Parts selection - NOW BELOW DESCRIPTION */}
              <div className="mt-4">
                <h4 className="text-slate-500 text-sm uppercase tracking-wider mb-3">
                  Partes del {currentOption.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentOption.parts.map(part => (
                    <button
                      key={part.id}
                      onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedPart === part.id 
                          ? 'text-white' 
                          : 'text-slate-600 border border-slate-300 hover:border-slate-400'
                      }`}
                      style={{ 
                        background: selectedPart === part.id ? COLORS.doradoMetalico : 'white'
                      }}
                    >
                      {part.name}
                    </button>
                  ))}
                </div>
                
                {/* Part description */}
                {selectedPart && (
                  <div 
                    className="mt-4 p-4 rounded-lg"
                    style={{ background: `${COLORS.azulElectrico}20`, border: `1px solid ${COLORS.azulElectrico}40` }}
                  >
                    <p className="text-slate-700">
                      {currentOption.parts.find(p => p.id === selectedPart)?.description}
                    </p>
                  </div>
                )}
                
                {!selectedPart && (
                  <div className="mt-4 p-3 rounded-lg bg-white">
                    <p className="text-slate-400 text-sm">
                      Haz clic en las partes del arma para ver más información
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributesModal;
