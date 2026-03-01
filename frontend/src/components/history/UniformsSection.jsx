import React, { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { useScrollAnimation } from './ScrollAnimation';
import { uniforms, COLORS } from './historyData';

// Uniform Icon Component
const UniformIcon = ({ period }) => {
  const icons = {
    '1938 - 1944': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    '1944 - 1970': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
      </svg>
    ),
    '1970 - 1990': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
    ),
    '1990 - Actualidad': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  };
  
  return (
    <div style={{ color: COLORS.azulElectrico }}>
      {icons[period] || icons['1990 - Actualidad']}
    </div>
  );
};

// Uniform Card Component
const UniformCard = ({ uniform, index, isActive, onClick }) => {
  const [ref, visible] = useScrollAnimation(0.2);

  return (
    <div 
      ref={ref}
      onClick={onClick}
      className={`
        rounded-xl p-5 cursor-pointer transition-all duration-300 hover:scale-105
        ${isActive ? 'shadow-2xl' : 'shadow-md hover:shadow-xl'}
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ 
        background: isActive 
          ? `linear-gradient(135deg, ${COLORS.azulElectrico}, ${COLORS.azulOscuro})`
          : COLORS.blanco,
        color: isActive ? COLORS.blanco : COLORS.negroSuave,
        border: isActive ? 'none' : `2px solid ${COLORS.plateado}`,
        transform: visible ? 'none' : 'translateY(20px)',
        transitionDelay: `${index * 100}ms`,
        transition: 'all 0.3s ease',
      }}
    >
      <h4 className="font-bold text-center">{uniform.period}</h4>
      <p className={`text-sm text-center mt-2 ${isActive ? 'text-white/90' : 'text-gray-500'}`}>
        {uniform.name}
      </p>
    </div>
  );
};

// Uniforms Section
const UniformsSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [activeUniform, setActiveUniform] = useState(0);

  return (
    <section className="py-16 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f1f5f9, #e2e8f0)' }}>
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10" style={{ filter: 'blur(80px)', background: COLORS.azulElectrico }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10" style={{ filter: 'blur(80px)', background: COLORS.doradoMetalico }} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle 
          title="Uniformes Institucionales" 
          subtitle="La evolucion del uniforme policial a traves de la historia"
        />

        <div ref={ref} className="mt-12">
          {/* Uniform Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {uniforms.map((uniform, index) => (
              <UniformCard 
                key={index}
                uniform={uniform}
                index={index}
                isActive={activeUniform === index}
                onClick={() => setActiveUniform(index)}
              />
            ))}
          </div>

          {/* Active Uniform Detail */}
          <div 
            className={`
              mt-8 bg-white rounded-2xl p-8 shadow-xl transition-all duration-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{
              border: `2px solid ${COLORS.azulElectrico}`,
              boxShadow: `0 10px 40px rgba(0,0,0,0.1), 0 0 20px ${COLORS.azulElectrico}20`,
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Uniform Icon/Image Placeholder */}
              <div 
                className="w-48 h-48 rounded-xl flex items-center justify-center transition-transform duration-300"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.azulElectrico}20, ${COLORS.azulOscuro}20)`,
                  border: `2px solid ${COLORS.azulElectrico}`,
                  transform: 'scale(1)',
                }}
              >
                <UniformIcon period={uniforms[activeUniform].period} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-sm font-bold" style={{ color: COLORS.doradoMetalico }}>
                  {uniforms[activeUniform].period}
                </span>
                <h3 className="text-2xl font-bold mt-1 mb-3" style={{ color: COLORS.azulOscuro }}>
                  {uniforms[activeUniform].name}
                </h3>
                <p className="text-gray-600 mb-4">{uniforms[activeUniform].description}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {uniforms[activeUniform].details.map((detail, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-semibold transition-transform hover:scale-110"
                      style={{ 
                        background: `linear-gradient(135deg, ${COLORS.azulElectrico}, ${COLORS.azulOscuro})`,
                        color: COLORS.blanco,
                      }}
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniformsSection;
