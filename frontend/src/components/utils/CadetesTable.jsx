import { useState, useEffect } from 'react';
import { api } from '../../services/api';

/**
 * Componente para mostrar la lista de cadetes en una tabla
 * Utiliza el endpoint GET /api/cadetes del backend
 * 
 * @param {boolean} showActions - Mostrar columna de acciones (pendiente de implementar)
 * @param {function} onEdit - Función callback para editar cadete
 */
const CadetesTable = ({ showActions = false, onEdit = null }) => {
  const [cadetes, setCadetes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch cadetes desde la API
  useEffect(() => {
    fetchCadetes();
  }, []);

  const fetchCadetes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get('/cadetes');
      setCadetes(data);
    } catch (err) {
      console.error('Error fetching cadetes:', err);
      setError(err.message || 'Error al cargar los cadetes');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar cadetes por término de búsqueda
  const filteredCadetes = cadetes.filter(cadete =>
    cadete.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cadete.cedula?.includes(searchTerm) ||
    cadete.cia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cadete.seccion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Estado badge
  const EstadoBadge = ({ activo }) => (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
      activo 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {activo ? 'Activo' : 'Inactivo'}
    </span>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando cadetes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-700">{error}</p>
        </div>
        <button 
          onClick={fetchCadetes}
          className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Buscador */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre, cédula, compañía o sección..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg 
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cédula
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compañía
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sección
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Promo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Puntaje
              </th>
              {showActions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCadetes.length === 0 ? (
              <tr>
                <td colSpan={showActions ? 9 : 8} className="px-6 py-8 text-center text-gray-500">
                  {searchTerm ? 'No se encontraron cadetes con ese criterio' : 'No hay cadetes registrados'}
                </td>
              </tr>
            ) : (
              filteredCadetes.map((cadete, index) => (
                <tr key={cadete.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{cadete.nombre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cadete.cedula}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cadete.cia}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cadete.seccion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cadete.promocion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <EstadoBadge activo={cadete.estado} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      cadete.puntajeTotal > 0 ? 'text-green-600' : 
                      cadete.puntajeTotal < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {cadete.puntajeTotal || 0}
                    </span>
                  </td>
                  {showActions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(cadete)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Editar
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer con total */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Total de cadetes: <strong>{filteredCadetes.length}</strong>
          {searchTerm && ` (de ${cadetes.length} totales)`}
        </p>
      </div>
    </div>
  );
};

export default CadetesTable;

