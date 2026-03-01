import { useState } from "react";

const InstructorCard = ({ image, name, phrase }) => {
  const [touching, setTouching] = useState(false);

  return (
    <div
      className="relative w-64 h-80 overflow-hidden rounded-lg shadow-lg group"
      onTouchStart={() => setTouching(true)}
      onTouchEnd={() => setTouching(false)}
    >
      {/* Imagen */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Título */}
      <div
        className={`
          absolute top-0 left-0 right-0 
          bg-linear-to-b from-[#007BFF] to-transparent 
          text-white p-3 text-center 
          transition-transform duration-300
          ${touching ? "translate-y-0" : "-translate-y-full"}
          group-hover:translate-y-0
        `}
      >
        <p className="font-bold text-lg">{name}</p>
      </div>

      {/* Overlay */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 
          bg-linear-to-t from-[#007BFF] to-transparent 
          text-white p-2 
          transition-transform duration-300
          ${touching ? "translate-y-0" : "translate-y-full"}
          group-hover:translate-y-0
        `}
      >
        <p className="text-1xs text-center">{phrase}</p>
      </div>
    </div>
  );
};

export default InstructorCard;