import { useState, useEffect, useMemo } from 'react';
import { Shield, ClipboardPlus, Users, Award, AlertTriangle, Activity, User, Lock } from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

// Componentes
import Sidebar from '../components/disciplina/Sidebar';
import StatCard from '../components/disciplina/StatCard';
import BuscadorCadetes from '../components/disciplina/BuscadorCadetes';
import FormularioRegistro from '../components/disciplina/FormularioRegistro';
import ExpedienteCadete from '../components/disciplina/ExpedienteCadete';
import PanelEstadisticas from '../components/disciplina/PanelEstadisticas';

// Componente principal
const Disciplina = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [cadetes, setCadetes] = useState([]);
  const [acciones, setAcciones] = useState([]);
  const [accionesDefinidas, setAccionesDefinidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRegistro, setLoadingRegistro] = useState(false);
  const [cadeteSeleccionado, setCadeteSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [oficialActual, setOficialActual] = useState(null);
  const [accesoRestringido, setAccesoRestringido] = useState(false);

  // Roles que pueden acceder al módulo disciplinario
  const ROLES_PERMITIDOS = ['Administrador', 'Instructor'];

  // Cargar datos del backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener usuario actual del localStorage
        const usuarioData = localStorage.getItem('usuario');
        if (usuarioData) {
          const usuario = JSON.parse(usuarioData);
          setOficialActual(usuario);

          // Verificar si el usuario tiene acceso al módulo disciplinario
          if (!ROLES_PERMITIDOS.includes(usuario.rol)) {
            setAccesoRestringido(true);
            setLoading(false);
            return;
          }
        } else {
          // No hay usuario logueado, redirigir al login
          navigate('/');
          return;
        }

        // Obtener acciones definidas del backend
        try {
          const accionesData = await api.get('/acciones');
          if (accionesData && Array.isArray(accionesData) && accionesData.length > 0) {
            setAccionesDefinidas(accionesData);
          } else {
            console.warn('No se encontraron acciones definidas en la base de datos');
          }
        } catch (e) {
          console.error('Error fetching acciones:', e);
        }

        // Obtener cadetes del backend
        try {
          const cadetesData = await api.get('/cadetes');
          if (cadetesData && Array.isArray(cadetesData)) {
            setCadetes(cadetesData);
          }
        } catch (e) {
          console.error('Error fetching cadetes:', e);
        }

        // Obtener acciones disciplinarias del backend
        try {
          const accionesDisciplinarias = await api.get('/accionesdisciplinarias');
          if (accionesDisciplinarias && Array.isArray(accionesDisciplinarias)) {
            setAcciones(accionesDisciplinarias);
          }
        } catch (e) {
          console.error('Error fetching acciones disciplinarias:', e);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error al cargar los datos. Por favor verifique la conexión con el servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Obtener datos de un cadete específico desde el backend
  const obtenerDatosCadete = async (cadeteId) => {
    try {
      const datosCadete = await api.get(`/cadetes/${cadeteId}`);
      return datosCadete;
    } catch (error) {
      console.error('Error al obtener datos del cadete:', error);
      return null;
    }
  };

  // Manejar selección de cadete - cargar datos completos
  const handleSelectCadete = async (cadete) => {
    setCadeteSeleccionado(cadete);

    // Si el cadete tiene acciones en el estado local, usarlas
    // De lo contrario, intentar obtener del backend
    const accionesCadete = acciones.filter(a => a.cadeteId === cadete.id);

    if (accionesCadete.length === 0) {
      const datosCompletos = await obtenerDatosCadete(cadete.id);
      if (datosCompletos) {
        setCadeteSeleccionado({
          ...cadete,
          acciones: datosCompletos.acciones || [],
          estadisticas: datosCompletos.estadisticas
        });
      }
    }
  };

  // Manejar registro de acción
  const handleRegistrarAccion = async (data) => {
    setLoadingRegistro(true);
    try {
      const fechaObj = new Date(data.fecha);

      const diaSemana = fechaObj.toLocaleDateString('es-EC', {
        weekday: 'long'
      });
      // Registrar en el backend con todos los datos (incluyendo fecha, hora y ruta_imagen)
      const response = await api.post('/registroaccion', {
        cadeteId: data.cadeteId,
        codigo: data.codigo,
        observacion: data.observacion,
        ruta_imagen: data.ruta_imagen || null,
        fecha: data.fecha || null,
        hora: data.hora || null,
        dia: diaSemana // 👈 aquí lo envías

      });

      // Recargar acciones desde el backend
      const accionesActualizadas = await api.get('/accionesdisciplinarias');
      if (accionesActualizadas && Array.isArray(accionesActualizadas)) {
        setAcciones(accionesActualizadas);
      }

      // Recargar cadetes para obtener el puntaje actualizado
      const cadetesActualizados = await api.get('/cadetes');
      if (cadetesActualizados && Array.isArray(cadetesActualizados)) {
        setCadetes(cadetesActualizados);
      }

      setMensaje({ type: 'success', text: 'Acción registrada correctamente' });

      // Actualizar el cadete seleccionado con los nuevos datos
      const cadeteActualizado = cadetesActualizados.find(c => c.id === data.cadeteId);
      if (cadeteActualizado) {
        setCadeteSeleccionado(cadeteActualizado);
      }

      setTimeout(() => setMensaje(null), 3000);
    } catch (apiError) {
      console.error('Error al registrar acción:', apiError);
      setMensaje({ type: 'error', text: apiError.message || 'Error al registrar la acción' });
    } finally {
      setLoadingRegistro(false);
    }
  };

  // Obtener acciones de un cadete específico
  const obtenerAccionesCadete = (cadeteId) => {
    return acciones.filter(a => a.cadeteId === cadeteId);
  };

  // Calcular estadísticas globales
  const estadisticasGlobales = useMemo(() => {
    const positivas = acciones.filter(a => a.accionDefinida?.tipo === 'Positiva').length;
    const negativas = acciones.filter(a => a.accionDefinida?.tipo === 'Negativa').length;
    return { positivas, negativas, total: acciones.length };
  }, [acciones]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando datos del sistema disciplinario...</p>
        </div>
      </div>
    );
  }

  // Acceso restringido para usuarios sin permiso
  if (accesoRestringido) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Acceso Restringido</h2>
          <p className="text-slate-600 mb-6">
            No tienes permisos para acceder al módulo de Control Disciplinario.
            Esta sección está reservada para Instructores y Administradores.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Control Disciplinario</h1>
              <p className="text-sm text-slate-500">Escuela Superior de Policía - Primer Año</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">Escuela Superior de Policía</p>
                <p className="text-xs text-slate-500">"GRAL. ALBERTO ENRÍQUEZ GALLO"</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Error message */}
        {error && (
          <div className="mx-4 mt-4 p-4 rounded-lg bg-red-100 text-red-700 border border-red-300">
            {error}
          </div>
        )}

        {/* Mensaje */}
        {mensaje && (
          <div className={`mx-4 mt-4 p-4 rounded-lg ${mensaje.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
            {mensaje.text}
          </div>
        )}

        {/* Contenido principal */}
        <main className="flex-1 overflow-auto p-6">
          {/* Dashboard */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">Panel de Control</h2>
                <button
                  onClick={() => setActiveSection('registrar')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
                >
                  <ClipboardPlus className="w-5 h-5" />
                  Nueva Acción
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Cadetes"
                  value={cadetes.length}
                  icon={Users}
                  color="#007BFF"
                />
                <StatCard
                  title="Acciones Positivas"
                  value={estadisticasGlobales.positivas}
                  icon={Award}
                  color="#22c55e"
                />
                <StatCard
                  title="Acciones Negativas"
                  value={estadisticasGlobales.negativas}
                  icon={AlertTriangle}
                  color="#ef4444"
                />
                <StatCard
                  title="Balance General"
                  value={`${estadisticasGlobales.negativas > 0 ? ((estadisticasGlobales.positivas / estadisticasGlobales.negativas) * 100).toFixed(0) : 100}%`}
                  icon={Activity}
                  color="#8b5cf6"
                />
              </div>

              {/* Vista rápida de cadetes */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-slate-800 mb-4">Cadetes Recientes</h3>
                {cadetes.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay cadetes registrados</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cadetes.slice(0, 6).map((cadete) => {
                      const accionesCadete = obtenerAccionesCadete(cadete.id);
                      const positivas = accionesCadete.filter(a => a.accionDefinida?.tipo === 'Positiva').length;
                      const negativas = accionesCadete.filter(a => a.accionDefinida?.tipo === 'Negativa').length;

                      return (
                        <div
                          key={cadete.id}
                          onClick={() => {
                            handleSelectCadete(cadete);
                            setActiveSection('cadetes');
                          }}
                          className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-800 truncate">{cadete.nombre}</h4>
                            <span className="text-xs bg-slate-100 px-2 py-1 rounded">{cadete.cia}</span>
                          </div>
                          <p className="text-sm text-slate-500 mb-3">{cadete.seccion} • {cadete.cedula}</p>
                          <div className="flex gap-4 text-sm">
                            <span className="text-green-600 flex items-center gap-1">
                              <Award className="w-4 h-4" /> {positivas}
                            </span>
                            <span className="text-red-600 flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4" /> {negativas}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sección de Cadetes */}
          {activeSection === 'cadetes' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800">Consulta de Cadetes</h2>

              <BuscadorCadetes
                onSelect={(cadete) => handleSelectCadete(cadete)}
                cadetes={cadetes}
              />

              {cadeteSeleccionado ? (
                <ExpedienteCadete
                  cadete={cadeteSeleccionado}
                  acciones={obtenerAccionesCadete(cadeteSeleccionado.id)}
                  onClose={() => setCadeteSeleccionado(null)}
                />
              ) : (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg">Seleccione un cadete para ver su expediente disciplinario</p>
                </div>
              )}
            </div>
          )}

          {/* Sección de Registro */}
          {activeSection === 'registrar' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800">Registrar Acción Disciplinaria</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-slate-700 mb-3">Buscar Cadete</h3>
                  <BuscadorCadetes
                    onSelect={(cadete) => handleSelectCadete(cadete)}
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
                  onCancel={() => {
                    setCadeteSeleccionado(null);
                  }}
                  loading={loadingRegistro}
                  oficialActual={oficialActual}
                />
              </div>
            </div>
          )}

          {/* Sección de Historial */}
          {activeSection === 'historial' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800">Historial General de Acciones</h2>
              {acciones.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <Activity className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg">No hay acciones disciplinarias registradas</p>
                </div>
              ) : (
                <ExpedienteCadete
                  cadete={{ nombre: 'Todos los Cadetes', cia: '-', seccion: '-', edad: '-', genero: '-' }}
                  acciones={acciones}
                  onClose={() => { }}
                />
              )}
            </div>
          )}

          {/* Sección de Estadísticas */}
          {activeSection === 'estadisticas' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800">Estadísticas Generales</h2>
              <PanelEstadisticas
                cadetes={cadetes}
                acciones={acciones}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Disciplina;

