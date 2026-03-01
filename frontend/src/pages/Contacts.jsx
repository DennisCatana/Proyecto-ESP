import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SectionTitle from '../components/ui/SectionTitle';
import ContactCard from '../components/ui/contacts/ContactCard';

import {
  FiCoffee,
  FiShoppingBag,
  FiScissors,
  FiHeart,
  FiPrinter,
  FiWifi,
  FiHome
} from "react-icons/fi";

const Contacts = () => {

  const contacts = [
    {
      icon: FiCoffee,
      title: 'Bar',
      description: 'Venta de alimentos y espacio de recreación.',
      phone: '099 290 0904',
      link: 'https://wa.me/593992900904',
      color: 'bg-linear-to-br from-[#007BFF] to-[#0056b3] text-white p-5 rounded-lg text-center shadow-md'
    },
    {
      icon: FiShoppingBag,
      title: 'Bazar',
      description: 'Venta de productos variados.',
      phone: '098 699 4635',
      link: 'https://wa.me/593986994635',
      color: 'bg-linear-to-br from-[#007BFF] to-[#0056b3] text-white p-5 rounded-lg text-center shadow-md'
    },
    {
      icon: FiHome,
      title: 'Lavandería',
      description: 'Servicio de lavado y cuidado de ropa.',
      phone: '099 350 8696',
      link: 'https://wa.me/593993508696',
      color: 'bg-linear-to-br from-[#007BFF] to-[#0056b3] text-white p-5 rounded-lg text-center shadow-md'
    },
    {
      icon: FiScissors,
      title: 'Peluquería',
      description: 'Servicios de corte de cabello.',
      phone: '098 834 2258',
      link: 'https://wa.me/593988342258',
      color: 'bg-linear-to-br from-[#007BFF] to-[#0056b3] text-white p-5 rounded-lg text-center shadow-md'
    },
    {
      icon: FiHeart,
      title: 'Ecuasanitas',
      description: 'Servicios de salud y medicina prepagada.',
      phone: '099 814 2221',
      link: 'https://wa.me/593998142221',
      color: 'bg-linear-to-br from-[#007BFF] to-[#0056b3] text-white p-5 rounded-lg text-center shadow-md'
    },
    {
      icon: FiPrinter,
      title: 'Gigantografías',
      description: 'Impresión en gran formato.',
      phone: '098 775 2262',
      link: 'https://wa.me/593987752262',
      color: 'bg-linear-to-br from-[#007BFF] to-[#0056b3] text-white p-5 rounded-lg text-center shadow-md'
    },
    {
      icon: FiWifi,
      title: 'Internet',
      description: 'Proveedor de conectividad.',
      phone: '096 971 9199',
      link: 'https://wa.me/593969719199',
      color: 'bg-linear-to-br from-[#007BFF] to-[#0056b3] text-white p-5 rounded-lg text-center shadow-md'
    },
    {
      icon: FiHome,
      title: 'Comedor',
      description: 'Servicio de alimentación diaria.',
      phone: '0999999999',
      link: 'tel:0999999999',
      color: 'bg-linear-to-br from-[#007BFF] to-[#0056b3] text-white p-5 rounded-lg text-center shadow-md'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-segoe">
      <Header />

      <main className="grow py-16 px-5 bg-gray-100">
        <div className="max-w-7xl mx-auto">

          <SectionTitle
            title="Servicios"
            subtitle="Comuníquese con nuestros servicios internos"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
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