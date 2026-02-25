import React, { useState } from 'react';

const IMAGE_BASE_URL = '/src/assets/heraldry/';

// Colores institucionales - más claros
const COLORS = {
  azulElectrico: '#3B82F6',
  azulOscuro: '#1E40AF',
  plateado: '#6B7280',
  doradoMetalico: '#D4A84B',
  doradoClaro: '#E8C872',
};

// Data for heraldry options - POLICÍA NACIONAL
const heraldryOptions = {
  escudo_policia: {
    id: 'escudo_policia',
    name: 'Escudo PNE',
    type: 'shield',
    institution: 'policia',
    description: 'El escudo de la Policía Nacional representa la autoridad, protección y tradición institucional. Contiene elementos heráldicos que simbolizan los valores fundamentales del cuerpo policial.',
  },
  bandera_policia: {
    id: 'bandera_policia',
    name: 'Bandera PNE',
    type: 'flag',
    institution: 'policia',
    description: 'La bandera de la Policía Nacional representa la identidad institucional en ceremonias y eventos oficiales. Su diseño contiene los colores patrios y símbolos distintivos.',
  },
  himno_policia: {
    id: 'himno_policia',
    name: 'Himno PNE',
    type: 'anthem',
    institution: 'policia',
    description: 'El himno institucional de la Policía Nacional expresa el espíritu de cuerpo y el compromiso con la patria.',
    lyrics: `CORO:
Por la razón o por la fuerza
nuestro lema siempre será
la Policía Nacional
a la Patria defenderá.

ESTROFAS:
En el servicio everlasting
de la ley y el orden,
los policías ecuatorianos
juramos con honor.

Con valor y disciplina
cumplimos nuestro deber,
protegiendo a la patria
y al pueblo con saber.`,
  },
  // ESCUELA SUPERIOR DE POLICÍA
  escudo_escuela: {
    id: 'escudo_escuela',
    name: 'Escudo ESP',
    type: 'shield',
    institution: 'escuela',
    description: 'El escudo de la Escuela Superior de Policía representa la formación académica, la tradición educativa y los valores institucionales transmitidos a las nuevas generaciones de oficiales.',
  },
  bandera_escuela: {
    id: 'bandera_escuela',
    name: 'Bandera ESP',
    type: 'flag',
    institution: 'escuela',
    description: 'La bandera de la Escuela Superior de Policía representa la identidad académica institucional y se utiliza en ceremonias educativas y eventos especiales.',
  },
  himno_escuela: {
    id: 'himno_escuela',
    name: 'Himno ESP',
    type: 'anthem',
    institution: 'escuela',
    description: 'El himno de la Escuela Superior de Policía celebra la formación de futuros oficiales y el compromiso con la excelencia académica.',
    lyrics: `CORO:
Escuela Superior de Policía
luz de saber y honor,
formamos oficiales valientes
con patriotismo y valor.

ESTROFAS:
En estas aulas sagradas
aprendemos con fervor,
a servir a la patria
con pundonor y honor.

La disciplina nos guía
el saber nos hará crecer,
seremos siempre ejemplos
de integridad y fe.`,
  },
};

// Partes específicas del ESCUDO DE LA POLICÍA NACIONAL
const escudoPoliciaParts = [
  { id: 'frase_escudo', name: 'Frase superior', description: 'Parte superior del escudo que contiene el sol simbolizando la luz de la justicia que ilumina las acciones de la institución policial.' },
  { id: 'base_escudo', name: 'Espada', description: 'Parte inferior del escudo con la cinta del lema institucional "POR LA RAZÓN O POR LA FUERZA".' },
  { id: 'diestra_escudo', name: 'Guerrero', description: 'Lado derecho del escudo con la bandera del Ecuador simbolizando la lealtad a la patria.' },
  { id: 'siniestra_escudo', name: 'Hilera de Hitos', description: 'Lado izquierdo del escudo con la rama de laurel simbolizando los logros y victoria del servicio.' },
  { id: 'corona_escudo', name: 'Corona', description: 'Corona mural que simboliza la protección estatal y la autoridad conferida por la ley.' },
  { id: 'cinta_escudo', name: 'Cinta', description: 'Lema institucional que representa el compromiso inquebrantable de la institución.' },
];

