import React, { useState, useEffect } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { useScrollAnimation } from './ScrollAnimation';
import { espTimeline, schoolsEvolution, COLORS } from './historyData';

// Animated Progress Dots
const ProgressDots = ({ total, active, onClick }) => {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onClick(index)}
          className={`transition-all duration-300 rounded-full ${
            active === index ? 'w-8' : 'w-3'
          }`}
          style={{
            height: '8px',
            background: active === index 
              ? `linear-gradient(90deg, ${COLORS.doradoMetalico}, ${COLORS.doradoOscuro})`
              : '#cbd5e1',
            boxShadow: active === index ? `0 0 10px ${COLORS.doradoMetalico}` : 'none',
          }}
        />
      ))}
    </div>
  );
};

// Animated School Card
const AnimatedSchoolCard = ({ school, isActive }) => {
  const [ref, visible] = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className={`
        bg-white rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto transition-all duration-500
        ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute -translate-x-full'}
      `}
      style={{
        border: `2px solid ${COLORS.doradoMetalico}`,
        boxShadow: isActive ? `0 10px 40px rgba(0,0,0,0.1), 0 0 30px ${COLORS.doradoMetalico}20` : 'none',
      }}
    >
      <div className="text-center">
        <div 
          className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
          style={{ 
            background: `linear-gradient(135deg, ${COLORS.doradoMetalico}, ${COLORS.doradoOscuro})`,
            boxShadow: `0 0 20px ${COLORS.doradoMetalico}40`,
          }}
        >
          <span 
            className="text-4xl font-bold text-white"
            style={{ 
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {school.number}
          </span>
        </div>
        <h4 className="text-2xl font-bold mb-2" style={{ color: COLORS.azulOscuro }}>
          {school.name}
        </h4>
        <p className="text-lg font-semibold mb-4" style={{ color: COLORS.doradoOscuro }}>
          {school.year}
        </p>
        <p className="text-gray-600 mb-4">{school.description}</p>
        <p className="text-sm font-medium" style={{ color: COLORS.azulElectrico }}>
          {school.location}
        </p>
      </div>
    </div>
  );
};

// ESP History Section
const ESPHistorySection = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [activeSchool, setActiveSchool] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSchoolChange = (index) => {
    if (index !== activeSchool && !isAnimating) {
      setIsAnimating(true);
      setActiveSchool(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10" style={{ filter: 'blur(80px)', background: COLORS.azulElectrico }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10" style={{ filter: 'blur(80px)', background: COLORS.doradoMetalico }} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle 
          title="Historia de la ESP" 
          subtitle="Mas de 80 anos de formacion policial de excelencia"
        />

        {/* Timeline */}
        <div ref={ref} className="mt-12">
          {espTimeline.map((item, index) => (
            <div 
              key={index}
              className={`
                relative pl-12 md:pl-0 md:flex md:justify-center mb-6
                transition-all duration-700
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div 
                className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.doradoMetalico}, ${COLORS.doradoOscuro})`,
                  boxShadow: `0 0 15px ${COLORS.doradoMetalico}80`,
                }}
              >
                {index + 1}
              </div>
              <div className="md:w-8/12 bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:scale-[1.02]">
                <span className="text-sm font-semibold" style={{ color: COLORS.azulElectrico }}>
                  {item.date}
                </span>
                <h4 className="font-bold text-lg mt-1 mb-2" style={{ color: COLORS.azulOscuro }}>
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <span className="text-xs text-gray-400 mt-2 block">{item.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Evolution of Schools - Interactive Carousel */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: COLORS.azulOscuro }}>
            Evolucion de las Sedes
          </h3>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => handleSchoolChange(Math.max(0, activeSchool - 1))}
              disabled={activeSchool === 0 || isAnimating}
              className="p-2 rounded-full transition-all duration-300 disabled:opacity-30"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.azulElectrico}, ${COLORS.azulOscuro})`,
                color: 'white',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            {schoolsEvolution.map((school, index) => (
              <button
                key={index}
                onClick={() => handleSchoolChange(index)}
                className={`
                  px-4 py-2 rounded-lg font-semibold transition-all duration-300
                  ${activeSchool === index 
                    ? 'text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
                style={{
                  background: activeSchool === index 
                    ? `linear-gradient(135deg, ${COLORS.azulElectrico}, ${COLORS.azulOscuro})`
                    : undefined,
                  opacity: activeSchool === index ? 1 : 0.7,
                }}
              >
                Escuela {school.number}
              </button>
            ))}
            
            <button
              onClick={() => handleSchoolChange(Math.min(schoolsEvolution.length - 1, activeSchool + 1))}
              disabled={activeSchool === schoolsEvolution.length - 1 || isAnimating}
              className="p-2 rounded-full transition-all duration-300 disabled:opacity-30"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.azulElectrico}, ${COLORS.azulOscuro})`,
                color: 'white',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Progress Dots */}
          <ProgressDots 
            total={schoolsEvolution.length} 
            active={activeSchool} 
            onClick={handleSchoolChange}
          />

          {/* Active School Card with Animation */}
          <div className="mt-8 relative h-80">
            {schoolsEvolution.map((school, index) => (
              <AnimatedSchoolCard
                key={index}
                school={school}
                isActive={activeSchool === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ESPHistorySection;
