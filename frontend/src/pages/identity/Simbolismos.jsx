import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SectionTitle from '../../components/ui/SectionTitle';
import { 
  HeraldryModal,
  AttributesModal,
  CeremoniesModal,
  EmblemasModal
} from '../../components/simbolismos';

// Colores institucionales - VERSIÓN MEJORADA Y MAS VIBRANTE
const COLORS = {
  // Dorados - más ricos y profundos
  doradoMetalico: '#D4A84B',
  doradoClaro: '#F4D03F',
  doradoOscuro: '#B8860B',
  doradoBrillante: '#FFD700',
  
  // Azules - más vibrantes y con más profundidad
  azulElectrico: '#00B4D8',
  azulOscuro: '#023E8A',
  azulCielo: '#48CAE4',
  azulProfundo: '#0077B6',
  
  // Grises y neutros
  plateado: '#9CA3AF',
  plateadoBrillante: '#E5E7EB',
  blancoPerla: '#F8FAFC',
  
  // Acentos
  blanco: '#FFFFFF',
  negroSuave: '#1E293B',
};

// Symbol data for the radar - Full names only, NO icons
// 4 nodes evenly distributed at 90 degree intervals
const symbols = [
  { id: 'heraldica', label: 'Heráldica', angle: -90 },
  { id: 'atributos', label: 'Atributos de Mando', angle: 0 },
  { id: 'ceremonias', label: 'Actos Ceremoniales', angle: 90 },
  { id: 'emblemas', label: 'Emblemas', angle: 180 },
];

