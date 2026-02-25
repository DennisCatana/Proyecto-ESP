const SectionTitle = ({ title, subtitle, h3 }) => {
  return (
    <div className="text-center mb-5">
      {title && (
        <h2 className="text-4xl font-bold text-[#007BFF] mb-2 relative inline-block pb-2">
          {title}
          <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#C0C0C0] block"></span>
        </h2>
      )}
      {subtitle && (
        <p className="text-gray-600 mt-3">{subtitle}</p>
      )}
      {h3 && (
        <h3 className="text-2xl font-bold text-[#007BFF] relative inline-block mt-5">
          {h3}
        </h3>
      )}
    </div>
  );
};

export default SectionTitle;