// Partes específicas del ESCUDO DE LA ESCUELA SUPERIOR DE POLICÍA
const escudoEscuelaParts = [
  {  id: 'antorcha_esp', name: 'Antorcha', description: 'Con su tea encendida, que es la luz y la cultura que emanan del Primer Plantel Educacional Policial de la República.' },
  { id: 'piramide_esp', name: 'Pirámide', description: 'Signo de perpetuidad hacia el futuro.' },
  { id: 'libro_esp', name: 'Libro Abierto', description: 'Con la inicial de LEX, que son las leyes que rigen al país y que la Policía la custodia con su lealtad.' },
  { id: 'columnas_esp', name: 'Columnas', description: 'Estilo dórico, truncas, sinónimo de belleza y armonía.' },
  
];
// Partes específicas de la BANDERA DE LA POLICÍA NACIONAL
const banderaPoliciaParts = [
  { id: 'asta_bp', name: 'Astil', description: 'Varilla de metal que sostiene la bandera, representa la firmeza y estabilidad institucional.' },
  { id: 'campo_bp', name: 'Campo Azul', description: 'Fondo azul de la bandera que representa la serenidad, justicia y protección.' },
  { id: 'escudo_bandera_bp', name: 'Escudo Central', description: 'Escudo de la Policía Nacional bordado en el centro de la bandera.' },
  { id: 'lema_bp', name: 'Lema', description: 'Texto "POLICÍA NACIONAL DEL ECUADOR" bordado en letras doradas.' },
  { id: 'borde_bp', name: 'Borde Dorado', description: 'Contorno dorado que representa la excelencia y el honor institucional.' },
  { id: 'flecos_bp', name: 'Flecos', description: 'Adornos en el borde inferior simbolizando la tradición militar.' },
];

// Partes específicas de la BANDERA DE LA ESCUELA SUPERIOR DE POLICÍA
const banderaEscuelaParts = [
  { id: 'asta_be', name: 'Astil', description: 'Varilla de metal con terminación dorada, representa la academia y la formación.' },
  { id: 'campo_be', name: 'Campo Azul', description: 'Fondo azul intenso que representa la seriedad académica y el conocimiento.' },
  { id: 'escudo_bandera_be', name: 'Escudo ESP', description: 'Escudo de la Escuela Superior de Policía bordado en el centro.' },
  { id: 'lema_be', name: 'Lema', description: 'Texto "ESCUELA SUPERIOR DE POLICÍA" bordado en letras plateadas.' },
  { id: 'borde_be', name: 'Borde Plateado', description: 'Contorno plateado que representa la pureza de la formación académica.' },
  { id: 'flecos_be', name: 'Flecos', description: 'Adornos en el borde inferior en color azul y dorado.' },
];

// Función para obtener las partes según la opción seleccionada
const getParts = (optionId) => {
  switch (optionId) {
    case 'escudo_policia':
      return escudoPoliciaParts;
    case 'escudo_escuela':
      return escudoEscuelaParts;
    case 'bandera_policia':
      return banderaPoliciaParts;
    case 'bandera_escuela':
      return banderaEscuelaParts;
    default:
      return [];
  }
};

// Función para obtener el nombre del tipo
const getTypeName = (type) => {
  switch (type) {
    case 'shield':
      return 'escudo';
    case 'flag':
      return 'banderín';
    case 'anthem':
      return 'himno';
    default:
      return 'símbolo';
  }
};

