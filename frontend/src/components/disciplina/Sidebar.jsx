import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, ClipboardPlus, History, BarChart3,
  Shield, Home
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cadetes', label: 'Cadetes', icon: Users },
    { id: 'registrar', label: 'Registrar Acción', icon: ClipboardPlus },
    { id: 'historial', label: 'Historial', icon: History },
    { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen flex flex-col shadow-xl">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-400" />
          Control Disciplinario
        </h2>
        <p className="text-xs text-slate-400 mt-1">Primer Año - ESP</p>
      </div>
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700 space-y-2">
        <button
          onClick={() => navigate('/home')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Regresar al Inicio</span>
        </button>
        <div className="text-xs text-slate-400 text-center">
          Sistema Disciplinario v1.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

