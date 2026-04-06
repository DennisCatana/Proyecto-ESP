import { useState } from 'react';
import { Search, X } from 'lucide-react';
import BuscadorCadetes from './BuscadorCadetes';
import FormularioRegistro from './FormularioRegistro';

const RegistrarSection = ({
  cadetes,
  accionesDefinidas,
  onSelectCadete,
  cadeteSeleccionado,
  onCancel,
  loadingRegistro,
  usuarioActual,
  handleRegistrarAccion
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <h2 className="text-xl font-bold text-slate-800">Registrar Acción Disciplinaria</h2>

      {/* Búsqueda y selección de cadete */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-500" />
          Buscar y Seleccionar Cadete
        </h3>
        <BuscadorCadetes
          onSelect={onSelectCadete}
          cadetes={cadetes}
        />
      </div>

      {/* Formulario (siempre visible, pero deshabilitado si no hay cadete) */}
      <FormularioRegistro
        cadete={cadeteSeleccionado}
        accionesDefinidas={accionesDefinidas}
        onSubmit={handleRegistrarAccion}
        onCancel={onCancel}
        loading={loadingRegistro}
        oficialActual={usuarioActual}
      />
    </div>
  );
};

export default RegistrarSection;
