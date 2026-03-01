import React, { useEffect, useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { useScrollAnimation } from './ScrollAnimation';
import { genesisEras, COLORS } from './historyData';

// Animated Timeline Line Component
const TimelineLine = ({ isVisible }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setHeight(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <div 
      className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden md:block"
      style={{
        background: '#e5e7eb',
      }}
    >
      <div 
        className="w-full transition-all duration-100"
        style={{
          height: `${height}%`,
          background: `linear-gradient(180deg, ${COLORS.doradoMetalico}, ${COLORS.azulElectrico})`,
          boxShadow: `0 0 20px ${COLORS.azulElectrico}50`,
        }}
      />
    </div>
  );
};

// Timeline Card Component
const TimelineCard = ({ era, index }) => {
  const isLeft = index % 2 === 0;
  const [ref, visible] = useScrollAnimation(0.2);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      ref={ref}
      className={`flex items-center mb-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <div className={`md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <div 
          className={`
            bg-white rounded-xl p-6 shadow-lg transition-all duration-700
            border-l-4 hover:shadow-2xl cursor-pointer
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          style={{ 
            borderColor: COLORS.azulElectrico,
            transform: isHovered 
              ? 'scale(1.02) translateY(-5px)' 
              : (visible ? 'none' : (isLeft ? 'translateX(-20px)' : 'translateX(20px)')),
            boxShadow: isHovered ? `0 20px 40px rgba(0,0,0,0.15), 0 0 30px ${COLORS.doradoMetalico}30` : 'none',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span 
            className="text-sm font-bold px-3 py-1 rounded-full inline-block"
            style={{ 
              background: `linear-gradient(135deg, ${COLORS.azulElectrico}, ${COLORS.azulOscuro})`,
              color: COLORS.blanco,
            }}
          >
            {era.year}
          </span>
          <h3 className="text-xl font-bold mt-3 mb-2" style={{ color: COLORS.azulOscuro }}>
            {era.period}
          </h3>
          <p className="text-gray-600 mb-2">{era.description}</p>
          <p className="text-sm italic" style={{ color: COLORS.doradoOscuro }}>
            {era.context}
          </p>
        </div>
      </div>

      {/* Center Dot with Pulse */}
      <div className="hidden md:flex w-1/2 justify-center">
        <div className="relative">
          {/* Pulse Effect */}
          <div 
            className={`absolute inset-0 rounded-full transition-all duration-700 ${visible ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`}
            style={{ 
              background: COLORS.doradoMetalico,
              animation: 'pulse 2s infinite',
            }}
          />
          <div 
            className={`
              w-6 h-6 rounded-full border-4 transition-all duration-700 relative z-10
              ${visible ? 'scale-100' : 'scale-0'}
            `}
            style={{ 
              background: COLORS.blanco,
              borderColor: COLORS.doradoMetalico,
              boxShadow: `0 0 15px ${COLORS.doradoMetalico}`,
            }}
          />
        </div>
      </div>

      {/* Empty Space */}
      <div className="md:w-1/2" />
    </div>
  );
};

// Genesis Timeline Component
const GenesisSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className="py-16 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle 
          title="Genesis de la Policia Nacional" 
          subtitle="Una linea evolutiva que abarca siglos de historia institucional"
        />

        {/* Interactive Timeline */}
        <div className="relative mt-12">
          {/* Timeline Line with Animation */}
          <TimelineLine isVisible={isVisible} />

          {genesisEras.map((era, index) => (
            <TimelineCard 
              key={index} 
              era={era} 
              index={index} 
            />
          ))}
        </div>
      </div>

      {/* Pulse Animation Keyframes */}
      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default GenesisSection;
