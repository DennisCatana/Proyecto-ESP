                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            import { ClipboardPlus, Users, Award, AlertTriangle, Activity } from 'lucide-react';
import StatCard from './StatCard';

const DashboardSection = ({ cadetes, acciones, estadisticasGlobales, onNewAction, setActiveSection }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Panel de Control</h2>
        <button
          onClick={onNewAction}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
        >
          <ClipboardPlus className="w-5 h-5" />
          Nueva Acción
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Cadetes" 
          value={cadetes.length} 
          icon={Users} 
          color="#007BFF" 
        />
        <StatCard 
          title="Acciones Positivas" 
          value={estadisticasGlobales.positivas} 
          icon={Award} 
          color="#22c55e" 
        />
        <StatCard 
          title="Acciones Negativas" 
          value={estadisticasGlobales.negativas} 
          icon={AlertTriangle} 
          color="#ef4444" 
        />
        <StatCard 
          title="Balance General" 
          value={`${estadisticasGlobales.negativas > 0 ? ((estadisticasGlobales.positivas / estadisticasGlobales.negativas) * 100).toFixed(0) : 100}%`} 
          icon={Activity} 
          color="#8b5cf6" 
        />
      </div>

      {/* Vista rápida de cadetes */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-slate-800 mb-4">Cadetes Recientes</h3>
        {cadetes.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No hay cadetes registrados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cadetes.slice(0, 6).map((cadete) => {
              const accionesCadete = acciones.filter(a => a.cadeteId === cadete.id);
              const positivas = accionesCadete.filter(a => a.accionDefinida?.tipo === 'Positiva').length;
              const negativas = accionesCadete.filter(a => a.accionDefinida?.tipo === 'Negativa').length;
              
              return (
                <div 
                  key={cadete.id}
onClick={() => {
                    // Open cadetes and select this cadete
                    setActiveSection('cadetes');
                  }}
                  className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition cursor-pointer"
                  title="Ver expediente"
                  
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800 truncate">{cadete.nombre}</h4>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded">{cadete.cia}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{cadete.seccion} • {cadete.cedula}</p>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-600 flex items-center gap-1">
                      <Award className="w-4 h-4" /> {positivas}
                    </span>
                    <span className="text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" /> {negativas}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSection;

