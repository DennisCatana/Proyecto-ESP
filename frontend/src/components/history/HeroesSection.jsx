import React, { useState, useRef } from 'react';
import { useScrollAnimation, useTilt } from './ScrollAnimation';
import { policeHeroes, COLORS } from './historyData';

// Image Carousel Component
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div 
        className="w-full h-64 rounded-lg flex items-center justify-center mb-4"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.azulElectrico}, ${COLORS.azulOscuro})`,
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-white opacity-50">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative w-full mb-4">
      <div className="w-full h-64 rounded-lg overflow-hidden" style={{ background: '#f3f4f6' }}>
        <img 
          src={images[currentIndex]} 
          alt={`Imagen ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ 
              background: `linear-gradient(135deg, ${COLORS.azulElectrico}, ${COLORS.azulOscuro})`,
              boxShadow: '0 4px 15px rgba(0,123,255,0.4)'
            }}
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ 
              background: `linear-gradient(135deg, ${COLORS.azulElectrico}, ${COLORS.azulOscuro})`,
              boxShadow: '0 4px 15px rgba(0,123,255,0.4)'
            }}
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="flex justify-center mt-3 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex ? 'scale-125' : 'opacity-50'
              }`}
              style={{ 
                background: index === currentIndex ? COLORS.doradoMetalico : '#9ca3af'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Hero Card Component with 3D Tilt
const HeroCard = ({ hero, index, onClick, isSectionVisible }) => {
  const { ref: tiltRef, rotation, handleMouseMove, handleMouseLeave } = useTilt();
  const [isHovered, setIsHovered] = useState(false);

  // Calculate visibility based on section visibility and index delay
  const isVisible = isSectionVisible;

  return (
    <div 
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="cursor-pointer"
      style={{
        perspective: '1000px',
      }}
    >
      <div 
        ref={tiltRef}
        className={`
          bg-white rounded-xl p-6 transition-all duration-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
        style={{ 
          transform: isVisible 
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
            : 'translateY(20px)',
          transitionDelay: `${index * 0.1}ms`,
          border: `1px solid ${COLORS.plateado}`,
          boxShadow: isHovered 
            ? `0 20px 40px rgba(0,0,0,0.15), 0 0 30px ${COLORS.doradoMetalico}30` 
            : '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <div className="text-center">
          {/* Avatar Placeholder with Icon */}
          <div 
            className="w-20 h-20 mx-auto rounded-full mb-4 flex items-center justify-center text-3xl relative overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${COLORS.doradoClaro}, ${COLORS.doradoOscuro})`,
              boxShadow: `0 0 20px ${COLORS.doradoMetalico}40`,
            }}
          >
            {/* Shimmer Effect */}
            {isHovered && (
              <div 
                className="absolute inset-0 animate-shimmer"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                }}
              />
            )}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h4 className="font-bold text-lg mb-1" style={{ color: COLORS.azulOscuro }}>
            {hero.name}
          </h4>
          <p className="text-sm font-semibold mb-2" style={{ color: COLORS.doradoOscuro }}>
            {hero.rank}
          </p>
          <p className="text-gray-500 text-xs">{hero.achievement}</p>
        </div>
      </div>
    </div>
  );
};

// Heroes Section
const HeroesSection = () => {
  const [ref, isSectionVisible] = useScrollAnimation(0.1);
  const [selectedHero, setSelectedHero] = useState(null);

  return (
    <section 
      className="py-16 px-4 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(180deg, #1e3a5f 0%, #0a1628 100%)` 
      }}
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-10" style={{ filter: 'blur(100px)', background: COLORS.doradoMetalico }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10" style={{ filter: 'blur(100px)', background: COLORS.azulElectrico }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            Heroes Policiales
          </h2>
          <p className="text-gray-300">Hombres y mujeres que dedicaron su vida al servicio institucional</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policeHeroes.map((hero, index) => (
            <HeroCard 
              key={index} 
              hero={hero} 
              index={index}
              isSectionVisible={isSectionVisible}
              onClick={() => setSelectedHero(hero)}
            />
          ))}
        </div>
      </div>

      {/* Hero Modal with Enhanced Animation and Carousel */}
      {selectedHero && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-40"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)' }}
          onClick={() => setSelectedHero(null)}
        >
          <div 
            className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full transform transition-all max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              border: `3px solid ${COLORS.doradoMetalico}`,
              boxShadow: `0 0 50px ${COLORS.doradoMetalico}40`,
              animation: 'modalSlideIn 0.3s ease-out',
            }}
          >
            {/* Image Carousel */}
            <ImageCarousel images={selectedHero.images} />
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2" style={{ color: COLORS.azulOscuro }}>
                {selectedHero.name}
              </h3>
              <p className="text-lg font-semibold mb-2" style={{ color: COLORS.doradoMetalico }}>
                {selectedHero.rank}
              </p>
              <p className="text-gray-600 mb-4">{selectedHero.description}</p>
              <span 
                className="inline-block px-4 py-2 rounded-full text-white text-sm font-semibold"
                style={{ background: `linear-gradient(135deg, ${COLORS.azulElectrico}, ${COLORS.azulOscuro})` }}
              >
                {selectedHero.achievement}
              </span>
            </div>
            <button 
              className="mt-6 w-full py-3 rounded-lg font-semibold transition-colors hover:bg-gray-100"
              style={{ color: COLORS.azulOscuro }}
              onClick={() => setSelectedHero(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroesSection;
