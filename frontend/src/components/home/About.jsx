import SectionTitle from '../ui/SectionTitle';

const About = () => {
  return (
    <section id="nosotros" className="py-15 px-30 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <SectionTitle 
            title="Sobre la Primera Compañía"
          />

        {/* About Section */}
        <div className="bg-white rounded-xl p-10  shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="about-text">
              <p className="mb-4 text-justify text-gray-700 leading-relaxed">
                La <strong>Primera compañía</strong> ingresó el 04 de mayo del 2025, con alrededor de 210 Aspirantes, quienes han sido formados bajo un régimen académico, físico y disciplinario orientado al fortalecimiento 
                del carácter, la ética profesional y las competencias operativas propias de la función policial.
              </p>
              <p className="mb-4 text-justify text-gray-700 leading-relaxed">
                Su objetivo principal es consolidarse como futuros oficiales de policía íntegros, comprometidos con la seguridad ciudadana, el respeto a los derechos humanos y el servicio eficiente a la comunidad, mediante una formación académica y policial de alto nivel.
              </p>
              <p className="text-justify text-gray-700 leading-relaxed">
                Ubicados en Pusuqui, Quito, Pichincha, nuestro campus ofrece las instalaciones necesarias para el desarrollo integral de nuestros cadetes.
              </p>
            </div>

            {/* Info Boxes */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-linear-to-br from-[#007BFF] to-[#0056b3] text-white p-5 rounded-lg text-center shadow-md">
                <h3 className="text-2xl mb-1">📍</h3>
                <p className="font-semibold">Pusuqui</p>
                <p className="text-sm">Quito, Ecuador</p>
              </div>
              <div className="bg-linear-to-br from-[#007BFF] to-[#0056b3] text-white p-5 rounded-lg text-center shadow-md">
                <h3 className="text-2xl mb-1">🎓</h3>
                <p className="font-semibold">Formación de</p>
                <p className="text-sm">Nivel Directivo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;