import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SectionTitle from '../components/ui/SectionTitle';
import Table from "../components/rap/Table";

const Rap = () => {

    return (
        <div className="min-h-screen flex flex-col font-segoe">
            <Header />
            <main className="grow py-16 px-5" style={{ backgroundColor: '#e8f4ff' }}>
                <div className="max-w-300 mx-auto">
                    <SectionTitle
                        title="RAP - RAN"
                        subtitle="Registro de acciones positivas y negativas"
                    />

                    <div className="mt-10">
                        <Table />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Rap;