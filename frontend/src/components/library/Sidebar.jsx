import { BookOpen, Clock, FileText, Newspaper, Music } from 'lucide-react';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'normativa', label: 'Normativa', icon: BookOpen },
    { id: 'horarios', label: 'Horarios', icon: Clock },
    { id: 'formatos', label: 'Formatos', icon: FileText },
    { id: 'articulos', label: 'Artículos', icon: Newspaper },
    { id: 'himnario', label: 'Himnario', icon: Music },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-[#0056b3] to-[#003d80] sticky top-16 h-fit flex-shrink-0">
      <div className="p-6">
        <h2 className="text-white text-xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-white" />
          Biblioteca
        </h2>
        <p className="text-[#C0C0C0] text-sm">Sistema de Consulta</p>
      </div>
      
      <nav className="mt-4 pb-43 ">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-all duration-300 ${
                isActive
                  ? 'bg-[#007BFF] text-white font-semibold border-l-4 border-white'
                  : 'text-white hover:bg-white/10 border-l-4 border-transparent'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/20">
        <p className="text-[#C0C0C0] text-xs text-center">
          Escuela Superior de Policía
        </p>
        <p className="text-[#C0C0C0] text-xs text-center mt-1">
          "Gral. Alberto Enríquez Gallo"
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
