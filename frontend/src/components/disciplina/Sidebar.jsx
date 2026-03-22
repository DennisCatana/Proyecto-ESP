import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, ClipboardPlus, History, BarChart3, Settings,
  Shield, Home, ChevronLeft, ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection, rol }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cadetes', label: 'Cadetes', icon: Users },
    { id: 'registrar', label: 'Registrar Acción', icon: ClipboardPlus },
    { id: 'historial', label: 'Historial', icon: History },
    { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 },
    { id: 'configuracion', label: 'Configuración', icon: Settings, adminOnly: true },
  ];

  return (
    <aside
      className={`${collapsed ? 'w-20' : 'w-72'
        } bg-slate-800 text-white min-h-screen flex flex-col shadow-xl transition-all duration-300`}
    >
      {/* HEADER */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <div className='flex'>
            <div>
              <img 
                src="src/assets/Logo_ESP.png" 
                alt="Logo ESP" 
                className="h-15 w-15"
              />
            </div>
            <div>
              <h2 className="font-bold text-sm mt-3">
                Escuela Superior de Policía
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                "Gral. Alberto Enríquez Gallo"
              </p>
            </div>            
          </div>
        )}

        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {menuItems.filter(item => !item.adminOnly || rol === 'Administrador').map((item) => (
            <li key={item.id} className="relative group">
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>

              {/* TOOLTIP (cuando está colapsado) */}
              {collapsed && (
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-slate-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <button
          onClick={() => navigate('/home')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white"
        >
          <Home className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Regresar</span>}
        </button>

        {!collapsed && (
          <div className="text-xs text-slate-400 text-center">
            Sistema Disciplinario v1.0
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

