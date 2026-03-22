import { useState, useEffect, useMemo } from 'react';
import { UserIcon, User, Lock, ClipboardPlus, Users, Activity, AlertTriangle } from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

// Componentes principales
import Sidebar from '../components/disciplina/Sidebar';
import DashboardSection from '../components/disciplina/DashboardSection';
import CadetesSection from '../components/disciplina/CadetesSection';
import RegistrarSection from '../components/disciplina/RegistrarSection';
import HistorialSection from '../components/disciplina/HistorialSection';
import EstadisticasSection from '../components/disciplina/EstadisticasSection';
import ConfigSection from '../components/disciplina/ConfigSection';

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

  // Roles permitidos
  const ROLES_PERMITIDOS = ['Administrador', 'Instructor'];

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const usuarioData = localStorage.getItem('usuario');
        if (usuarioData) {
          const usuario = JSON.parse(usuarioData);
          setOficialActual(usuario);

          if (!ROLES_PERMITIDOS.includes(usuario.rol)) {
            setAccesoRestringido(true);
            setLoading(false);
            return;
          }
        } else {
          navigate('/');
          return;
        }

        // Parallel fetches
        const [accionesData, cadetesData, accionesDisciplinarias] = await Promise.all([
          api.get('/acciones').catch(() => []),
          api.get('/cadetes').catch(() => []),
          api.get('/accionesdisciplinarias').catch(() => [])
        ]);

        setAccionesDefinidas(accionesData);
        setCadetes(cadetesData);
        setAcciones(accionesDisciplinarias);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos. Verifique la conexión.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Refresh event listener
  useEffect(() => {
    const refreshHandler = () => {
      // Re-run fetchData logic
      const fetchData = async () => {
        // ... same as above
      };
      fetchData();
    };
    window.addEventListener('refreshData', refreshHandler);
    return () => window.removeEventListener('refreshData', refreshHandler);
  }, [navigate]);

  // Obtener datos de cadete específico
  const obtenerDatosCadete = async (cadeteId) => {
    try {
      return await api.get(`/acciones/cadete/${cadeteId}`);
    } catch (error) {
      console.error('Error obteniendo datos cadete:', error);
      return null;
    }
  };

  // Seleccionar cadete
  const handleSelectCadete = async (cadete) => {
    setCadeteSeleccionado(cadete);
    const accionesCadete = acciones.filter(a => a.cadeteId === cadete.id);
    
    if (accionesCadete.length === 0) {
      const datosCompletos = await obtenerDatosCadete(cadete.id);
      if (datosCompletos) {
        setCadeteSeleccionado({
          ...cadete,
          acciones: datosCompletos.acciones || [],
          estadisticas: datosCompletos.estadisticas || {}
        });
      }
    }
  };

  // Registrar acción
  const handleRegistrarAccion = async (data) => {
    setLoadingRegistro(true);
    try {
      const fechaObj = new Date(data.fecha);
      const diaSemana = fechaObj.getDay();  // Numeric day (0=Sun)

      const response = await api.post('/acciones/registrar', {
        cadeteId: data.cadeteId,
        codigo: data.codigo,
        observacion: data.observacion,
        ruta_imagen: data.ruta_imagen || null,
        fecha: data.fecha,
        hora: data.hora,
        dia: diaSemana
      });

      // Refresh data
      const [accionesActualizadas, cadetesActualizados] = await Promise.all([
        api.get('/accionesdisciplinarias'),
        api.get('/cadetes')
      ]);
      
      setAcciones(accionesActualizadas);
      setCadetes(cadetesActualizados);

      const cadeteActualizado = cadetesActualizados.find(c => c.id === data.cadeteId);
      if (cadeteActualizado) {
        setCadeteSeleccionado(cadeteActualizado);
      }

      setMensaje({ type: 'success', text: '✅ Acción registrada correctamente' });
      setTimeout(() => setMensaje(null), 5000);
    } catch (apiError) {
      console.error(apiError);
      setMensaje({ type: 'error', text: apiError.response?.data?.error || 'Error al registrar acción' });
      setTimeout(() => setMensaje(null), 5000);
    } finally {
      setLoadingRegistro(false);
    }
  };

  // Acciones por cadete
  const obtenerAccionesCadete = (cadeteId) => acciones.filter(a => a.cadeteId === cadeteId);

  // Estadísticas globales
  const estadisticasGlobales = useMemo(() => {
    const positivas = acciones.filter(a => a.accionDefinida?.tipo === 'Positiva').length;
    const negativas = acciones.filter(a => a.accionDefinida?.tipo === 'Negativa').length;
    return { positivas, negativas, total: acciones.length };
  }, [acciones]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Cargando sistema disciplinario...</p>
        </div>
      </div>
    );
  }

  if (accesoRestringido) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-50">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-xl border border-red-200">
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">Acceso Denegado</h2>
          <p className="text-slate-600 mb-8 text-center">
            Módulo reservado para <strong>Instructores</strong> y <strong>Administradores</strong>.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            Ir al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        rol={oficialActual?.rol} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 p-4.5 sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              
              <h1 className="flex text-2xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent ">
              Control Disciplinario
              </h1>
              <p className="text-slate-500 font-medium">Registro de acciones positivas y negativas</p>
            </div>
            <div className="flex items-center gap-4">
              {oficialActual && (
                <div className="text-sm text-right hidden md:block">
                  <p className="font-semibold text-slate-800">{oficialActual.gradoU} {oficialActual.nombreU}</p>
                  <p className="text-slate-500">{oficialActual.rol}</p>
                </div>
              )}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="px-6 py-4 max-w-7xl mx-auto">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-medium mb-4">
              ⚠️ {error}
            </div>
          )}
          {mensaje && (
            <div className={`p-4 rounded-xl border text-sm font-medium mb-4 ${
              mensaje.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              {mensaje.text}
            </div>
          )}
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 pb-20 max-w-7xl mx-auto w-full">
          {activeSection === 'dashboard' && (
            <DashboardSection
              cadetes={cadetes}
              acciones={acciones}
              estadisticasGlobales={estadisticasGlobales}
              onNewAction={() => setActiveSection('registrar')}
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === 'cadetes' && (
            <CadetesSection
              cadetes={cadetes}
              acciones={acciones}
              onSelectCadete={handleSelectCadete}
              cadeteSeleccionado={cadeteSeleccionado}
              onCloseExpediente={() => setCadeteSeleccionado(null)}
              obtenerAccionesCadete={obtenerAccionesCadete}
            />
          )}

          {activeSection === 'registrar' && (
            <RegistrarSection 
              cadetes={cadetes}
              accionesDefinidas={accionesDefinidas}
              onSelectCadete={handleSelectCadete}
              cadeteSeleccionado={cadeteSeleccionado}
              onCancel={() => setCadeteSeleccionado(null)}
              loadingRegistro={loadingRegistro}
              oficialActual={oficialActual}
              handleRegistrarAccion={handleRegistrarAccion}
            />
          )}

          {activeSection === 'historial' && (
            <HistorialSection acciones={acciones} />
          )}

          {activeSection === 'estadisticas' && (
            <EstadisticasSection cadetes={cadetes} acciones={acciones} />
          )}

          {activeSection === 'configuracion' && (
            <ConfigSection accionesDefinidas={accionesDefinidas} setAccionesDefinidas={setAccionesDefinidas} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Disciplina;

