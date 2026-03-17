import { useMemo, useState } from 'react';
import { Users, Award, AlertTriangle, Activity, TrendingUp, TrendingDown, Calendar, MapPin } from 'lucide-react';

const PanelEstadisticas = ({ cadetes, acciones }) => {

  // ✅ ESTADO DEL FILTRO (FUERA DEL useMemo)
  const [filtroTipo, setFiltroTipo] = useState('todas'); // todas | positivas | negativas

  const chartData = useMemo(() => {
    const positivas = acciones.filter(a => a.accionDefinida?.tipo === 'Positiva' || a.tipo === 'Positiva');
    const negativas = acciones.filter(a => a.accionDefinida?.tipo === 'Negativa' || a.tipo === 'Negativa');

    // 🔥 FILTRO SEGÚN BOTÓN
    let accionesFiltradas = acciones;
    if (filtroTipo === 'positivas') accionesFiltradas = positivas;
    if (filtroTipo === 'negativas') accionesFiltradas = negativas;

    // Por sección
    const secciones = [...new Set(cadetes.map(c => c.seccion))].sort();

    const positivasPorSeccion = secciones.map(sec => ({
      seccion: sec,
      count: positivas.filter(a => a.cadete?.seccion === sec).length
    }));

    const negativasPorSeccion = secciones.map(sec => ({
      seccion: sec,
      count: negativas.filter(a => a.cadete?.seccion === sec).length
    }));

    // Por género
    const porGenero = {
      masculino: {
        positivas: positivas.filter(a => a.cadete?.genero === 'Masculino').length,
        negativas: negativas.filter(a => a.cadete?.genero === 'Masculino').length
      },
      femenino: {
        positivas: positivas.filter(a => a.cadete?.genero === 'Femenino').length,
        negativas: negativas.filter(a => a.cadete?.genero === 'Femenino').length
      }
    };

    // Por provincia
    const provincias = [...new Set(cadetes.map(c => c.lugar_nacimiento).filter(Boolean))];

    const porProvincia = provincias.map(prov => ({
      provincia: prov,
      positivas: positivas.filter(a => a.cadete?.lugar_nacimiento === prov).length,
      negativas: negativas.filter(a => a.cadete?.lugar_nacimiento === prov).length
    }))
    .sort((a, b) => (b.positivas + b.negativas) - (a.positivas + a.negativas))
    .slice(0, 10);

    // 🔥 ACCIONES POR DÍA (CON FILTRO)
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const accionesPorDia = dias.map((dia, idx) => ({
      dia,
      count: accionesFiltradas.filter(a => {
        if (!a.fecha) return false;
        const fecha = new Date(a.fecha);
        return fecha.getUTCDay() === idx;
      }).length
    }));

    return {
      positivasPorSeccion,
      negativasPorSeccion,
      porGenero,
      porProvincia,
      accionesPorDia
    };

  }, [cadetes, acciones, filtroTipo]); // 🔥 IMPORTANTE

  const maxPositivas = Math.max(...chartData.positivasPorSeccion.map(s => s.count), 1);
  const maxNegativas = Math.max(...chartData.negativasPorSeccion.map(s => s.count), 1);

  const totalPositivas = acciones.filter(a => a.accionDefinida?.tipo === 'Positiva' || a.tipo === 'Positiva').length;
  const totalNegativas = acciones.filter(a => a.accionDefinida?.tipo === 'Negativa' || a.tipo === 'Negativa').length;


  return (
    <div className="space-y-6">
      {/* Resumen general */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Cadetes</p>
              <p className="text-3xl font-bold text-blue-600">{cadetes.length}</p>
            </div>
            <Users className="w-10 h-10 text-blue-200" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Positivas</p>
              <p className="text-3xl font-bold text-green-600">{totalPositivas}</p>
            </div>
            <Award className="w-10 h-10 text-green-200" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Negativas</p>
              <p className="text-3xl font-bold text-red-600">{totalNegativas}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-200" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Balance General</p>
              <p className={`text-3xl font-bold ${totalPositivas >= totalNegativas ? 'text-green-600' : 'text-red-600'
                }`}>
                {totalNegativas > 0 ? ((totalPositivas / totalNegativas) * 100).toFixed(0) : 100}%
              </p>
            </div>
            <Activity className="w-10 h-10 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acciones por sección - Positivas */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Acciones Positivas por Sección
          </h4>
          <div className="space-y-2">
            {chartData.positivasPorSeccion.map((item) => (
              <div key={item.seccion} className="flex items-center gap-3">
                <span className="w-16 text-sm text-slate-600">{item.seccion}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-green-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(item.count / maxPositivas) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-sm font-medium text-green-600 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones por sección - Negativas */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            Acciones Negativas por Sección
          </h4>
          <div className="space-y-2">
            {chartData.negativasPorSeccion.map((item) => (
              <div key={item.seccion} className="flex items-center gap-3">
                <span className="w-16 text-sm text-slate-600">{item.seccion}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(item.count / maxNegativas) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-sm font-medium text-red-600 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparación por género */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Comparación por Género
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-2">Masculino ({chartData.porGenero.masculino.positivas + chartData.porGenero.masculino.negativas} acciones)</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-green-100 rounded p-2 text-center">
                  <p className="text-lg font-bold text-green-600">{chartData.porGenero.masculino.positivas}</p>
                  <p className="text-xs text-green-700">Positivas</p>
                </div>
                <div className="flex-1 bg-red-100 rounded p-2 text-center">
                  <p className="text-lg font-bold text-red-600">{chartData.porGenero.masculino.negativas}</p>
                  <p className="text-xs text-red-700">Negativas</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Femenino ({chartData.porGenero.femenino.positivas + chartData.porGenero.femenino.negativas} acciones)</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-green-100 rounded p-2 text-center">
                  <p className="text-lg font-bold text-green-600">{chartData.porGenero.femenino.positivas}</p>
                  <p className="text-xs text-green-700">Positivas</p>
                </div>
                <div className="flex-1 bg-red-100 rounded p-2 text-center">
                  <p className="text-lg font-bold text-red-600">{chartData.porGenero.femenino.negativas}</p>
                  <p className="text-xs text-red-700">Negativas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Análisis temporal - Día */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Acciones por Día de la Semana
          </h4>

          <div className="flex items-end justify-between h-40 gap-2">
            {(() => {
              const max = Math.max(...chartData.accionesPorDia.map(d => d.count), 1);

              return chartData.accionesPorDia.map((item) => {
                // 🔥 Escala suavizada
                const altura = item.count > 0
                  ? Math.max((Math.sqrt(item.count) / Math.sqrt(max)) * 100, 5)
                  : 0;

                return (
                  <div key={item.dia} className="flex-1 flex flex-col items-center justify-end">

                    {/* 🔢 Número */}
                    <span className="text-xs font-bold text-purple-700 mb-1">
                      {item.count}
                    </span>

                    {/* 📊 Barra */}
                    <div
                      className="w-full bg-purple-500 rounded-t transition-all duration-500 hover:bg-purple-600"
                      style={{ height: `${altura}%` }}
                    />

                    {/* 📅 Día */}
                    <span className="text-xs text-slate-500 mt-1 text-center">
                      {item.dia.slice(0, 3)}
                    </span>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>

      {/* Acciones por provincia */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-orange-600" />
          Acciones por Provincia (Top 10)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-4 py-2 text-left text-sm font-semibold">Provincia</th>
                <th className="px-4 py-2 text-right text-sm font-semibold text-green-600">Positivas</th>
                <th className="px-4 py-2 text-right text-sm font-semibold text-red-600">Negativas</th>
                <th className="px-4 py-2 text-right text-sm font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {chartData.porProvincia.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="px-4 py-2 text-sm">{item.provincia}</td>
                  <td className="px-4 py-2 text-sm text-green-600 text-right">{item.positivas}</td>
                  <td className="px-4 py-2 text-sm text-red-600 text-right">{item.negativas}</td>
                  <td className="px-4 py-2 text-sm font-medium text-right">{item.positivas + item.negativas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PanelEstadisticas;

