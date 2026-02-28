import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SectionTitle from '../../components/ui/SectionTitle';
import InstructorCard from '../../components/ui/instructors/InstructorCard';

const Cupula = () => {
    const Cupula = [
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
            image: '/images/photos/03.png',
            name: 'kdt. Moreira Macías Edison Yasser',
            phrase: 'Comandante de la sección "C" ',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col font-segoe">
            <Header />
            <main className="grow py-16 px-5">
                <div className="max-w-300 mx-auto">
                    <SectionTitle
                        title="Cúpula Institucional de la ESP"
                        subtitle="Profesionales altamente capacitados que dirigen la Escuela"
                    />

                    <div className="flex flex-wrap justify-center gap-6 
                        grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                        {Cupula.map((cupula, index) => (
                            <InstructorCard key={index} {...cupula} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Cupula;
