import { useState, useEffect } from 'react';
import Sidebar from '../components/library/Sidebar';
import ContentPanel from '../components/library/ContentPanel';
import RegulationCard from '../components/library/RegulationCard';
import FormatItem from '../components/library/FormatItem';
import ScheduleItem from '../components/library/ScheduleItem';
import ArticleCard from '../components/library/ArticleCard';
import Himnario from '../components/library/Himnario';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Biblioteca = () => {
  const [activeSection, setActiveSection] = useState('normativa');

  // Scroll to top when activeSection changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  // Data for regulations (Normativa) - Documentos existentes
  const regulations = [
    { 
      title: 'Reglamento de Disciplina', 
      category: 'Disciplina', 
      description: 'Normas disciplinarias aplicables al personal policial en formación',
      pdfUrl: '/documents/Reglamentos/reg-disci.pdf' 
    },
    { 
      title: 'Reglamento de Instructional Policial', 
      category: 'Instruction', 
      description: 'Lineamientos para la instruction tecnica y tactica policial',
      pdfUrl: '/documents/Reglamentos/reg-ins.pdf' 
    },
    { 
      title: 'Reglamento de Formacion Policial y Academico', 
      category: 'Formacion', 
      description: 'Normas academicas para la formacion integral del cadete',
      pdfUrl: '/documents/Reglamentos/reg-form.pdf' 
    },
    { 
      title: 'Reglamento de Sables', 
      category: 'Simbolos', 
      description: 'Reglamento sobre el uso y protocolo de sables institucionales',
      pdfUrl: '/documents/Reglamentos/reg-sables.pdf' 
    },
    { 
      title: 'Reglamento de Uniformes', 
      category: 'Uniformes', 
      description: 'Especificaciones de uniformes y equipamiento policial',
      pdfUrl: '/documents/Reglamentos/reg-uni.pdf' 
    },
    { 
      title: 'Reglamento de Acondicionamiento Fisico', 
      category: 'Fisico', 
      description: 'Requisitos y pruebas de condicion fisica policial',
      pdfUrl: '/documents/Reglamentos/reg-acon.pdf' 
    },
    { 
      title: 'Codigo de Etica Policial', 
      category: 'Etica', 
      description: 'Codigo de conducta y etica del personal policial',
      pdfUrl: '/documents/Reglamentos/cod-poli.pdf' 
    },
    { 
      title: 'Manual de Doctrina Policial', 
      category: 'Doctrina', 
      description: 'Documento doctrinal de la funcion policial',
      pdfUrl: '/documents/Reglamentos/manu-doctri.pdf' 
    },
  ];

  // Data for schedules (Horarios) - Documentos existentes
  const schedules = [
    { 
      title: 'Pon de Actividades Primera CIA', 
      category: 'Actividades', 
      description: 'Cronograma de actividades de la Primera Compania',
      pdfUrl: '/documents/Horarios/Pon_Primero.pdf',
      type: 'PDF'
    },
    { 
      title: 'Horario de Eje Policial', 
      category: 'Eje Policial', 
      description: 'Horario de actividades del eje de formacion policial',
      pdfUrl: '#',
      type: 'PDF'
    },
    { 
      title: 'Horario de Eje Academico', 
      category: 'Eje Academico', 
      description: 'Horario de clases y actividades academicas',
      pdfUrl: '#',
      type: 'PDF'
    },
    { 
      title: 'Horario de Deportes', 
      category: 'Deportes', 
      description: 'Horario de actividades deportivas y fisicas',
      pdfUrl: '#',
      type: 'PDF'
    },
    { 
      title: 'Cronograma de Actividades de la UCE 2026', 
      category: 'UCE', 
      description: 'Cronograma general de actividades de la Unidad de Comando Estrategico',
      pdfUrl: '#',
      type: 'PDF'
    },
  ];

  // Data for formats (Formatos) - Documentos existentes
  const formats = [
    { name: 'Formato de Informe', type: 'PDF', size: 'Por definir', downloadUrl: '/documents/Formatos/Formato_informe.pdf' },
    { name: 'Formato de Oficio', type: 'PDF', size: 'Por definir', downloadUrl: '/documents/Formatos/Formato_oficio.pdf' },
    { name: 'Formato de Anteproyecto', type: 'DOCX', size: 'Por definir', downloadUrl: '#' },
  ];

  // Data for articles (Articulos)
  const articles = [
    {
      title: 'La Importancia de la Etica en la Formacion Policial',
      description: 'Articulo sobre los fundamentos eticos que rigen la formacion de los futuros oficiales de policia y su importancia en el servicio a la comunidad.',
      author: 'María José Bernal Ballesteros',
      date: '05 Diciembre 2017',
      readMoreUrl: 'https://www.redalyc.org/journal/2932/293261227011/html/#:~:text=Las%20herramientas%20legales%20con%20las,gran%20parte%20de%20Am%C3%A9rica%20Latina.',
    },
    {
      title: 'Nuevas Tecnicas de Defensa Personal Policial',
      description: 'Analisis de las tecnicas modernas de defensa personal adaptadas al contexto actual de la funcion policial.',
      author: 'Tte. Maria Garcia',
      date: '10 de Enero, 2024',
      readMoreUrl: '#',
    },
    {
      title: 'El Rol del Policia en la Sociedad Contemporanea',
      description: 'Reflexion sobre la evolucion del rol policial y los nuevos desafios que enfrenta la institucion en el siglo XXI.',
      author: 'Lic. Pedro Morales',
      date: '05 de Enero, 2024',
      readMoreUrl: '#',
    },
    {
      title: 'Protocolos de Intervencion en Emergencias',
      description: 'Manual de procedimientos para la atencion de diferentes tipos de emergencias y situaciones de crisis.',
      author: 'Sgt. Juan Lopez',
      date: '28 de Diciembre, 2023',
      readMoreUrl: '#',
    },
  ];

  // Render functions for each section
  const renderNormativa = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {regulations.map((reg, index) => (
        <RegulationCard
          key={index}
          title={reg.title}
          category={reg.category}
          description={reg.description}
          pdfUrl={reg.pdfUrl}
        />
      ))}
    </div>
  );

  const renderHorarios = () => (
    <div className="space-y-4">
      {schedules.map((schedule, index) => (
        <ScheduleItem
          key={index}
          title={schedule.title}
          category={schedule.category}
          description={schedule.description}
          type={schedule.type}
          pdfUrl={schedule.pdfUrl}
        />
      ))}
    </div>
  );

  const renderFormatos = () => (
    <div className="space-y-4">
      {formats.map((format, index) => (
        <FormatItem
          key={index}
          name={format.name}
          type={format.type}
          size={format.size}
          downloadUrl={format.downloadUrl}
        />
      ))}
    </div>
  );

  const renderArticulos = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          title={article.title}
          description={article.description}
          author={article.author}
          date={article.date}
          readMoreUrl={article.readMoreUrl}
        />
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'normativa':
        return renderNormativa();
      case 'horarios':
        return renderHorarios();
      case 'formatos':
        return renderFormatos();
      case 'articulos':
        return renderArticulos();
      case 'himnario':
        return <Himnario />;
      default:
        return null;
    }
  };

  const getSectionInfo = () => {
    switch (activeSection) {
      case 'normativa':
        return { title: 'Normativa', subtitle: 'Reglamentos y documentos oficiales de la institución' };
      case 'horarios':
        return { title: 'Horarios', subtitle: 'Documentos de horarios y cronograma de actividades' };
      case 'formatos':
        return { title: 'Formatos', subtitle: 'Plantillas y formatos descargables' };
      case 'articulos':
        return { title: 'Articulos', subtitle: 'Publicaciones y artículos de interés institucional' };
      case 'himnario':
        return { title: 'Himnario', subtitle: 'Colección de himnos institucionales' };
      default:
        return { title: 'Biblioteca', subtitle: '' };
    }
  };

  const sectionInfo = getSectionInfo();

  return (
    <div className="min-h-screen flex flex-col font-segoe bg-[#e8f4ff]">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <ContentPanel title={sectionInfo.title} subtitle={sectionInfo.subtitle}>
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </ContentPanel>
      </div>
      <Footer />
    </div>
  );
};

export default Biblioteca;
