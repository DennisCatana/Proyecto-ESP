import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

const BuscadorCadetes = ({ onSelect, cadetes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    cia: '',
    seccion: ''
  });

  // Obtener valores únicos para filtros
  const companias = [...new Set(cadetes.map(c => c.cia))].sort();
  const secciones = [...new Set(cadetes.map(c => c.seccion))].sort();

  // Filtrar cadetes
  const filteredCadetes = useMemo(() => {
    return cadetes.filter(cadete => {
      const matchesSearch = !searchTerm || 
        cadete.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cadete.cedula.includes(searchTerm) ||
        cadete.seccion.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCia = !selectedFilters.cia || cadete.cia === selectedFilters.cia;
      const matchesSeccion = !selectedFilters.seccion || cadete.seccion === selectedFilters.seccion;
      
      return matchesSearch && matchesCia && matchesSeccion;
    });
  }, [cadetes, searchTerm, selectedFilters]);

  const handleSelect = (cadete) => {
    onSelect(cadete);
    setSearchTerm(cadete.nombre);
    setShowResults(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, cédula o sección..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          {showResults && filteredCadetes.length > 0 && searchTerm && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {filteredCadetes.slice(0, 10).map((cadete) => (
                <button
                  key={cadete.id}
                  onClick={() => handleSelect(cadete)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center justify-between border-b border-slate-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-slate-800">{cadete.nombre}</p>
                    <p className="text-sm text-slate-500">C.I.: {cadete.cedula} • {cadete.seccion}</p>
                  </div>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded">{cadete.cia}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <select
          value={selectedFilters.cia}
          onChange={(e) => setSelectedFilters({ ...selectedFilters, cia: e.target.value })}
          className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Todas las Compañías</option>
          {companias.map(cia => (
            <option key={cia} value={cia}>{cia}</option>
          ))}
        </select>
        <select
          value={selectedFilters.seccion}
          onChange={(e) => setSelectedFilters({ ...selectedFilters, seccion: e.target.value })}
          className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Todas las Secciones</option>
          {secciones.map(sec => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BuscadorCadetes;

