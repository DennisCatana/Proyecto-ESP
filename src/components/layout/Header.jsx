import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 shadow-md" style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}>
      <div className="max-w-550 mx-auto px-5 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-5">
          <img 
            src="/src/assets/Logo_ESP.png" 
            alt="Logo ESP" 
            width={100} 
            height={100}
            className="w-24 h-24"
          />
          <div>
            <h1 className="text-white text-xl font-bold uppercase tracking-wide">
              ESCUELA SUPERIOR DE POLICÍA
            </h1>
            <p className="text-white text-sm opacity-90">"GRAL. ALBERTO ENRÍQUEZ GALLO"</p>
          </div>
        </div>

        {/* Navigation */}
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
