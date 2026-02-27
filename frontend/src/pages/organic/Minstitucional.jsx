import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SectionTitle from '../../components/ui/SectionTitle';
import InstructorCard from '../../components/ui/instructors/InstructorCard';

const Minstitucional = () => {
    const Minstitucional = [
        {
            image: '/images/photos/Maldonado.jpg',
            name: 'GraS. Pablo Vinicio Dávila Maldonado',
            phrase: 'COMANDANTE GENERAL',
        },
        {
            image: '/images/photos/Iniguez.jpeg',
            name: 'GraD. Fausto Patricio Íñiguez Sotomayor',
            phrase: 'SUBCOMANDANTE GENERAL',
        },
        {
            image: '/images/photos/Herrera.jpeg',
            name: 'GraD. Victor Santiago Herrera Leiva',
            phrase: 'INSPECTOR GENERAL',
        },
        {
            image: '/images/photos/Tapia.jpeg',
            name: 'GraD. Henry Román Tapia Lafuente',
            phrase: 'DIRECTOR GENERAL DE SEGURIDAD CIUDADANA Y ORDEN PÚBLICO',
        },
        {
            image: '/images/photos/VillaroelW.jpeg',
            name: 'GraD. Willian Roberth Villarroel Trujillo',
            phrase: 'DIRECTOR GENERAL DE INVESTIGACIÓN',
        },
        {
            image: '/images/photos/Cevallos.jpeg',
            name: 'GraD. Jorge Renato Cevallos Núñez',
            phrase: 'DIRECTOR NACIONAL DE EDUCACIÓN',
        },
                {
            image: '/images/photos/Barreiros.jpeg',
            name: 'GraD. Cristian Germán Barreiros Tumipamba',
            phrase: 'COORDINADOR ADMINISTRATIVO FINANCIERO',
        },
        {
            image: '/images/photos/VillaroelF.jpeg',
            name: 'GraD. Walter Fernando Villarroel Trujillo',
            phrase: 'COMANDANTE DE POLICÍA ZONA 8-DMG',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col font-segoe">
            <Header />
            <main className="grow py-16 px-5">
                <div className="max-w-300 mx-auto">
                    <SectionTitle
                        title="Mando Institucional"
                        subtitle="Cupula o columna vertebral de la Policía Nacional del Ecuador"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Minstitucional.map((Minstitucional, index) => (
                            <InstructorCard key={index} {...Minstitucional} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Minstitucional;
