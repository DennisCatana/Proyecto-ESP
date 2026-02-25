import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SectionTitle from '../../components/ui/SectionTitle';
import ValueCard from '../../components/ui/values/ValueCard';

const Values = () => {
const values = [
    { icon: '../images/iconos/valor.png', title: 'Valor', description: 'Actuamos con firmeza y convicción.' },
    { icon: '../images/iconos/disciplina.png', title: 'Disciplina', description: 'Mantenemos el orden y la estructura de la formación policial.' },
    { icon: '../images/iconos/lealtad.png', title: 'Lealtad', description: 'Somos fieles a la institución, a nuestros compañeros y a la patria.' },
    { icon: '../images/iconos/patriotismo.png', title: 'Patriotismo', description: 'Servimos con lealtad y compromiso a la nación.' },
    { icon: '../images/iconos/honor.png', title: 'Honor', description: 'Actuamos con integridad, ética y moral en todo momento.' },
    { icon: '../images/iconos/honestidad.png', title: 'Honestidad', description: 'Actuamos con transparencia y rectitud.' },
    { icon: '../images/iconos/vocacion.png', title: 'Vocación de Servicio', description: 'Servimos a la comunidad con dedicación, respeto y empatía.' },
  ];

  const principles = [
    { icon: '../images/iconos/legalidad.png', title: 'Legalidad', description: 'Actuamos en estricto apego a la ley.' },
    { icon: '../images/iconos/sociedad.png', title: 'Sociedad y policía', description: 'Servimos con cercanía y compromiso a la ciudadanía.' },
    { icon: '../images/iconos/igualdad.png', title: 'Igualdad', description: 'Actuamos con imparcialidad y respeto, garantizando un trato justo y equitativo.' },
    { icon: '../images/iconos/transparencia.png', title: 'Transparencia', description: 'Actuamos con claridad y responsabilidad.' },
    { icon: '../images/iconos/innovacion.png', title: 'Innovación y Desarrollo', description: 'Promovemos la mejora continua mediante el aprendizaje y uso eficiente de la tecnología.' },
    { icon: '../images/iconos/neutralidad.png', title: 'Neutralidad', description: 'Actuamos con objetividad e imparcialidad, sin influencias externas.' },
    { icon: '../images/iconos/cohesion.png', title: 'Cohesión', description: 'Fortalecemos la unidad y el trabajo en equipo, consolidando un grupo sólido.' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-segoe">
      <Header />
      <main className="grow py-16 px-5" style={{ backgroundColor: '#e8f4ff' }}>
        <div className="max-w-300 mx-auto">
          {/* Ethics Section */}
          <SectionTitle title="Ética Institucional" subtitle="Valores y Principios que rigen nuestra formación" />
          
          {/* Values */}
          <SectionTitle h3="Valores" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
          
          {/* Principles */}
          <SectionTitle h3="Principios" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {principles.map((principle, index) => (
              <ValueCard key={index} {...principle} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Values;