const HeraldryModal = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState('escudo_policia');
  const [selectedPart, setSelectedPart] = useState(null);
  
  const currentOption = heraldryOptions[selectedOption];
  const isAnthem = currentOption.type === 'anthem';
  const isShield = currentOption.type === 'shield';
  const isFlag = currentOption.type === 'flag';
  const hasParts = isShield || isFlag;
  const currentParts = getParts(selectedOption);
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
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
              HERÁLDICA INSTITUCIONAL
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Los símbolos heráldicos que representan la identidad, tradición y valores institucionales
            </p>
          </div>
          
          {/* Options - Separated by Institution */}
          <div className="mb-8">
            {/* POLICÍA NACIONAL */}
            <div className="mb-4">
              <h3 className="text-blue-700 text-sm uppercase tracking-wider mb-3 font-bold text-center">
              POLICÍA NACIONAL DEL ECUADOR
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {Object.values(heraldryOptions)
                  .filter(opt => opt.institution === 'policia')
                  .map(option => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedOption(option.id);
                        setSelectedPart(null);
                      }}
                      className={`p-3 rounded-lg border transition-all duration-300 text-sm font-medium ${
                        selectedOption === option.id 
                          ? 'border-2' 
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                      style={{ 
                        background: selectedOption === option.id 
                          ? `linear-gradient(135deg, ${COLORS.azulElectrico}30 0%, white 100%)`
                          : 'white',
                        borderColor: selectedOption === option.id ? COLORS.azulElectrico : '',
                      }}
                    >
                      <span style={{ color: selectedOption === option.id ? COLORS.azulElectrico : '#475569' }}>
                        {option.name}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
            
            {/* ESCUELA SUPERIOR DE POLICÍA */}
            <div>
              <h3 className="text-green-700 text-sm uppercase tracking-wider mb-3 font-bold text-center">
              ESCUELA SUPERIOR DE POLICÍA
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {Object.values(heraldryOptions)
                  .filter(opt => opt.institution === 'escuela')
                  .map(option => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedOption(option.id);
                        setSelectedPart(null);
                      }}
                      className={`p-3 rounded-lg border transition-all duration-300 text-sm font-medium ${
                        selectedOption === option.id 
                          ? 'border-2' 
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                      style={{ 
                        background: selectedOption === option.id 
                          ? `linear-gradient(135deg, ${COLORS.doradoMetalico}30 0%, white 100%)`
                          : 'white',
                        borderColor: selectedOption === option.id ? COLORS.doradoMetalico : '',
                      }}
                    >
                      <span style={{ color: selectedOption === option.id ? COLORS.doradoMetalico : '#475569' }}>
                        {option.name}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Image or Anthem */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ 
                  color: currentOption.institution === 'policia' ? COLORS.azulElectrico : COLORS.doradoMetalico 
                }}
              >
                {currentOption.name}
              </h3>
              
              {/* Image for shields and flags */}
              {hasParts && (
                <div 
                  className="w-full h-64 md:h-80 rounded-xl overflow-hidden"
                  style={{ 
                    background: 'white',
                    border: `1px solid #cbd5e1`
                  }}
                >
                  <img 
                    src={`${IMAGE_BASE_URL}${selectedOption}.png`} 
                    alt={currentOption.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-slate-400">Imagen: ${selectedOption}.png</div>`;
                    }}
                  />
                </div>
              )}
              
              {/* Himno written */}
              {isAnthem && (
                <div 
                  className="w-full h-64 md:h-80 rounded-xl overflow-hidden p-6"
                  style={{ 
                    background: 'white',
                    border: `1px solid #cbd5e1`
                  }}
                >
                  <pre className="text-slate-700 text-sm md:text-base font-serif leading-relaxed whitespace-pre-wrap">
                    {currentOption.lyrics}
                  </pre>
                </div>
              )}
            </div>
            
            {/* Right: Description + Parts below */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ 
                  color: currentOption.institution === 'policia' ? COLORS.azulElectrico : COLORS.doradoMetalico 
                }}
              >
                Descripción
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg mb-6">
                {currentOption.description}
              </p>
              
              {/* Parts - NOW BELOW DESCRIPTION */}
              {hasParts && (
                <div className="mt-4">
                  <h4 className="text-slate-500 text-sm uppercase tracking-wider mb-3">
                    Partes del {getTypeName(currentOption.type)}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentParts.map(part => (
                      <button
                        key={part.id}
                        onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedPart === part.id 
                            ? 'text-white' 
                            : 'text-slate-600 border border-slate-300 hover:border-slate-400'
                        }`}
                        style={{ 
                          background: selectedPart === part.id 
                            ? (currentOption.institution === 'policia' ? COLORS.azulElectrico : COLORS.doradoMetalico)
                            : 'white'
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
                      style={{ 
                        background: currentOption.institution === 'policia' 
                          ? `${COLORS.azulElectrico}20` 
                          : `${COLORS.doradoMetalico}20`, 
                        border: `1px solid ${currentOption.institution === 'policia' ? COLORS.azulElectrico : COLORS.doradoMetalico}40` 
                      }}
                    >
                      <p className="text-slate-700">
                        {currentParts.find(p => p.id === selectedPart)?.description}
                      </p>
                    </div>
                  )}
                  
                  {!selectedPart && (
                    <div className="mt-4 p-3 rounded-lg bg-white">
                      <p className="text-slate-400 text-sm">
                        Haz clic en las partes del {getTypeName(currentOption.type)} para ver más información
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeraldryModal;
