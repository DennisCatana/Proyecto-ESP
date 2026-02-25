import { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SectionTitle from '../../components/ui/SectionTitle';

const Regulations = () => {

  const openPDF = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col font-segoe">
      <Header />
      <main className="grow py-16 px-5" style={{ backgroundColor: '#e8f4ff' }}>
        <div className="max-w-200 mx-auto">
          <SectionTitle 
            title="Reglamentos" 
            subtitle="Normas y regulaciones institucionales" 
          />
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-10">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}>
                  <th className="text-left text-white p-5 font-bold uppercase">Documento</th>
                  <th className="text-left text-white p-5 font-bold uppercase">Acción</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Reglamento de Disciplina', pdf: '/documents/reg-disci.pdf' },
                  { name: 'Reglamento de Instrucción Policial', pdf: '/documents/reg-ins.pdf' },
                  { name: 'Reglamento de Formación Policial y Académico', pdf: '/documents/reg-form.pdf' },
                  { name: 'Reglamento de Uniformes', pdf: '/documents/reg-uni.pdf' },
                  { name: 'Reglamento de Acondicionamiento Físico', pdf: '/documents/reg-acon.pdf' },
                  { name: 'Manual de Doctrina Policial', pdf: '/documents/manu-doctri.pdf' },
                  { name: 'Código de Ética Policial', pdf: '/documents/cod-poli.pdf' },
                  { name: 'Himnario', pdf: '/documents/himn.pdf' },
                ].map((reg, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-gray-200 hover:bg-[#f0f8ff] transition-colors"
                  >
                    <td className="p-5 text-[#007BFF] font-bold">{reg.name}</td>
                    <td className="p-5">
                      <button 
                        onClick={() => openPDF(reg.pdf)}
                        className="inline-block px-5 py-2 bg-white text-black no-underline rounded-md border border-gray-300 hover:bg-gray-100 transition-all"
                      >
                        Abrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </main>
      <Footer />
    </div>
  );
};

export default Regulations;
