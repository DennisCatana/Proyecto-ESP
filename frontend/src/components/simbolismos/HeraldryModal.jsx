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
    description: 'El escudo de la Policía Nacional del Ecuador representa a la institución encargada de garantizar el orden público y la seguridad ciudadana en el país.',
  },
  bandera_policia: {
    id: 'bandera_policia',
    name: 'Bandera PNE',
    type: 'flag',
    institution: 'policia',
    description: 'La bandera de la Policía Nacional del Ecuador fue adoptada oficialmente el 4 de julio de 1959 como símbolo de consolidación e identidad institucional.',
  },
  himno_policia: {
    id: 'himno_policia',
    name: 'Himno PNE',
    type: 'anthem',
    institution: 'policia',
    description: 'Letra y música: Reverendo Padre Jorge Bylach Planas',
    lyrics: `CORO:
Nuestra vida es servicio ferviente,
 a la Patria en entrega total;
 a su voz respondemos:
 “Presente, Policía valiente y leal”
Somos fieles guardianes del orden,
 defendemos la paz, la justicia;
 de la ley somos fuerte milicia
 que asegura al país libertad.
Inflamados de amor a la Patria,
 tremolando sin marcha su emblema,
 viviremos con fe nuestro lema:
 “Disciplina, valor, lealtad”
Meditemos en nuestro estandarte,
 fiel compendio de nuestro civismo,
 para ser, con honor y heroísmo,
 centinelas del orden social;
 nuestro noble blasón nos impulse,
 con su signo de Ley justiciera,
 a empuñar nuestra espada guerrera
 contra todas las fuerzas del mal.
Custodiando las vidas humanas,
 en constante y dura vigía
 patrullamos de noche y de día
 por las rutas de nuestro Ecuador;
 y en las calles, ciudades y campos
 de la costa, el oriente y la sierra
 siempre estamos alerta y en guerra
 contra común malhechor.
Al impulso del fuego sagrado,
 que forjara un pasado de gloria,
 seguiremos la gran trayectoria
 de servicio a nuestra Nación;
 si, en defensa de nuestros hermanos,
 es preciso ofrendar nuestra vida,
 que sepamos amar sin medida
 por cumplir nuestra noble misión.`,
  },
  // ESCUELA SUPERIOR DE POLICÍA
  escudo_escuela: {
    id: 'escudo_escuela',
    name: 'Escudo ESP',
    type: 'shield',
    institution: 'escuela',
    description: 'El escudo de la Escuela Superior de Policía representa la formación académica y profesional de sus miembros, orientada al cumplimiento de la ley y al servicio a la sociedad.',
  },
  bandera_escuela: {
    id: 'bandera_escuela',
    name: 'Bandera ESP',
    type: 'flag',
    institution: 'escuela',
    description: 'La bandera de la Escuela Superior de Policía fue creada mediante Orden General No. 18 del 25 de enero de 1990 como símbolo de identidad institucional, utilizado en actos protocolarios, ceremonias y eventos oficiales. Representa la formación y pertenencia al alma mater policial, y mantiene una disposición formal dentro de los eventos junto a los símbolos nacionales y de la Policía.',
  },
  himno_escuela: {
    id: 'himno_escuela',
    name: 'Himno ESP',
    type: 'anthem',
    institution: 'escuela',
    description: 'El himno de la Escuela Superior de Policía celebra la formación de futuros oficiales y el compromiso con la excelencia académica.',
    lyrics: `CORO:
Desbordante de júbilo el pecho,
 la bandera de las manos arietes,
 entonemos un himno cadetes
 a la escuela vigía del bien.
Y a la sombra del lábaro santo
 que derrama colores el viento
 sea un grito el viril juramento
 por el pueblo, la patria y la ley.
Vigilantes nos haya la aurora
 sosteniendo una mágica tea
 y en el libro, derecho y la idea
 perseguimos un mismo ideal.
En el campo de marte o en el aula
 ante dios o mitad de la calle,
 en el risco, en el mar y en el valle
 te aclamamos, escuela sin par.`,
  },
};

