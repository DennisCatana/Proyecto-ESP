import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SectionTitle from '../components/ui/SectionTitle';
import ContactCard from '../components/ui/contacts/ContactCard';

const Contacts = () => {
  const contacts = [
    { icon: '🕐', title: 'Bar', description: 'Venta de alimentos y espacio de recreación.', phone: '09********' },
    { icon: '🕐', title: 'Bazar', description: 'Venta de productos variados de uso diario.', phone: '09********' },
    { icon: '🕐', title: 'Lavanderia', description: 'Servicio de lavado y cuidado de ropa', phone: '09********' },
    { icon: '🕐', title: 'Peluqueria', description: 'Servicios de corte de cabello', phone: '09********' },
    { icon: '🕐', title: 'Ecuasanitas', description: 'Servicios de salud y medicina prepagada.', phone: '09********' },
    { icon: '🕐', title: 'Gigantografías', description: 'Servicio de impresión en gran formato.', phone: '09********' },
    { icon: '🕐', title: 'Internet', description: 'Proveedor de servicios de conectividad que ofrece acceso a internet', phone: '09********' },
    { icon: '🕐', title: 'Comedor', description: 'Servicio de alimentación diaria.', phone: '09********' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-segoe">
      <Header />
      <main className="grow py-16 px-5">
        <div className="max-w-300 mx-auto">
          <SectionTitle 
            title="Contactos" 
            subtitle="Comuníquese con nosotros" 
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {contacts.map((contact, index) => (
              <ContactCard key={index} {...contact} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;
