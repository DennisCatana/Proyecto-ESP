import { useState, useMemo } from 'react';
import { Activity, Award, AlertTriangle, Filter, Search, Image as ImageIcon, X, ChevronDown } from 'lucide-react';

const HistorialSection = ({ acciones, cadetes }) => {
  const [filtroPromocion, setFiltroPromocion] = useState('');
  const [filtroSeccion, setFiltroSeccion] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [imagenAmpliada, setImagenAmpliada] = useState(null);

  // Valores únicos para filtros
  const promociones = useMemo(() => {
    return [...new Set(cadetes.map(c => c.promocion).filter(Boolean))].sort();
  }, [cadetes]);

  const secciones = useMemo(() => {
    return [...new Set(cadetes.map(c => c.seccion).filter(Boolean))].sort();
  }, [cadetes]);

  // Índice de cadetes por id para búsqueda rápida
  const cadetesMap = useMemo(() => {
    const map = {};
    cadetes.forEach(c => { map[c.id] = c; });
    return map;
  }, [cadetes]);

  const accionesFiltradas = useMemo(() => {
    let result = [...acciones].sort(
      (a, b) => new Date(b.fechaRegistro || b.fecha) - new Date(a.fechaRegistro || a.fecha)
    );

    if (filtroTipo) {
      result = result.filter(a => a.accionDefinida?.tipo === filtroTipo);
    }

    if (filtroPromocion) {
      result = result.filter(a => {
        const cadete = cadetesMap[a.cadeteId] || a.cadete;
        return cadete?.promocion === filtroPromocion;
      });
    }

    if (filtroSeccion) {
      result = result.filter(a => {
        const cadete = cadetesMap[a.cadeteId] || a.cadete;
        return cadete?.seccion === filtroSeccion;
      });
    }

    if (busqueda) {
      const term = busqueda.toLowerCase();
      result = result.filter(a => {
        const cadete = cadetesMap[a.cadeteId] || a.cadete;
        return (
          cadete?.nombre?.toLowerCase().includes(term) ||
          cadete?.cedula?.includes(term) ||
          a.accionDefinida?.titulo?.toLowerCase().includes(term) ||
          a.accionDefinida?.codigo?.toLowerCase().includes(term) ||
          a.observacion?.toLowerCase().includes(term)
        );
      });
    }

    return result;
  }, [acciones, filtroTipo, filtroPromocion, filtroSeccion, busqueda, cadetesMap]);

  const totalPositivas = accionesFiltradas.filter(a => a.accionDefinida?.tipo === 'Positiva').length;
  const totalNegativas = accionesFiltradas.filter(a => a.accionDefinida?.tipo === 'Negativa').length;

  const limpiarFiltros = () => {
    setFiltroPromocion('');
    setFiltroSeccion('');
    setFiltroTipo('');
    setBusqueda('');
  };

  const hayFiltros = filtroPromocion || filtroSeccion || filtroTipo || busqueda;

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-slate-800">Historial General de Acciones</h2>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Buscador */}
          <div className="flex-1 min-w-[220px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar cadete, acción, código..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>

          {/* Filtro tipo */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={filtroTipo}
              onChange={e => setFiltroTipo(e.target.value)}
              className="pl-9 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm appearance-none"
            >
              <option value="">Todos los Tipos</option>
              <option value="Positiva">✓ Positivas</option>
              <option value="Negativa">✗ Negativas</option>
            </select>
          </div>

          {/* Filtro promoción */}
          <select
            value={filtroPromocion}
            onChange={e => setFiltroPromocion(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          >
            <option value="">Todas las Promociones</option>
            {promociones.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          {/* Filtro sección */}
          <select
            value={filtroSeccion}
            onChange={e => setFiltroSeccion(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          >
            <option value="">Todas las Secciones</option>
            {secciones.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {hayFiltros && (
            <button
              onClick={limpiarFiltros}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm transition"
            >
              <X className="w-4 h-4" />
              Limpiar
            </button>
          )}
        </div>

        {/* Resumen de resultados */}
        <div className="flex items-center gap-4 text-sm text-slate-500 pt-1">
          <span>{accionesFiltradas.length} registros encontrados</span>
          <span className="flex items-center gap-1 text-green-600">
            <Award className="w-4 h-4" /> {totalPositivas} positivas
          </span>
          <span className="flex items-center gap-1 text-red-600">
            <AlertTriangle className="w-4 h-4" /> {totalNegativas} negativas
          </span>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {accionesFiltradas.length === 0 ? (
          <div className="text-center py-16">
            <Activity className="w-14 h-14 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500 text-lg">No se encontraron registros</p>
            {hayFiltros && (
              <button onClick={limpiarFiltros} className="mt-3 text-blue-500 hover:underline text-sm">
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Cadete</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Promoción / Sección</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Acción</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Observación</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase">Evidencia</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Registrado por</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Fecha Acción</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Fecha Registro</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Puntaje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {accionesFiltradas.map((accion, idx) => {
                  const esPositiva = accion.accionDefinida?.tipo === 'Positiva';
                  const puntaje = parseFloat(accion.puntajeAplicado || 0);
                  const cadete = cadetesMap[accion.cadeteId] || accion.cadete;

                  return (
                    <tr
                      key={idx}
                      className={`transition hover:bg-slate-50 ${
                        esPositiva ? 'border-l-2 border-l-green-400' : 'border-l-2 border-l-red-400'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800">{cadete?.nombre || accion.cadete?.nombre || '-'}</p>
                        <p className="text-xs text-slate-400">{cadete?.cedula || accion.cadete?.cedula}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        <p>{cadete?.promocion || accion.cadete?.promocion || '-'}</p>
                        <p className="text-xs text-slate-400">{cadete?.seccion || accion.cadete?.seccion}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          esPositiva ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {esPositiva ? <Award className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                          {esPositiva ? 'Positiva' : 'Negativa'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800">{accion.accionDefinida?.titulo || '-'}</p>
                        <p className="text-xs text-slate-400">{accion.accionDefinida?.codigo}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600 max-w-[180px] truncate" title={accion.observacion}>
                        {accion.observacion || '-'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {accion.ruta_imagen ? (
                          <button
                            onClick={() => setImagenAmpliada(accion.ruta_imagen)}
                            className="inline-flex items-center justify-center p-1 bg-blue-100 hover:bg-blue-200 rounded-lg transition"
                            title="Ver evidencia"
                          >
                            <ImageIcon className="w-5 h-5 text-blue-600" />
                          </button>
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {accion.registradoPor
                          ? `${accion.registradoPor.gradoU || ''} ${accion.registradoPor.nombreU || ''}`.trim()
                          : '-'}
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {new Date(accion.fecha).toLocaleDateString('es-EC')}
                        <span className="text-xs text-slate-400 ml-1">
                          {new Date(accion.fecha).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">
                        {accion.fechaRegistro
                          ? new Date(accion.fechaRegistro).toLocaleDateString('es-EC')
                          : '-'}
                      </td>
                      <td className={`px-4 py-3 text-right font-bold whitespace-nowrap ${
                        esPositiva ? 'text-green-600' : 'text-red-600'
                      }`}>
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

      {/* Modal imagen ampliada */}
      {imagenAmpliada && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setImagenAmpliada(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setImagenAmpliada(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={imagenAmpliada}
              alt="Evidencia"
              className="w-full max-h-[80vh] object-contain rounded-lg"
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialSection;
