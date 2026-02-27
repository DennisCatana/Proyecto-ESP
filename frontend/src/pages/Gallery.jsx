import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SectionTitle from '../components/ui/SectionTitle';
import Carousel from '../components/ui/gallery/Carousel';

const Gallery = () => {
  return (
    <div className="min-h-screen flex flex-col font-segoe">
      <Header />
      <main className="grow py-16 px-5" style={{ backgroundColor: '#e8f4ff' }}>
        <div className="max-w-300 mx-auto">
          <SectionTitle 
            title="Galería" 
            subtitle="Momentos destacados de nuestra formación" 
          />
          
          <div className="mt-10">
            <Carousel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
