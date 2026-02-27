const ContentPanel = ({ children, title, subtitle }) => {
  return (
    <div className="flex-1 p-4 md:p-8 bg-[#e8f4ff] min-h-screen ml-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0056b3] relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-[#007BFF]"></span>
          </h1>
          {subtitle && (
            <p className="text-gray-600 mt-3 text-lg">{subtitle}</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 border-t-4 border-[#007BFF]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContentPanel;
