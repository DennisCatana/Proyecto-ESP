import React, { useEffect, useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { useScrollAnimation } from './ScrollAnimation';
import { milestones, COLORS } from './historyData';

// Icon Component for Milestones
const MilestoneIcon = ({ year }) => {
  const icons = {
    '1846': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    '1896': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      </svg>
    ),
    '1923': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    '1938': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  };
  
  return icons[year] || (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <circle cx="12" cy="12" r="10"/>
    </svg>
  );
};

// Animated Progress Line
const ProgressLine = ({ isVisible }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 3;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200">
      <div 
        className="w-full transition-all duration-100"
        style={{
          height: `${progress}%`,
          background: `linear-gradient(180deg, ${COLORS.doradoMetalico}, ${COLORS.azulElectrico})`,
          boxShadow: `0 0 10px ${COLORS.azulElectrico}`,
        }}
      />
    </div>
  );
};

// Milestone Card Component
const MilestoneCard = ({ milestone, index }) => {
  const isLeft = index % 2 === 0;
  const [ref, visible] = useScrollAnimation(0.2);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      ref={ref}
      className={`relative flex items-center mb-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Year Badge with Glow */}
      <div 
        className={`
          absolute left-4 md:left-1/2 transform -translate-x-1/2 
          w-20 h-20 rounded-full flex items-center justify-center
          text-white font-bold text-lg z-10 transition-all duration-700
          ${visible ? 'scale-100' : 'scale-0'}
          ${isHovered ? 'shadow-lg' : ''}
        `}
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.azulElectrico}, ${COLORS.azulOscuro})`,
          boxShadow: isHovered ? `0 0 30px ${COLORS.azulElectrico}` : `0 0 20px ${COLORS.azulElectrico}60`,
          transform: isHovered ? 'scale(1.1)' : (visible ? 'scale(1)' : 'scale(0)'),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-center">
          <div className="text-xs opacity-80">Year</div>
          <div>{milestone.year}</div>
        </div>
      </div>

      {/* Content */}
      <div className={`ml-24 md:ml-0 md:w-5/12 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
        <div 
          className={`
            bg-white rounded-lg p-5 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer
            ${visible ? 'opacity-100 translate-x-0' : 'opacity-0'}
          `}
          style={{ 
            transform: isHovered ? 'scale(1.05)' : (visible ? 'none' : (isLeft ? 'translateX(-30px)' : 'translateX(30px)')),
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: isHovered ? `0 15px 30px rgba(0,0,0,0.15)` : 'none',
          }}
        >
          {/* Icon */}
          <div 
            className="mb-3 inline-flex items-center justify-center"
            style={{ color: COLORS.doradoMetalico }}
          >
            <MilestoneIcon year={milestone.year} />
          </div>
          <h4 className="font-bold text-lg mb-2" style={{ color: COLORS.negroSuave }}>
            {milestone.title}
          </h4>
          <p className="text-gray-600 text-sm">{milestone.description}</p>
        </div>
      </div>

      {/* Empty Space */}
      <div className="md:w-5/12" />
    </div>
  );
};

// Milestones Section
const MilestonesSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className="py-16 px-4" style={{ background: 'linear-gradient(180deg, #f8fafc, #e2e8f0)' }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle 
          title="Hitos Importantes" 
          subtitle="Los momentos que definieron nuestra institucion"
        />

        <div 
          ref={ref}
          className="relative mt-12"
        >
          {/* Animated Progress Line */}
          <ProgressLine isVisible={isVisible} />

          {milestones.map((milestone, index) => (
            <MilestoneCard 
              key={index} 
              milestone={milestone} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MilestonesSection;
