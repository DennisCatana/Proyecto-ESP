const ValueCard = ({ icon, title, description }) => {
  return (
    <div 
      className="bg-white p-4 rounded-[30px] text-center border-l-4 border-[#007BFF] shadow-md hover:-translate-y-3 transition-transform duration-300"
      style={{ borderLeftColor: '#007BFF' }}
    >
      <div className="text-5xl mb-3">
        <img src={icon} alt={title} width={75} height={75} className="mx-auto" />
      </div>
      <h4 className="text-[#007BFF] font-bold mb-2 text-sm">{title}</h4>
      <p className="text-black text-xs">{description}</p>
    </div>
  );
};

export default ValueCard;
