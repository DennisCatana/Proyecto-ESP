import { useState, useMemo } from 'react';
import { Users, Search, Filter, ArrowUpDown, X } from 'lucide-react';
import ExpedienteCadete from './ExpedienteCadete';

const CadetesSection = ({ cadetes, acciones, onSelectCadete, cadeteSeleccionado, onCloseExpediente, obtenerAccionesCadete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCia, setFiltroCia] = useState('');
  const [filtroSeccion, setFiltroSeccion] = useState('');
  const [sortBy, setSortBy] = useState('nombre');
  const [modalAbierto, setModalAbierto] = useState(false);

  const companias = useMemo(() => {
    return [...new Set(cadetes.map(c => c.cia).filter(Boolean))].sort();
  }, [cadetes]);

  const secciones = useMemo(() => {
    return [...new Set(cadetes.map(c => c.seccion).filter(Boolean))].sort();
  }, [cadetes]);

  const cadetesFiltrados = useMemo(() => {
    let result = [...cadetes];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(cadete =>
        cadete.nombre?.toLowerCase().includes(term) ||
        cadete.cedula?.includes(term)
      );
    }
    if (filtroCia) result = result.filter(c => c.cia === filtroCia);
    if (filtroSeccion) result = result.filter(c => c.seccion === filtroSeccion);

    result.sort((a, b) => {
      if (sortBy === 'antiguedad') return (a.antiguedad || 999) - (b.antiguedad || 999);
      return a.nombre?.localeCompare(b.nombre) || 0;
    });

    return result;
  }, [cadetes, searchTerm, filtroCia, filtroSeccion, sortBy]);

  const handleSelectCadete = (cadete) => {
    onSelectCadete(cadete);
    setModalAbierto(true);
  };

  const handleCloseModal = () => {
    setModalAbierto(false);
    onCloseExpediente();
  };

  const accionesDelCadete = cadeteSeleccionado
    ? obtenerAccionesCadete(cadeteSeleccionado.id)
    : [];

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-50 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o cédula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={filtroCia}
              onChange={(e) => setFiltroCia(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Todas las Compañías</option>
              {companias.map(cia => (
                <option key={cia} value={cia}>{cia}</option>
              ))}
            </select>
          </div>

          <select
            value={filtroSeccion}
            onChange={(e) => setFiltroSeccion(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Todas las Secciones</option>
            {secciones.map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="nombre">Orden Alfabético</option>
              <option value="antiguedad">Por Antigüedad</option>
            </select>
          </div>
        </div>

        <div className="mt-3 text-sm text-slate-500">
          Mostrando {cadetesFiltrados.length} de {cadetes.length} cadetes
          <span className="ml-2 text-blue-500 text-xs">— Haga click en un cadete para ver su expediente</span>
        </div>
      </div>

      {/* Tabla de Cadetes */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  {sortBy === 'antiguedad' ? 'Antigüedad' : 'Nombre'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Cédula</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Compañía</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Sección</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Hab.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">GG</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cadetesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-slate-500">
                    No se encontraron cadetes con los filtros aplicados
                  </td>
                </tr>
              ) : (
                cadetesFiltrados.map((cadete, index) => {
                  const isSelected = cadeteSeleccionado?.id === cadete.id;
                  const puntaje = parseFloat(cadete.puntajeTotal || 0);

                  return (
                    <tr
                      key={cadete.id}
                      onClick={() => handleSelectCadete(cadete)}
                      className={`hover:bg-blue-50 cursor-pointer transition ${
                        isSelected ? 'bg-blue-100' : ''
                      }`}
                      title="Ver expediente completo"
                    >
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {sortBy === 'antiguedad' ? (cadete.antiguedad || '-') : index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {cadete.nombre?.charAt(0).toUpperCase()}
                          </div>
                          <span className={`font-medium ${isSelected ? 'text-blue-800' : 'text-slate-800'}`}>
                            {cadete.nombre}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{cadete.cedula}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {cadete.cia || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{cadete.seccion || '-'}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{cadete.habitacion || '-'}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{cadete.grupo_guardia || '-'}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-sm font-bold ${puntaje >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {puntaje >= 0 ? '+' : ''}{puntaje.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal del expediente */}
      {modalAbierto && cadeteSeleccionado && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-8 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal(); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-4 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
            <ExpedienteCadete
              cadete={cadeteSeleccionado}
              acciones={cadeteSeleccionado.acciones || accionesDelCadete}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CadetesSection;
