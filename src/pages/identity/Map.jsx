import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SectionTitle from '../../components/ui/SectionTitle';
import InteractiveMap from '../../components/map/InteractiveMap';

const Map = () => {
    return (
        <div className="min-h-screen flex flex-col font-segoe">
            <Header />

            <div className="grow py-16 px-5">
                <div className="max-w-300 mx-auto">
                    <SectionTitle 
                        title="Mapa Interactivo" 
                        subtitle="Explora las instalaciones de la Escuela Superior de Policía"
                    />
                </div>
            </div>

            <div className=" p-6">
                <div className="max-w-7xl mx-auto">
                    <InteractiveMap />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Map;
