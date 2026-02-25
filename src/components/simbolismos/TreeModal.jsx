import React, { useState } from 'react';

// Colores institucionales - más claros
const COLORS = {
  azulElectrico: '#3B82F6',
  azulOscuro: '#1E40AF',
  plateado: '#6B7280',
  doradoMetalico: '#D4A84B',
};

const treeData = {
  raices: {
    name: 'Raíces',
    title: 'HISTORIA',
    description: 'Las raíces representan los fundamentos históricos de la institución, los valores que han guidado a la Policía Nacional desde su creación. Profundizan en la tradición y el legado de quienes nos antecedieron, manteniendo viva la memoria de los héroes y mártires que han dado su vida por la patria.',
    parts: [
      { name: 'Origen', description: 'La institución policial fue fundada con el propósito de mantener el orden y la seguridad ciudadana.' },
      { name: 'Tradición', description: 'Los valores de honor, disciplina y servicio han sido transmitidos de generación en generación.' },
      { name: 'Legado', description: 'Cada cadete que ingresa se conecta con una tradición de más de siglo de historia institucional.' },
      { name: 'Fundadores', description: 'Los héroes y mártires de la institución son recordados como fundamentos de nuestra identidad.' },
    ]
  },
  tronco: {
    name: 'Tronco',
    title: 'FORMACIÓN',
    description: 'El tronco símbolos la formación sólida e integral que receive los cadetes. Es la estructura que sustenta todo el desarrollo profesional y personal del futuro policía, formando ciudadanos de bien al servicio de la nación.',
    parts: [
      { name: 'Academia', description: 'La formación académica proporciona los conocimientos legales y técnicos necesarios.' },
      { name: 'Disciplina', description: 'La disciplina forma el carácter y la capacidad de tomar decisiones bajo presión.' },
      { name: 'Entrenamiento', description: 'El entrenamiento físico desarrolla la capacidad de acción y resistencia.' },
      { name: 'Ética', description: 'La formación ética garantiza el correcto uso del poder institucional.' },
    ]
  },
  hojas: {
    name: 'Copa',
    title: 'PROYECCIÓN',
    description: 'Las hojas representan la proyección hacia el futuro, la esperanza y el crecimiento continuo. Simbolizan los sueños y aspiraciones de quienes integran la institución, mirando siempre hacia adelante.',
    parts: [
      { name: 'Innovación', description: 'La institución se adapta constantemente a los nuevos desafíos de seguridad.' },
      { name: 'Servicio', description: 'El compromiso con la sociedad es el motor de nuestra función.' },
      { name: 'Desarrollo', description: 'Los oficiales tienen oportunidades de crecimiento y especialización.' },
      { name: 'Esperanza', description: 'Cada policía representa la esperanza de una sociedad más segura.' },
    ]
  }
};

const TreeModal = ({ onClose }) => {
  const [selectedZone, setSelectedZone] = useState('tronco');
  
  const currentZone = treeData[selectedZone];
  
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
              ÁRBOL DE LA ESCUELA
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              El símbolo vivo de nuestra institución: raíces en el pasado, tronco en el presente, copa hacia el futuro
            </p>
          </div>
          
          {/* Zone selector buttons */}
          <div className="flex justify-center gap-4 mb-8">
            {Object.entries(treeData).map(([key, zone]) => (
              <button
                key={key}
                onClick={() => setSelectedZone(key)}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                  selectedZone === key 
                    ? 'border-2' 
                    : 'border border-slate-300 hover:border-slate-400 bg-white'
                }`}
                style={{ 
                  background: selectedZone === key 
                    ? COLORS.doradoMetalico 
                    : 'white',
                  color: selectedZone === key ? 'white' : '#475569',
                  borderColor: selectedZone === key ? COLORS.doradoMetalico : undefined
                }}
              >
                {zone.name}
              </button>
            ))}
          </div>
          
          {/* Image on right, Description on left */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left: Description */}
            <div>
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: COLORS.doradoMetalico }}
              >
                {currentZone.title}
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg mb-6">
                {currentZone.description}
              </p>
              
              {/* Parts below description */}
              <div>
                <h4 
                  className="text-lg font-bold mb-4"
                  style={{ color: COLORS.doradoMetalico }}
                >
                  Partes del {currentZone.name}
                </h4>
                <div className="space-y-3">
                  {currentZone.parts.map((part, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg bg-white"
                      style={{ borderLeft: `3px solid ${COLORS.doradoMetalico}` }}
                    >
                      <h5 className="font-bold text-slate-700 mb-1">{part.name}</h5>
                      <p className="text-slate-500 text-sm">{part.description}</p>
                    </div>
                  ))}
                </div>
              </div>
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
                  background: 'linear-gradient(180deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)',
                  border: `1px solid #cbd5e1`
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-slate-400 text-sm">
                      Imagen: arbol_institucional.png
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeModal;
