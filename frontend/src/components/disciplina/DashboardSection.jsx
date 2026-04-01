import { ClipboardPlus, Users, Award, AlertTriangle, Activity, TrendingUp, TrendingDown, Image as ImageIcon } from 'lucide-react';
import StatCard from './StatCard';

const DashboardSection = ({ cadetes, acciones, estadisticasGlobales, onNewAction, setActiveSection }) => {
  const balance = estadisticasGlobales.positivas - estadisticasGlobales.negativas;
  const ultimasAcciones = [...acciones]
    .sort((a, b) => new Date(b.fechaRegistro || b.fecha) - new Date(a.fechaRegistro || a.fecha))
    .slice(0, 15);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Panel de Control</h2>
        <button
          onClick={onNewAction}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition font-medium shadow-md"
        >
          <ClipboardPlus className="w-5 h-5" />
          Nueva Acción
        </button>
      </div>

      {/* Estadísticas principales */}
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
        <div className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${
          balance >= 0 ? 'border-emerald-500' : 'border-red-500'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Balance General</p>
              <p className={`text-3xl font-bold ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {balance >= 0 ? '+' : ''}{balance}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Positivas - Negativas
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              balance >= 0 ? 'bg-emerald-100' : 'bg-red-100'
            }`}>
              {balance >= 0
                ? <TrendingUp className="w-6 h-6 text-emerald-600" />
                : <TrendingDown className="w-6 h-6 text-red-600" />}
            </div>
          </div>
        </div>
      </div>

      {/* Últimas acciones registradas */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Últimas Acciones Registradas
          </h3>
          <button
            onClick={() => setActiveSection('historial')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition"
          >
            Ver historial completo →
          </button>
        </div>

        {ultimasAcciones.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Activity className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>No hay acciones registradas aún</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Cadete</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Acción</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Registrado por</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Fecha Acción</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Fecha Registro</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Puntaje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ultimasAcciones.map((accion, idx) => {
                  const esPositiva = accion.accionDefinida?.tipo === 'Positiva';
                  const puntaje = parseFloat(accion.puntajeAplicado || 0);
                  return (
                    <tr key={idx} className={`hover:bg-slate-50 transition ${esPositiva ? 'border-l-2 border-l-green-400' : 'border-l-2 border-l-red-400'}`}>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-slate-800">{accion.cadete?.nombre || '-'}</p>
                          <p className="text-xs text-slate-400">{accion.cadete?.cia} • {accion.cadete?.seccion}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-slate-800">{accion.accionDefinida?.titulo || '-'}</p>
                        <p className="text-xs text-slate-400">{accion.accionDefinida?.codigo}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          esPositiva ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {esPositiva ? <Award className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                          {esPositiva ? 'Positiva' : 'Negativa'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {accion.registradoPor
                          ? `${accion.registradoPor.gradoU || ''} ${accion.registradoPor.nombreU || ''}`
                          : '-'}
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {new Date(accion.fecha).toLocaleDateString('es-EC')}
                        <span className="text-xs text-slate-400 ml-1">
                          {new Date(accion.fecha).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {accion.fechaRegistro
                          ? new Date(accion.fechaRegistro).toLocaleDateString('es-EC')
                          : '-'}
                      </td>
                      <td className={`px-4 py-3 text-right font-bold ${esPositiva ? 'text-green-600' : 'text-red-600'}`}>
                        {esPositiva ? '+' : ''}{puntaje.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSection;
