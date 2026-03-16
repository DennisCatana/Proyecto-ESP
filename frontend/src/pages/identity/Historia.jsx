import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import GenesisSection from '../../components/history/GenesisSection';
import MilestonesSection from '../../components/history/MilestonesSection';
import ESPHistorySection from '../../components/history/ESPHistorySection';
import HeroesSection from '../../components/history/HeroesSection';
import UniformsSection from '../../components/history/UniformsSection';
import { COLORS } from '../../components/history/historyData';
import { useTypewriter} from '../../components/history/ScrollAnimation';

// Import history images
import history1938 from '../../assets/history/1938.jpg';
import history1938_1 from '../../assets/history/1938(1).jpg';
import history1938_2 from '../../assets/history/1938(2).jpg';
import history1944 from '../../assets/history/1944.jpg';
import history1944_1 from '../../assets/history/1944(1).jpg';
import history1944_2 from '../../assets/history/1944(2).jpg';
import historyESP from '../../assets/history/ESP.jpg';
import historyESP_1 from '../../assets/history/ESP(1).jpg';
import historyESP_2 from '../../assets/history/ESP(2).jpg';
import historyRANCHO from '../../assets/history/RANCHO.jpg';
import historyRANCHO_1 from '../../assets/history/RANCHO(1).jpg';
import historyRANCHO_2 from '../../assets/history/RANCHO(2).jpg';
import historySantoDomingo from '../../assets/history/santo domingo.jpg';
import historySantoDomingo_1 from '../../assets/history/santo domingo(1).jpg';
import historySantoDomingo_2 from '../../assets/history/santo domingo(2).jpg';

// Image particle component - displays images instead of colored dots
// Updated to move across the entire Hero section
const ImageParticle = ({ delay, size, initialX, duration, image, zIndex, initialY }) => {
  return (
    <div
      className="absolute rounded-lg overflow-hidden opacity-40"
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
        animation: `floatAround ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        zIndex: zIndex,
      }}
    >
      <img 
        src={image} 
        alt="History" 
        className="w-full h-full object-cover"
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover' 
        }}
      />
    </div>
  );
};

// Animated Shield Icon
const ShieldIcon = ({ delay, left, size }) => {
  return (
    <div
      className="absolute opacity-20"
      style={{
        left: `${left}%`,
        top: '20%',
        fontSize: `${size}px`,
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill={COLORS.doradoMetalico}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      </svg>
    </div>
  );
};

// Scroll Indicator
const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }}
    >
      <div className="flex flex-col items-center text-white/70">
        <span className="text-sm mb-2">Desliza para explorar</span>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </div>
  );
};

// Main Historia Component
const Historia = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [titleText] = useTypewriter('Historia Institucional', 80);

  return (
    <div className="min-h-screen flex flex-col font-segoe">
      <Header />
      
      <main className="grow" style={{ background: '#f8fafc' }}>
        {/* Hero Section */}
        <section 
          className="py-60 px-4 text-center relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0077B6 100%)`,
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute top-10 left-10 w-32 h-32 rounded-full"
              style={{ background: COLORS.doradoMetalico, filter: 'blur(60px)' }}
            />
            <div 
              className="absolute bottom-10 right-10 w-40 h-40 rounded-full"
              style={{ background: COLORS.azulElectrico, filter: 'blur(80px)' }}
            />
          </div>
          
          {/* Floating Image Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              history1938, history1938_1, history1938_2,
              history1944, history1944_1, history1944_2,
              historyESP, historyESP_1, historyESP_2,
              historyRANCHO, historyRANCHO_1, historyRANCHO_2,
              historySantoDomingo, historySantoDomingo_1, historySantoDomingo_2
            ].map((image, i) => (
              <ImageParticle
                key={i}
                image={image}
                delay={i * 0.8}
                size={Math.random() * 80 + 60}
                initialX={Math.random() * 100}
                initialY={Math.random() * 80 + 10}
                duration={Math.random() * 15 + 12}
                zIndex={i % 3}
              />
            ))}
          </div>
          
          {/* CSS Animation for floating particles */}
          <style>{`
            @keyframes floatAround {
              0%, 100% {
                transform: translate(0, 0) rotate(0deg);
              }
              25% {
                transform: translate(30px, -30px) rotate(5deg);
              }
              50% {
                transform: translate(-20px, -50px) rotate(-5deg);
              }
              75% {
                transform: translate(20px, -20px) rotate(3deg);
              }
            }
          `}</style>

          {/* Shield Icons */}
          <ShieldIcon delay={0} left={5} size={60} />
          <ShieldIcon delay={1} left={85} size={80} />
          <ShieldIcon delay={2} left={15} size={40} />
          <ShieldIcon delay={3} left={75} size={50} />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ 
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                color: COLORS.doradoBrillante,
                minHeight: '1.2em',
              }}
            >
              {titleText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              Más de 80 años de tradición, honor y servicio a la patria
            </p>
          </div>

          {/* Scroll Indicator */}
          <ScrollIndicator />
        </section>

        {/* Sections */}
        <GenesisSection />
        <MilestonesSection />
        <ESPHistorySection />
        <HeroesSection />
        <UniformsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Historia;
