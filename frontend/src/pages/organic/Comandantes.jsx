import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SectionTitle from '../../components/ui/SectionTitle';
import InstructorCard from '../../components/ui/instructors/InstructorCard';

const Comandantes = () => {
    const comandantes = [
        {
            image: '/images/photos/01.png',
            name: 'kdt. Martínez Gallegos Juan José',
            phrase: 'Comandante de la sección "A" ',
        },
        {
            image: '/images/photos/02.png',
            name: 'kdt Dávila Durán Oscar Emilio',
            phrase: 'Comandante de la sección "B" ',
        },
        {
            image: '/images/photos/03.png',
            name: 'kdt. Moreira Macías Edison Yasser',
            phrase: 'Comandante de la sección "C" ',
        },
        {
            image: '/images/photos/01.png',
            name: 'kdt. Pinzón Torres Martín Alfonso',
            phrase: 'Comandante de la sección "D" ',
        },
        {
            image: '/images/photos/01.png',
            name: 'kdt. Bosque Bosque Jhordan Matias ',
            phrase: 'Comandante de la sección "E" ',
        },
        {
            image: '/images/photos/06.png',
            name: 'kdt. Ucles Martinez Edward Maximiliano',
            phrase: 'Comandante de la sección "F" ',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col font-segoe">
            <Header />
            <main className="grow py-16 px-5">
                <div className="max-w-300 mx-auto">
                    <SectionTitle
                        title="Cuadro de Comandantes"
                        subtitle="Profesionales altamente capacitados para su formación"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {comandantes.map((comandante, index) => (
                            <InstructorCard key={index} {...comandante} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Comandantes;
