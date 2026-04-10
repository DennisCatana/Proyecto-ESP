import { Link } from 'react-scroll';

const Hero = () => {
return (
  <section
    className="container mx-auto px-4 w-auto h-150 flex items-center justify-center text-center text-white"
    style={{
      background: 'linear-gradient(rgba(0, 123, 255, 0.300), rgba(0, 87, 179, 0.385)), url(images/main_image.jpeg) center/cover',
    }}>
      
    <div className="hero-content">
      <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">PRIMERA COMPAÑÍA</h2>
      <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">Promoción LXXXIX</h2>
      <p className="text-xl mb-8">Tnte. Víctor Humberto Moya Galarraga</p>

      <Link 
        to="nosotros"
        smooth={true}
        duration={500}
        offset={-125}
        className="inline-block px-10 py-4 bg-white text-[#007BFF] no-underline font-bold rounded-full transition-all duration-300 hover:bg-[#C0C0C0] hover:-translate-y-0.75 hover:shadow-lg"
      >
        Conoce más
      </Link>
    </div>
  </section>
  );
};

export default Hero;
