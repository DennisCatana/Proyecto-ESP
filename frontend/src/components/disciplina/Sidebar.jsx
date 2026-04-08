import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, ClipboardPlus, History, BarChart3, Settings,
  Home, ChevronLeft, ChevronRight, UserCircle
} from 'lucide-react';
import logo from '../../assets/Logo_ESP.png';

const Sidebar = ({ activeSection, setActiveSection, rol, collapsed, setCollapsed, className }) => {
  const navigate = useNavigate();

  const esAlumno = rol === 'Alumno';

  const menuItems = [
    { id: 'miPerfil', label: 'Mi Perfil', icon: UserCircle, roles: ['Alumno', 'Administrador'] },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Administrador', 'Instructor'] },
    { id: 'cadetes', label: 'Cadetes', icon: Users, roles: ['Administrador', 'Instructor'] },
    { id: 'registrar', label: 'Registrar Acción', icon: ClipboardPlus, roles: ['Administrador', 'Instructor'] },
    { id: 'historial', label: 'Historial', icon: History, roles: ['Administrador', 'Instructor'] },
    { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3, roles: ['Administrador', 'Instructor'] },
    { id: 'configuracion', label: 'Configuración', icon: Settings, roles: ['Administrador'] },
  ];

  const visibleItems = menuItems.filter(item => item.roles.includes(rol));

  return (
    <aside
      className={`
        ${collapsed ? 'w-20' : 'w-72'}
        bg-slate-800 text-white min-h-screen flex fixed top-0 left-0 flex-col shadow-xl transition-all duration-300
        ${className || ''}
      `}
    >
      {/* HEADER */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo ESP" className="h-12 w-12 shrink-0" />
            <div>
              <h2 className="font-bold text-sm leading-tight">
                Escuela Superior de Policía
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                "Gral. Alberto Enríquez Gallo"
              </p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-slate-700 transition shrink-0"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {visibleItems.map((item) => (
            <li key={item.id} className="relative group">
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>

              {collapsed && (
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-slate-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50">
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
          <Home className="w-5 h-5 shrink-0" />
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