// Custom Radar Node - text only, NO icons
const AnimatedRadarNode = ({ label, angle, isActive, onClick }) => {
  const angleRad = angle * Math.PI / 180;
  const radius = 38;
  const x = 50 + Math.cos(angleRad) * radius;
  const y = 50 + Math.sin(angleRad) * radius;
  
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: 10,
      }}
      onClick={onClick}
    >
      {/* Animated glow ring - más brillante */}
      {isActive && (
        <div 
          className="absolute inset-0 rounded-full animate-ping"
          style={{ 
            background: `radial-gradient(circle, ${COLORS.doradoBrillante} 0%, transparent 70%)`,
            animationDuration: '1.5s',
            filter: 'blur(2px)',
          }} 
        />
      )}
      
      {/* Main node - versión mejorada con más contraste */}
      <div 
          className={`relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
            isActive ? 'border-2' : 'border'
          }`}
          style={{ 
            // Gradiente más rico y con más colores
            background: isActive 
              ? `linear-gradient(145deg, 
                  ${COLORS.doradoClaro} 0%, 
                  ${COLORS.doradoMetalico} 30%, 
                  ${COLORS.azulProfundo} 70%, 
                  ${COLORS.azulOscuro} 100%)`
              : `linear-gradient(145deg, 
                  ${COLORS.blancoPerla} 0%, 
                  #E2E8F0 50%, 
                  #CBD5E1 100%)`,
            borderColor: isActive ? COLORS.blanco : '#94A3B8',
            
            // Sombra más intensa y colorida
            boxShadow: isActive 
              ? `
                  0 0 30px ${COLORS.doradoMetalico}90,
                  0 0 60px ${COLORS.azulElectrico}40,
                  inset 0 0 15px rgba(255,255,255,0.4),
                  0 10px 40px rgba(0,0,0,0.3)
                `
              : `
                  0 4px 15px rgba(0,0,0,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.8)
                `,
            
            // Animación de pulso si está activo
            animation: isActive ? 'nodePulse 2s ease-in-out infinite' : 'none',
          }}
        >
        {/* Brillantez interior (efecto gloss) */}
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: isActive
              ? `linear-gradient(135deg, 
                  rgba(255,255,255,0.4) 0%, 
                  transparent 50%, 
                  rgba(0,0,0,0.1) 100%)`
              : `linear-gradient(135deg, 
                  rgba(255,255,255,0.8) 0%, 
                  transparent 50%)`,
          }}
        />
        
        {/* Borde dorado interior */}
        <div 
          className="absolute inset-1 rounded-lg pointer-events-none opacity-50"
          style={{
            border: isActive 
              ? `1px solid ${COLORS.doradoClaro}` 
              : '1px solid transparent',
          }}
        />
        
        {/* Corner decorations - más visibles */}
        <div 
          className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 rounded-sm transition-all duration-300" 
          style={{ 
            borderColor: isActive ? COLORS.blanco : COLORS.plateado,
            boxShadow: isActive ? `0 0 8px ${COLORS.doradoBrillante}` : 'none'
          }} 
        />
        <div 
          className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 rounded-sm transition-all duration-300" 
          style={{ 
            borderColor: isActive ? COLORS.blanco : COLORS.plateado,
            boxShadow: isActive ? `0 0 8px ${COLORS.doradoBrillante}` : 'none'
          }} 
        />
        <div 
          className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 rounded-sm transition-all duration-300" 
          style={{ 
            borderColor: isActive ? COLORS.blanco : COLORS.plateado,
            boxShadow: isActive ? `0 0 8px ${COLORS.doradoBrillante}` : 'none'
          }} 
        />
        <div 
          className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 rounded-sm transition-all duration-300" 
          style={{ 
            borderColor: isActive ? COLORS.blanco : COLORS.plateado,
            boxShadow: isActive ? `0 0 8px ${COLORS.doradoBrillante}` : 'none'
          }} 
        />
        
        {/* Label - texto mejorado */}
        <span 
          className={`text-xs md:text-sm font-bold text-center px-2 leading-tight drop-shadow-md`}
          style={{ 
            color: isActive ? COLORS.blanco : COLORS.negroSuave,
            textShadow: isActive 
              ? `0 2px 4px rgba(0,0,0,0.5)` 
              : 'none',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

// Interactive Radar Section
const RadarSection = ({ activeModal, setActiveModal }) => {
  return (
    <section className="relative px-4 py-8">
      {/* Box Container - versión mejorada */}
      <div 
        className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden"
        style={{ 
          background: `
            linear-gradient(180deg, #0a1628 0%, #1e3a5f 50%, #0a1628 100%)
          `,
          border: `2px solid ${COLORS.doradoMetalico}`,
          boxShadow: `
            0 0 40px rgba(212,168,75,0.3),
            0 0 80px rgba(0,180,216,0.2),
            inset 0 0 60px rgba(0,0,0,0.5)
          `
        }}
      >
        {/* Background effects - más llamativos */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            background: `
              radial-gradient(ellipse at 20% 20%, ${COLORS.azulElectrico}40 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, ${COLORS.doradoMetalico}30 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, ${COLORS.azulProfundo}20 0%, transparent 60%)
            `
          }} 
        />
        
        {/* Grid pattern decorativo */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(${COLORS.doradoMetalico} 1px, transparent 1px),
              linear-gradient(90deg, ${COLORS.doradoMetalico} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
{/* Subtitle */}
        <div className="relative z-10 text-center mb-6 pt-6">
          <p className="text-base max-w-2xl mx-auto font-medium"
             style={{ color: COLORS.plateadoBrillante }}>
            Explora los cuatro pilares fundamentales de nuestros símbolos institucionales
          </p>
        </div>
        
        {/* Radar Container with SVG animation */}
        <div className="relative w-full aspect-square max-w-3xl mx-auto">
          {/* SVG Background - mejorado */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Gradientes vibrantes */}
              <linearGradient id="centerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={COLORS.doradoBrillante} stopOpacity="0.6" />
                <stop offset="50%" stopColor={COLORS.doradoMetalico} stopOpacity="0.3" />
                <stop offset="100%" stopColor={COLORS.azulElectrico} stopOpacity="0" />
              </linearGradient>
              
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={COLORS.doradoMetalico} stopOpacity="0" />
                <stop offset="50%" stopColor={COLORS.doradoMetalico} stopOpacity="0.8" />
                <stop offset="100%" stopColor={COLORS.azulElectrico} stopOpacity="0" />
              </linearGradient>
              
              {/* Filtro de resplandor */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Animated concentric circles - más coloridos */}
            <circle cx="50" cy="50" r="47" fill="none" stroke={COLORS.azulProfundo} strokeWidth="0.3" opacity="0.6" />
            <circle cx="50" cy="50" r="38" fill="none" stroke={COLORS.azulElectrico} strokeWidth="0.3" opacity="0.5" />
            <circle cx="50" cy="50" r="28" fill="none" stroke={COLORS.doradoMetalico} strokeWidth="0.3" opacity="0.4" />
            <circle cx="50" cy="50" r="18" fill="none" stroke={COLORS.doradoClaro} strokeWidth="0.3" opacity="0.3" />
            
            {/* Animated radar sweep - más brillante */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="url(#centerGrad)" strokeWidth="0.5" filter="url(#glow)">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                from="0 50 50" 
                to="360 50 50" 
                dur="2s" 
                repeatCount="indefinite" 
              />
            </circle>
            
            {/* Segundo radar sweep - más lento */}
            <circle cx="50" cy="50" r="40" fill="none" stroke={COLORS.doradoMetalico} strokeWidth="0.2" opacity="0.3">
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                from="360 50 50" 
                to="0 50 50" 
                dur="5s" 
                repeatCount="indefinite" 
              />
            </circle>
            
{/* Connection lines - gradientes */}
            {symbols.map((symbol, i) => {
              const angleRad = symbol.angle * Math.PI / 180;
              const radius = 38;
              const x = 50 + Math.cos(angleRad) * radius;
              const y = 50 + Math.sin(angleRad) * radius;
              return (
                <line 
                  key={i}
                  x1="50" 
                  y1="50" 
                  x2={x} 
                  y2={y} 
                  stroke={COLORS.doradoMetalico}
                  strokeWidth="0.8"
                  opacity="0.8"
                />
              );
            })}
          </svg>
          
{/* Central Core - versión mejorada con señales emitidas */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Señales emitidas desde el centro */}
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{ 
                background: `radial-gradient(circle, transparent 30%, ${COLORS.azulElectrico}20 60%, transparent 100%)`,
                animationDuration: '2s',
                animationDelay: '0s',
              }}
            />
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{ 
                background: `radial-gradient(circle, transparent 30%, ${COLORS.doradoMetalico}20 60%, transparent 100%)`,
                animationDuration: '2s',
                animationDelay: '0.5s',
              }}
            />
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{ 
                background: `radial-gradient(circle, transparent 30%, ${COLORS.azulElectrico}20 60%, transparent 100%)`,
                animationDuration: '2s',
                animationDelay: '1s',
              }}
            />
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{ 
                background: `radial-gradient(circle, transparent 30%, ${COLORS.doradoMetalico}20 60%, transparent 100%)`,
                animationDuration: '2s',
                animationDelay: '1.5s',
              }}
            />
            
            <div 
              className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
              style={{ 
                background: `
                  radial-gradient(circle at 30% 30%, ${COLORS.blancoPerla} 0%, ${COLORS.plateadoBrilliant} 30%, ${COLORS.plateado} 100%)
                `,
                border: `4px solid ${COLORS.doradoBrillante}`,
                boxShadow: `
                  0 0 50px ${COLORS.doradoMetalico}60,
                  0 0 100px ${COLORS.azulElectrico}30,
                  inset 0 0 30px rgba(255,255,255,0.3),
                  0 20px 60px rgba(0,0,0,0.5)
                `,
              }}
            >
              {/* Anillo interior brillante */}
              <div 
                className="absolute inset-3 rounded-full"
                style={{
                  border: `2px solid ${COLORS.doradoMetalico}`,
                  boxShadow: `inset 0 0 20px ${COLORS.doradoMetalico}40`,
                }}
              />
              
              {/* Segundo anillo */}
              <div 
                className="absolute inset-6 rounded-full"
                style={{
                  border: `1px solid ${COLORS.azulElectrico}`,
                  opacity: 0.5,
                }}
              />
              
              {/* Shield Image */}
              <div 
                className="w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-2"
                style={{ 
                  borderColor: COLORS.doradoMetalico,
                  boxShadow: `inset 0 0 20px rgba(0,0,0,0.3)`,
                }}
              >
                <img 
                  src="/src/assets/logo1ro.png" 
                  alt="Escudo Policía Nacional"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Nodes - full names, NO icons */}
          {symbols.map(symbol => (
            <AnimatedRadarNode
              key={symbol.id}
              label={symbol.label}
              angle={symbol.angle}
              isActive={activeModal === symbol.id}
              onClick={() => setActiveModal(symbol.id)}
            />
          ))}
        </div>
        
                {/* Instructions */}
        <p className="text-sm mt-6 text-center pb-6 font-medium" style={{ color: COLORS.plateado }}>
          <span style={{ color: COLORS.doradoClaro }}>♦</span> Haz clic en cada elemento para explorar su significado <span style={{ color: COLORS.doradoClaro }}>♦</span>
        </p>
      </div>
      
      {/* Closing Quote - versión mejorada */}
      <div className="mt-10 max-w-3xl mx-auto text-center pb-10">
        <blockquote 
          className="text-lg md:text-xl font-serif leading-relaxed"
          style={{ 
            color: COLORS.azulOscuro,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}
        >
          "Quien porta estos símbolos no solo representa una institución,<br/>
          <span 
            style={{ 
              color: COLORS.doradoBrillante,
              textShadow: `0 0 20px ${COLORS.doradoMetalico}80`
            }}
          >
            sino un compromiso con la sociedad.
          </span>"
        </blockquote>
        
        {/* Decorative line - mejorada */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div 
            className="h-px w-20" 
            style={{ 
              background: `linear-gradient(90deg, transparent, ${COLORS.doradoBrillante})`,
              boxShadow: `0 0 10px ${COLORS.doradoMetalico}`
            }} 
          />
          <div 
            className="w-3 h-3 rotate-45" 
            style={{ 
              background: COLORS.doradoBrillante,
              boxShadow: `0 0 15px ${COLORS.doradoBrillante}`
            }} 
          />
          <div 
            className="h-px w-20" 
            style={{ 
              background: `linear-gradient(90deg, ${COLORS.doradoBrillante}, transparent)`,
              boxShadow: `0 0 10px ${COLORS.doradoMetalico}`
            }} 
          />
        </div>
      </div>
    </section>
  );
};

// Main Simbolismos Component
const Simbolismos = () => {
  const [activeModal, setActiveModal] = useState(null);
  
  const closeModal = () => setActiveModal(null);
  
  return (
    <div className="min-h-screen flex flex-col font-segoe" style={{ background: '#fffff' }}>
      <Header />
      
      <main className="grow py-8 px-5" style={{ 
        background: `
          radial-gradient(ellipse at top, #fffff 100%, #ffffff 100%, #fffff 100%)
        ` 
      }}>
        <div className="max-w-300 mx-auto">
          {/* Title Section */}
          <SectionTitle 
            title="SIMBOLISMOS" 
            subtitle="Los símbolos no se observan… se comprenden, se respetan y se viven."
          />
          
          {/* Interactive Radar Section */}
          <RadarSection 
            activeModal={activeModal} 
            setActiveModal={setActiveModal} 
          />
        </div>
      </main>
      
      <Footer />
      
{/* Modals with blurred backdrop */}
      {activeModal === 'heraldica' && <HeraldryModal onClose={closeModal} />}
      {activeModal === 'atributos' && <AttributesModal onClose={closeModal} />}
      {activeModal === 'ceremonias' && <CeremoniesModal onClose={closeModal} />}
      {activeModal === 'emblemas' && <EmblemasModal onClose={closeModal} />}
    </div>
  );
};

export default Simbolismos;