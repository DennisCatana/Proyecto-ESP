import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import About from '../components/home/About'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col font-segoe">
      <Header />
      <main className="grow">
        <Hero />
        <div id="nosotros">
        <About/>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
