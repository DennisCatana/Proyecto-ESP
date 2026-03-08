import React, { useMemo } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SectionTitle from '../../components/ui/SectionTitle';
import ValueCard from '../../components/ui/values/ValueCard';

// Importar iconos
import valorIcon from '../../assets/images/iconos/valor.png';
import disciplinaIcon from '../../assets/images/iconos/disciplina.png';
import lealtadIcon from '../../assets/images/iconos/lealtad.png';
import patriotismoIcon from '../../assets/images/iconos/patriotismo.png';
import honorIcon from '../../assets/images/iconos/honor.png';
import honestidadIcon from '../../assets/images/iconos/honestidad.png';
import vocacionIcon from '../../assets/images/iconos/vocacion.png';
import legalidadIcon from '../../assets/images/iconos/legalidad.png';
import sociedadIcon from '../../assets/images/iconos/sociedad.png';
import igualdadIcon from '../../assets/images/iconos/igualdad.png';
import transparenciaIcon from '../../assets/images/iconos/transparencia.png';
import innovacionIcon from '../../assets/images/iconos/innovacion.png';
import neutralidadIcon from '../../assets/images/iconos/neutralidad.png';
import cohesionIcon from '../../assets/images/iconos/cohesion.png';

const Values = () => {
  // Optimización: usar useMemo para evitar recrear los arrays en cada render
  const values = useMemo(() => [
    { icon: valorIcon, title: 'Valor', description: 'Actuamos con firmeza y convicción.' },
    { icon: disciplinaIcon, title: 'Disciplina', description: 'Mantenemos el orden y la estructura de la formación policial.' },
    { icon: lealtadIcon, title: 'Lealtad', description: 'Somos fieles a la institución, a nuestros compañeros y a la patria.' },
    { icon: patriotismoIcon, title: 'Patriotismo', description: 'Servimos con lealtad y compromiso a la nación.' },
    { icon: honorIcon, title: 'Honor', description: 'Actuamos con integridad, ética y moral en todo momento.' },
    { icon: honestidadIcon, title: 'Honestidad', description: 'Actuamos con transparencia y rectitud.' },
    { icon: vocacionIcon, title: 'Vocación de Servicio', description: 'Servimos a la comunidad con dedicación, respeto y empatía.' },
  ], []);

  const principles = useMemo(() => [
    { icon: legalidadIcon, title: 'Legalidad', description: 'Actuamos en estricto apego a la ley.' },
    { icon: sociedadIcon, title: 'Sociedad y policía', description: 'Servimos con cercanía y compromiso a la ciudadanía.' },
    { icon: igualdadIcon, title: 'Igualdad', description: 'Actuamos con imparcialidad y respeto, garantizando un trato justo y equitativo.' },
    { icon: transparenciaIcon, title: 'Transparencia', description: 'Actuamos con claridad y responsabilidad.' },
    { icon: innovacionIcon, title: 'Innovación y Desarrollo', description: 'Promovemos la mejora continua mediante el aprendizaje y uso eficiente de la tecnología.' },
    { icon: neutralidadIcon, title: 'Neutralidad', description: 'Actuamos con objetividad e imparcialidad, sin influencias externas.' },
    { icon: cohesionIcon, title: 'Cohesión', description: 'Fortalecemos la unidad y el trabajo en equipo, consolidando un grupo sólido.' },
  ], []);

  const ideals = useMemo(() => [
    { icon: legalidadIcon, title: 'Ideal 1', description: 'El policía de corazón, hace únicamente lo que dice la norma.' },
    { icon: sociedadIcon, title: 'Ideal 2', description: 'El policía de corazón, conoce y respeta los símbolos patrios e institucionales.' },
    { icon: igualdadIcon, title: 'Ideal 3', description: 'El policía de corazón, valora el grado, se subordina al superior jerárquico y lidera al subalterno.' },
    { icon: transparenciaIcon, title: 'Ideal 4', description: 'El policía de corazón, dignifica su uniforme, portándolo correctamente.' },
    { icon: innovacionIcon, title: 'Ideal 5', description: 'El policía de corazón, es formal, no de moda o tendencia.' },
    { icon: neutralidadIcon, title: 'Ideal 6', description: 'El policía de corazón, ejecuta el servicio con legitimidad, actuando con pasión, pero sin apasionamiento.' },
    { icon: cohesionIcon, title: 'Ideal 7', description: 'El policía de corazón, posee integridad, porque piensa lo que debe, dice lo que piensa y hace lo que dice.' },
  ], []);

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

          {/* Ideales */}
          <SectionTitle h3="Ideales" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ideals.map((ideals, index) => (
              <ValueCard key={index} {...ideals} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Values;
