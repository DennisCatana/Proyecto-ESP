const InstructorCard = ({ image, name, phrase }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg h-75 group">
      {/* Imagen */}
      <img 
        src={image} 
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Título: se desliza hacia abajo al pasar el mouse sobre él */}
      <div 
        className="absolute top-0 left-0 right-0 bg-linear-to-b from-[#007BFF] to-transparent text-white p-3 text-center transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
      >
        <p className="font-bold text-1xl">{name}</p>
      </div>
      
      {/* Overlay: se desliza hacia arriba al pasar el cursor */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#007BFF] to-transparent text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
      >
        <p className="text-1xs">{phrase}</p>
      </div>
    </div>
  );
};

export default InstructorCard;
