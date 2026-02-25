import React from 'react';

// Colores institucionales
const COLORS = {
  doradoMetalico: '#C9A646',
  plateado: '#C0C0C0',
};

// This component now serves as a placeholder container for real shield images
// The actual shield images should be placed in public/images/ directory
const ShieldEmblem = ({ size = 200, variant = 'police' }) => {
  const getPlaceholderImage = () => {
    if (variant === 'esp') {
      return '/images/esp_shield.png'; // Placeholder - replace with real image
    }
    return '/images/police_shield.png'; // Placeholder - replace with real image
  };

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ width: size, height: size * 1.2 }}
    >
      {/* Placeholder div - replace with actual image when available */}
      <div 
        className="w-full h-full rounded-lg flex items-center justify-center"
        style={{ 
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0f 100%)',
          border: `2px solid ${COLORS.doradoMetalico}`
        }}
      >
        {/* This text is a placeholder - replace with <img> tag when real images are available */}
        <div className="text-center p-4">
          <div 
            className="text-4xl md:text-6xl mb-2"
            style={{ color: COLORS.doradoMetalico }}
          >
            {variant === 'esp' ? 'ESP' : 'PN'}
          </div>
          <div className="text-xs" style={{ color: COLORS.plateado }}>
            {variant === 'esp' ? 'Escudo ESP' : 'Policía Nacional'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShieldEmblem;