// Partes específicas del ESCUDO DE LA POLICÍA NACIONAL
const escudoPoliciaParts = [
  { id: '1', name: 'Frase superior', description: 'Denominación atribuida a la Institución de orden y seguridad de la República.' },
  { id: '2', name: 'Espada', description: 'Representa justicia y poder.' },
  { id: '3', name: 'Guerrero', description: 'Representa la fuerza de la Policía Nacional en constante lucha.' },
  { id: '4', name: 'Hilera de Hitos', description: 'Representa los límites territoriales del Estado ecuatoriano, significa que los servicio policiales son puntuales de seguridad sociales.' },
  { id: '5', name: 'Escudete Plateado', description: 'Instrumento defensivo, siendo la LEY' },
  { id: '6', name: 'Cinta Tricolor', description: 'Inscrita la leyenda: “ORDEN Y SEGURIDAD SOCIAL”; Lema, principio y fin de la existencia de esta institución al servicio de la sociedad y del Estado.' },
  { id: '7', name: 'El Condor', description: 'Simboliza la libertad e independencia.' },
  { id: '8', name: 'Plomo-Plata', description: 'Inteligencia, obediencia, firmeza, vigilancia y vencimiento.' },
  { id: '9', name: 'Azul', description: 'Justicia, cielo, verdad y lealta.' },
  { id: '10', name: 'Sangre de los Héroes', description: 'Que sacrificaron sus vidas en defensa de la Constitución.' },
  { id: '11', name: 'Palmas de Laurel', description: 'Indica el prestigio y buena fama que como institución del Estado acreditan a la Policía Nacional las virtudes cívicas del patriotismo y lealtad.' },
];

// Partes específicas del ESCUDO DE LA ESCUELA SUPERIOR DE POLICÍA
const escudoEscuelaParts = [
  { id: '1.1', name: 'Antorcha', description: 'Con su tea encendida, que es la luz y la cultura que emanan del Primer Plantel Educacional Policial de la República.' },
  { id: '2.1', name: 'Pirámide', description: 'Signo de perpetuidad hacia el futuro.' },
  { id: '3.1', name: 'Libro Abierto', description: 'Con la inicial de LEX, que son las leyes que rigen al país y que la Policía la custodia con su lealtad.' },
  { id: '4.1', name: 'Columnas', description: 'Estilo dórico, truncas, sinónimo de belleza y armonía.' },
  
];
// Partes específicas de la BANDERA DE LA POLICÍA NACIONAL
const banderaPoliciaParts = [
  { id: '1.2', name: 'Franja superior (plomo-plata)', description: 'Representa la imparcialidad en el ejercicio de la función policial.' },
  { id: '2.2', name: 'Franja inferior (azul)', description: 'Simboliza la lealtad y la legalidad en el cumplimiento del deber.' },
  { id: '3.2', name: 'Escudo de Armas', description: 'Identifica formalmente a la institución y reafirma su carácter oficial dentro del Estado.' },
  
];

// Partes específicas de la BANDERA DE LA ESCUELA SUPERIOR DE POLICÍA
const banderaEscuelaParts = [
  { id: '1.3', name: 'Campo blanco', description: 'Base principal del diseño que representa la pureza.' },
  { id: '2.3', name: 'Franjas longitudinales', description: 'Colores plomo-plata y azul esmaltado que representan la bandera de la Policia Nacional del Ecuador.' },
  { id: '3.3', name: 'Escudo', description: 'Identifica a la Escuela Superior de Policía.' },
  { id: '4.3', name: 'Dimensiones', description: '1,35 m de largo por 1,10 m de ancho.' },
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
    <div className="fixed text-justify inset-0 z-50 flex items-start justify-center p-4 ">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
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
              
              {/* Image for shields and flags - with arrow indicator */}
              {hasParts && (
                <div 
                  className="w-full h-64 md:h-80 rounded-xl overflow-hidden relative"
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
                  {/* Arrow indicator for selected part */}
                  {selectedPart && (
                    <div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce"
                      style={{ color: currentOption.institution === 'policia' ? COLORS.azulElectrico : COLORS.doradoMetalico }}
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
                        {currentParts.find(p => p.id === selectedPart)?.name}
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Himno written - with scroll */}
              {isAnthem && (
                <div 
                  className="w-full h-64 md:h-80 rounded-xl overflow-hidden p-6"
                  style={{ 
                    background: 'white',
                    border: `1px solid #cbd5e1`,
                    overflowY: 'auto'
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
