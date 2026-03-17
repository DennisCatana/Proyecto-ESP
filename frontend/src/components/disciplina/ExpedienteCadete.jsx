import { useMemo, useState } from 'react';
import { X, Building2, Users, User, Calendar, History, FileText, Image as ImageIcon } from 'lucide-react';

const ExpedienteCadete = ({ cadete, acciones, onClose }) => {
  const [imagenAmpliada, setImagenAmpliada] = useState(null);
  const accionesOrdenadas = [...acciones].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const [paginaActual, setPaginaActual] = useState(1);
  const accionesPorPagina = 10;

  const indiceUltima = paginaActual * accionesPorPagina;
  const indicePrimera = indiceUltima - accionesPorPagina;

  const accionesPaginadas = accionesOrdenadas.slice(indicePrimera, indiceUltima);

  const totalPaginas = Math.ceil(accionesOrdenadas.length / accionesPorPagina);

  const estadisticas = useMemo(() => {
    return acciones.reduce((acc, accion) => {
      if (accion.accionDefinida?.tipo === 'Positiva' || accion.tipo === 'Positiva') {
        acc.positivas++;
        acc.puntajePositivo += parseFloat(accion.puntajeAplicado || accion.puntaje || 0);
      } else {
        acc.negativas++;
        acc.puntajeNegativo += Math.abs(parseFloat(accion.puntajeAplicado || accion.puntaje || 0));
      }
      return acc;
    }, { positivas: 0, negativas: 0, puntajePositivo: 0, puntajeNegativo: 0 });
  }, [acciones]);

  const balance = estadisticas.puntajePositivo - estadisticas.puntajeNegativo;

  // Función para obtener la URL completa de la imagen
  const getImageUrl = (ruta) => {
    if (!ruta) return null;
    return `http://localhost:3000${ruta}`; //Estar atento a esto en produccion 
    return ruta;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header del expediente */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold">{cadete.nombre}</h3>
            <div className="flex gap-4 mt-2 text-blue-100">
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" /> {cadete.cia}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" /> {cadete.seccion}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {cadete.edad} años
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {cadete.genero || 'N/A'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Indicadores disciplinarios */}
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <p className="text-sm text-slate-500">Acciones Positivas</p>
            <p className="text-2xl font-bold text-green-600">{estadisticas.positivas}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
            <p className="text-sm text-slate-500">Acciones Negativas</p>
            <p className="text-2xl font-bold text-red-600">{estadisticas.negativas}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-sm text-slate-500">Puntaje Positivo</p>
            <p className="text-2xl font-bold text-blue-600">+{estadisticas.puntajePositivo.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
            <p className="text-sm text-slate-500">Balance Disciplinario</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {balance >= 0 ? '+' : ''}{balance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Historial de acciones */}
      <div className="p-6">
        <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <History className="w-5 h-5" />
          Historial Disciplinario
        </h4>
        {accionesOrdenadas.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No hay acciones disciplinarias registradas</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Fecha</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Hora</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Tipo</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Código</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Descripción</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Evidencia</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Oficial</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Puntaje</th>
                </tr>
              </thead>
              <tbody>
                {accionesPaginadas.map((accion, idx) => {
                  const esPositiva = accion.accionDefinida?.tipo === 'Positiva' || accion.tipo === 'Positiva';
                  const puntaje = parseFloat(accion.puntajeAplicado || accion.puntaje || 0);
                  const tieneEvidencia = accion.ruta_imagen;
                  const imageUrl = getImageUrl(accion.ruta_imagen);
                  return (
                    <tr key={idx} className={`border-b border-slate-100 ${esPositiva ? 'bg-green-50' : 'bg-red-50'}`}>
                      <td className="px-4 py-3 text-sm">
                        {new Date(accion.fecha).toLocaleDateString('es-EC')}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {new Date(accion.fecha).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${esPositiva
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                          }`}>
                          {esPositiva ? 'Positiva' : 'Negativa'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {accion.accionDefinida?.codigo || accion.codigo || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">
                        {accion.observacion || accion.accionDefinida?.descripcion || accion.descripcion || '-'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {tieneEvidencia ? (
                          <button
                            onClick={() => {
                              console.log(imageUrl);
                              setImagenAmpliada(imageUrl);
                            }}
                            className="inline-flex items-center justify-center p-1 bg-blue-100 hover:bg-blue-200 rounded-lg transition"
                            title="Ver evidencia"
                          >
                            <ImageIcon className="w-5 h-5 text-blue-600" />
                          </button>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {accion.registradoPor?.gradoU || accion.gradoU || '-'} {accion.registradoPor?.nombreU || accion.nombreU || '-'}
                      </td>
                      <td className={`px-4 py-3 text-sm text-right font-bold ${esPositiva ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {esPositiva ? '+' : ''}{puntaje.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>


            <div className="flex justify-center items-center gap-4 mt-4">

              {/* Botón anterior */}
              <button
                onClick={() => setPaginaActual(paginaActual - 1)}
                disabled={paginaActual === 1}
                className="px-4 py-3 text-left text-sm font-semibold text-slate-700 
                    bg-slate-200 rounded-lg hover:bg-slate-300 active:bg-slate-400 transition disabled:opacity-50"

              >
                ← Anterior
              </button>

              <span className="text-sm">
                Página {paginaActual} de {totalPaginas}
              </span>

              {/* Botón siguiente */}
              <button
                onClick={() => setPaginaActual(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                className="px-4 py-3 text-left text-sm font-semibold text-slate-700
                     bg-slate-200 rounded-lg hover:bg-slate-300 active:bg-slate-400 transition disabled:opacity-50"

              >
                Siguiente →
              </button>

            </div>
          </div>
        )}
      </div>

      {/* Modal para ampliar imagen */}
      {imagenAmpliada && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setImagenAmpliada(null)}
        >
          <img
            src={imagenAmpliada}
            alt="Evidencia"
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ExpedienteCadete;

