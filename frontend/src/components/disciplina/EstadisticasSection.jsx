import PanelEstadisticas from './PanelEstadisticas';

const EstadisticasSection = ({ cadetes, acciones }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Estadísticas Generales</h2>
      <PanelEstadisticas 
        cadetes={cadetes}
        acciones={acciones}
      />
    </div>
  );
};

export default EstadisticasSection;

