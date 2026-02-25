import React from 'react';

// Colores institucionales
const COLORS = {
  azulElectrico: '#007BFF',
  doradoMetalico: '#C9A646',
  plateado: '#C0C0C0',
};

const RadarNode = ({ icon, label, angle, isActive, onClick }) => {
  // Calculate position based on angle
  const radius = 38; // percentage from center
  const centerX = 50;
  const centerY = 50;
  const radianAngle = (angle * Math.PI) / 180;
  const x = centerX + Math.cos(radianAngle) * radius;
  const y = centerY + Math.sin(radianAngle) * radius;
  
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
      }}
    >
      {/* Connection point glow */}
      <div 
        className={`absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isActive ? 'scale-150' : 'scale-100'
        }`}
        style={{ 
          left: '50%', 
          top: '50%',
          background: isActive ? COLORS.doradoMetalico : COLORS.plateado,
          boxShadow: isActive ? `0 0 20px ${COLORS.doradoMetalico}` : 'none'
        }}
      />
      
      {/* Node Button */}
      <button
        onClick={onClick}
        className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110 cursor-pointer ${
          isActive ? 'scale-110' : ''
        }`}
        style={{
          background: isActive 
            ? `linear-gradient(135deg, ${COLORS.doradoMetalico}20 0%, #0a0a0f 100%)`
            : 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0f 100%)',
          border: `2px solid ${isActive ? COLORS.doradoMetalico : COLORS.plateado}`,
          boxShadow: isActive 
            ? `0 0 30px rgba(201,166,70,0.4), inset 0 0 20px rgba(201,166,70,0.1)`
            : `0 0 15px rgba(0,0,0,0.5), inset 0 0 10px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Icon */}
        <span className="text-2xl md:text-3xl mb-1">{icon}</span>
        
        {/* Label */}
        <span 
          className={`text-[10px] md:text-xs font-medium uppercase tracking-wider ${
            isActive ? '' : 'text-[#888]'
          }`}
          style={{ color: isActive ? COLORS.doradoMetalico : undefined }}
        >
          {label}
        </span>
        
        {/* Hover glow */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${COLORS.doradoMetalico}30 0%, transparent 70%)`
          }}
        />
      </button>
      
      {/* Pulse animation for active */}
      {isActive && (
        <div 
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: COLORS.doradoMetalico,
            opacity: 0.2
          }}
        />
      )}
    </div>
  );
};

export default RadarNode;
