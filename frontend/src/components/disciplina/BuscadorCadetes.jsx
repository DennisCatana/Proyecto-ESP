import { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const BuscadorCadetes = ({ onSelect, cadetes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredCadetes = useMemo(() => {
    if (!searchTerm.trim()) return cadetes.slice(0, 8);
    const term = searchTerm.toLowerCase();
    return cadetes.filter(cadete =>
      cadete.nombre?.toLowerCase().includes(term) ||
      cadete.cedula?.includes(term) ||
      cadete.seccion?.toLowerCase().includes(term)
    ).slice(0, 15);
  }, [cadetes, searchTerm]);

  const handleSelect = (cadete) => {
    onSelect(cadete);
    setSearchTerm(cadete.nombre);
    setShowResults(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar cadete por nombre, cédula o sección..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
        />
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>

      {showResults && filteredCadetes.length > 0 && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-auto">
          {!searchTerm && (
            <div className="px-4 py-2 text-xs text-slate-400 border-b border-slate-100">
              Mostrando primeros resultados — escriba para filtrar
            </div>
          )}
          {filteredCadetes.map((cadete) => (
            <button
              key={cadete.id}
              onMouseDown={() => handleSelect(cadete)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center justify-between border-b border-slate-50 last:border-0 transition"
            >
              <div>
                <p className="font-semibold text-slate-800 text-sm">{cadete.nombre}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  C.I.: {cadete.cedula} • {cadete.seccion}
                </p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full shrink-0">
                {cadete.cia}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuscadorCadetes;
