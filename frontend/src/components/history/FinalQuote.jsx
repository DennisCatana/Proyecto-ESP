import React from 'react';
import { useScrollAnimation } from './ScrollAnimation';
import { COLORS } from './historyData';

// Animated Background Pattern
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Decorative Circles */}
      <div 
        className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-10"
        style={{ 
          background: COLORS.doradoMetalico,
          animation: 'floatCircle 8s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-10"
        style={{ 
          background: COLORS.azulElectrico,
          animation: 'floatCircle 10s ease-in-out infinite reverse',
        }}
      />
      <div 
        className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full opacity-10"
        style={{ 
          background: COLORS.azulOscuro,
          animation: 'floatCircle 6s ease-in-out infinite',
        }}
      />
    </div>
  );
};

// Large Quote Mark
const QuoteMark = ({ position }) => {
  const styles = position === 'start' 
    ? { top: '-10px', left: '-10px' }
    : { bottom: '-10px', right: '-10px', transform: 'rotate(180deg)' };

  return (
    <span 
      className="absolute text-8xl font-serif opacity-20"
      style={{ 
        color: COLORS.doradoMetalico,
        ...styles,
        fontFamily: 'Georgia, serif',
      }}
    >
      "
    </span>
  );
};

// Final Quote Component
const FinalQuote = () => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  return (
    <section 
      ref={ref}
      className="py-20 px-4 text-center relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${COLORS.azulOscuro}10, ${COLORS.azulElectrico}10)`,
      }}
    >
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <blockquote 
          className={`
            text-2xl md:text-3xl font-serif leading-relaxed transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          style={{ 
            color: COLORS.azulOscuro,
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          {/* Start Quote Mark */}
          <QuoteMark position="start" />
          
          "La historia institucional no solo se informa, 
          <span 
            className="font-bold transition-all duration-500"
            style={{ 
              color: COLORS.doradoBrillante,
              textShadow: `0 0 20px ${COLORS.doradoMetalico}50`,
            }}
          >
            se experimenta
          </span>."
          
          {/* End Quote Mark */}
          <QuoteMark position="end" />
        </blockquote>

        {/* Decorative Line */}
        <div 
          className={`
            mx-auto mt-8 h-1 rounded-full transition-all duration-700 delay-300
            ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
          `}
          style={{
            width: '150px',
            background: `linear-gradient(90deg, transparent, ${COLORS.doradoMetalico}, transparent)`,
          }}
        />
      </div>

      {/* Keyframes for animation */}
      <style>{`
        @keyframes floatCircle {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
      `}</style>
    </section>
  );
};

export default FinalQuote;
