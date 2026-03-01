import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SectionTitle from '../../components/ui/SectionTitle';
import InstructorCard from '../../components/ui/instructors/InstructorCard';

const Brigs = () => {
    const brigs = [
        {
            image: '/images/photos/Cptn.Solano.jpeg',
            name: 'Brig Mayor. Vaca Herrera Karla Anahi'
        },
        {
            image: '/images/photos/Cptn.Herrera.jpeg',
            name: 'Brig. Nazate Jami Ammy Katherin',
        },
        {
            image: '/images/photos/brig.Peralta.jpg',
            name: 'Brig. Peralta Cabrera William Steven',
        },
        {
            image: '/images/photos/Cptn.Solano.jpeg',
            name: 'Brig. Flores Tapia Adrian Alejandro',
        },
        {
            image: '/images/photos/brig.SAndoval.jpg',
            name: 'Brig. Sandoval Cunalata Miguel Angel',
        },
        {
            image: '/images/photos/brig.Monteros.png',
            name: 'Brig. Monteros Vinueza Santiago Sebastian',
        },
        {
            image: '/images/photos/brig.Dueñas.png',
            name: 'Brig. Dueñas Fiallos Alejandra Lizeth'
        },
        {
            image: '/images/photos/brig.Rodriguez.png',
            name: 'Brig. Rodriguez  Benavides Xavier Alejandro',
        },
        {
            image: '/images/photos/brig.Abarca.png',
            name: 'Brig. Abarca Robles Joselyn Ariana'
        },
        {
            image: '/images/photos/Cptn.Solano.jpeg',
            name: 'Brig. Quinteros Nuñez Fernando Andres'
        },
        {
            image: '/images/photos/Cptn.Herrera.jpeg',
            name: 'Brig. Tapia Lucas Kevin Enrique',
        },
        {
            image: '/images/photos/Cptn.Solano.jpeg',
            name: 'Brig. Llumitasig Travez Danilo Hernan'
        },
        {
            image: '/images/photos/Cptn.Solano.jpeg',
            name: 'Brig. Correa Unapucha Henry Oswaldo'
        }
    ];

    return (
        <div className="min-h-screen flex flex-col font-segoe">
            <Header />
            <main className="grow py-16 px-5">
                <div className="max-w-300 mx-auto">
                    <SectionTitle
                        title="Cuadro de Brigadieres de la Primera Compañía"
                        subtitle="Cadetes que por su destacada preparacion y esfuerzo lograron un ascenso a Brigadier"
                    />

                    <div className="flex flex-wrap justify-center gap-6
                        grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                        {brigs.map((brig, index) => (
                            <InstructorCard key={index} {...brig} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Brigs;
