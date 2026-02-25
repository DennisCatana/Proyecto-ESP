const Footer = () => {
  return (
    <footer className="py-10 px-5 text-white" style={{ background: 'linear-gradient(135deg, #333333, #000000)' }}>
      <div className="max-w-300 mx-auto text-center">
        {/* Logo Text */}
        <div className="text-xl font-bold mb-5 text-[#C0C0C0]">
          ESCUELA SUPERIOR DE POLICÍA "GRAL. ALBERTO ENRÍQUEZ GALLO"
        </div>
        
        <p className="mb-5">Formando líderes con valor, disciplina y lealtad</p>
        
        {/* Institutional Phrase */}
        <div 
          className="text-3xl font-bold my-8 py-5"
          style={{
            background: 'linear-gradient(135deg, #007BFF, #C0C0C0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          "POR LA RAZÓN O POR LA FUERZA"
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-[#555] pt-5 mt-5 text-sm text-[#C0C0C0]">
          <p>© 2024 Escuela Superior de Policía "Gral. Alberto Enríquez Gallo" - Todos los derechos reservados</p>
          <p className="mt-2">Pusuqui, Quito, Pichincha</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
