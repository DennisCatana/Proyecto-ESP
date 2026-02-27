import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SectionTitle from '../components/ui/SectionTitle';
import InstructorCard from '../components/ui/instructors/InstructorCard';

const Instructors = () => {
  const instructors = [
    {
      image: 'images/photos/Cptn.Solano.jpeg',
      name: 'Cptn. Solano Coloma Carlos Andrés',
      phrase: 'Ser eternos, Ser infinitos.'
    },
    {
      image: 'images/photos/Cptn.Herrera.jpeg',
      name: 'Cptn. Herrera Flores Raúl Efren',
      phrase: 'Para un corazón encendido por la llama de la voluntad humana, no hay miedo o reto más grande que él, este lo convierte en soberano de su destino, creador de lo impensable, dueño de su alma.'
    },
    {
      image: 'images/photos/Cptn.Vinueza.jpeg',
      name: 'Cptn. Vinueza Sánchez Daniel Rolando',
      phrase: 'La verdadera fuerza de voluntad, se forja como el acero en el fuego, dominando nuestros miedos y superando las dificultades.'
    },
    // Additional instructors without photos - using placeholder
    {
      image: 'images/image1.jpeg',
      name: 'Tnte. Estrella Viscarra Yessenia Poema',
      phrase: 'Frase.'
    },
    {
      image: 'images/image2.jpeg',
      name: 'Tnte. Escobar Cevallos Yajaira Marcela',
      phrase: 'Frase'
    },
    {
      image: 'images/photos/Tnte.Sarango.jpeg',
      name: 'Tnte. Sarango Cuenca Joel Steveen',
      phrase: 'Persistir, insistir y nunca desistir hasta alcanzar el objetivo.'
    },
    {
      image: 'images/photos/Tnte.Cedeño.jpeg',
      name: 'Tnte. Cedeño Aguilar Jonathan Israel',
      phrase: 'El dolor es pasajero, la gloria es eterna.'
    },
    {
      image: 'images/image4.jpg',
      name: 'Tnte. Martinez Martinez Erick Santiago',
      phrase: 'Frase'
    },
    {
      image: 'images/photos/Tnte.Luna.jpeg',
      name: 'Tnte. Luna Solano Fernando Agustin',
      phrase: 'Frase'
    },
    {
      image: 'images/image6.jpeg',
      name: 'Tnte. Mendoza Carrillo Jenifer Nicol',
      phrase: 'Frase'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-segoe">
      <Header />
      <main className="grow py-16 px-5">
        <div className="max-w-300 mx-auto">
          <SectionTitle
            title="Cuadro de Instructores"
            subtitle="Profesionales altamente capacitados para su formación"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {instructors.map((instructor, index) => (
              <InstructorCard key={index} {...instructor} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Instructors;
