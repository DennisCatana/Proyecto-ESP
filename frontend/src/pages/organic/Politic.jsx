import { useRef } from "react";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SectionTitle from '../../components/ui/SectionTitle';
import InstructorCard from '../../components/ui/instructors/InstructorCard';
import Pdf from '../../components/utils/archivo';

const Politicos = () => {

    const contentRef = useRef();

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
                        subtitle="Profesionales altamente capacitados de dirigen al país"
                    />

                    {/* Botón para descargar PDF */}
                    <div ref={contentRef} className="bg-white p-8 rounded-lg">
                        <div className="flex flex-wrap justify-center gap-6">
                            {Politicos.map((politico, index) => (
                                <InstructorCard key={index} {...politico} />
                            ))}
                        </div>
                    </div>
                    
                    <Pdf
                        targetRef={contentRef}
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
