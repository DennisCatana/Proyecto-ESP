import { Users } from 'lucide-react';
import BuscadorCadetes from './BuscadorCadetes';
import ExpedienteCadete from './ExpedienteCadete';

const CadetesSection = ({ cadetes, acciones, onSelectCadete, cadeteSeleccionado, onCloseExpediente, obtenerAccionesCadete }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Consulta de Cadetes</h2>
      
      <BuscadorCadetes 
        onSelect={onSelectCadete} 
        cadetes={cadetes}
      />

      {cadeteSeleccionado ? (
        <ExpedienteCadete 
          cadete={cadeteSeleccionado}
          acciones={obtenerAccionesCadete(cadeteSeleccionado.id)}
          onClose={onCloseExpediente}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">Seleccione un cadete para ver su expediente disciplinario</p>
        </div>
      )}
    </div>
  );
};

export default CadetesSection;

