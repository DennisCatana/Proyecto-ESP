import BuscadorCadetes from './BuscadorCadetes';
import FormularioRegistro from './FormularioRegistro';

const RegistrarSection = ({ cadetes, accionesDefinidas, onSelectCadete, cadeteSeleccionado, onCancel, loadingRegistro, oficialActual, handleRegistrarAccion }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Registrar Acción Disciplinaria</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-slate-700 mb-3">Buscar Cadete</h3>
          <BuscadorCadetes 
            onSelect={onSelectCadete} 
            cadetes={cadetes}
          />
          
          {cadeteSeleccionado && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Cadete Seleccionado</h4>
              <p className="text-slate-800 font-medium">{cadeteSeleccionado.nombre}</p>
              <p className="text-sm text-slate-600">
                {cadeteSeleccionado.cia} • {cadeteSeleccionado.seccion} • 
                Hab: {cadeteSeleccionado.habitacion} • GG: {cadeteSeleccionado.grupo_guardia}
              </p>
            </div>
          )}
        </div>

        <FormularioRegistro 
          cadete={cadeteSeleccionado}
          accionesDefinidas={accionesDefinidas}
          onSubmit={handleRegistrarAccion}
          onCancel={onCancel}
          loading={loadingRegistro}
          oficialActual={oficialActual}
        />
      </div>
    </div>
  );
};

export default RegistrarSection;

