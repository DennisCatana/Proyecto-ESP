import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SectionTitle from '../../components/ui/SectionTitle';
import InstructorCard from '../../components/ui/instructors/InstructorCard';
import GeneratePDFButton from "../../components/pdf/buttonPDF";

const Politicos = () => {

    const Politicos = [
        {
            image: '/images/photos/presi.JPG',
            name: 'Daniel Roy Gilchrist Noboa Azín',
            phrase: 'Presidente de la República del Ecuador',
        },
        {
            image: '/images/photos/vice.jpeg',
            name: 'María José Pinto González-Artigas',
            phrase: 'Vicepresidenta de la República del Ecuador',
        },
        {
            image: '/images/photos/minis.jpeg',
            name: 'John Reimberg Oviedo',
            phrase: 'Ministro del Interior del Ecuador',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col font-segoe">
            <Header />

            <main className="grow py-16 px-5">
                <div className="max-w-6xl mx-auto">

                    <SectionTitle
                        title="Mando Político del Ecuador"
                        subtitle="Profesionales altamente capacitados que dirigen al país"
                    />

                    {/* Cards */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {Politicos.map((politico, index) => (
                            <InstructorCard key={index} {...politico} />
                        ))}
                    </div>

                    {/* Botón PDF reutilizable */}
                    <GeneratePDFButton
                        title="Mando Político"
                        subtitle="República del Ecuador"
                        logo="/images/logo.png" // opcional
                        data={Politicos}
                        layout="grid" // puedes cambiar a "pyramid"
                        fileName="Mando_Politico_Ecuador.pdf"
                        label="Descargar Mando Político"
                    />

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Politicos;