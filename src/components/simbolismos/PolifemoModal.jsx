import React from 'react';

// Colores institucionales - más claros
const COLORS = {
  azulElectrico: '#3B82F6',
  azulOscuro: '#1E40AF',
  plateado: '#6B7280',
  doradoMetalico: '#D4A84B',
};

const polifemoInfo = {
  title: 'POLIFEMO',
  subtitle: 'El Ojo de la Justicia',
  description: 'Polifemo, el cíclope de la mitología griega, representa la vigilancia constante y la omnisciencia. En el contexto institucional de la Policía Nacional, simboliza que la institución siempre está atenta, observando y protegiendo a la ciudadanía. El ojo que todo lo ve representa la imparcialidad, la transparencia y la capacidad de respuesta ante cualquier situación que amenace la seguridad ciudadana.',
  characteristics: [
    { title: 'Vigilancia Permanente', description: 'El ojo observa todo movimiento, representando la capacidad de adaptación y respuesta ante cualquier situación. La pupila se dilata, simbolizando la preparación permanente del policía.' },
    { title: 'Transparencia', description: 'El color azul representa la claridad y la honestidad. La institución policial actúa siempre bajo la mirada de la sociedad, con transparencia y honor.' },
    { title: 'Justicia', description: 'El iris azul simboliza la justicia institucional. El ojo que todo lo ve representa la imparcialidad y objetividad en el cumplimiento del deber.' },
    { title: 'Protección', description: 'La mirada extensa y cobertura total representa el compromiso de proteger a la ciudadanía en todo momento y lugar.' }
  ]
};

const PolifemoModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal - Lighter colors */}
      <div 
        className="relative bg-gradient-to-b from-slate-100 to-slate-200 border-2 rounded-xl max-w-6xl w-full my-8 max-h-[90vh] overflow-y-auto"
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
              {polifemoInfo.title}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {polifemoInfo.subtitle} - El símbolo de la vigilancia institucional
            </p>
          </div>
          
          {/* Image on right, Description on left */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left: Description */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: COLORS.doradoMetalico }}
              >
                Descripción
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg">
                {polifemoInfo.description}
              </p>
            </div>
            
            {/* Right: Image */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: COLORS.doradoMetalico }}
              >
                Imagen
              </h3>
              <div 
                className="w-full h-64 md:h-80 rounded-xl overflow-hidden"
                style={{ 
                  background: 'white',
                  border: `1px solid #cbd5e1`
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-slate-400 text-sm">
                      Imagen: polifemo.png
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Characteristics below */}
          <div>
            <h3 
              className="text-xl font-bold mb-4 text-center"
              style={{ color: COLORS.doradoMetalico }}
            >
              Características
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {polifemoInfo.characteristics.map((char, index) => (
                <div 
                  key={index}
                  className="p-5 rounded-xl border transition-all duration-300 hover:border-blue-300 bg-white"
                  style={{ borderColor: '#cbd5e1' }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${COLORS.azulElectrico}20` }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: COLORS.azulElectrico }} />
                    </div>
                    <div>
                      <h4 
                        className="font-bold mb-2"
                        style={{ color: COLORS.doradoMetalico }}
                      >
                        {char.title}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{char.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolifemoModal;
