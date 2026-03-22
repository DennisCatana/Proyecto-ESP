import { Activity } from 'lucide-react';
import ExpedienteCadete from './ExpedienteCadete';

const HistorialSection = ({ acciones }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Historial General de Acciones</h2>
      {acciones.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Activity className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">No hay acciones disciplinarias registradas</p>
        </div>
      ) : (
        <ExpedienteCadete 
          cadete={{ nombre: 'Todos los Cadetes', cia: '-', seccion: '-', edad: '-', genero: '-' }}
          acciones={acciones}
          onClose={() => {}}
        />
      )}
    </div>
  );
};

export default HistorialSection;

