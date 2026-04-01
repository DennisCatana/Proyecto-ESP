import { useState, useEffect, useMemo } from 'react';
import { UserIcon, Lock } from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../components/disciplina/Sidebar';
import DashboardSection from '../components/disciplina/DashboardSection';
import CadetesSection from '../components/disciplina/CadetesSection';
import RegistrarSection from '../components/disciplina/RegistrarSection';
import HistorialSection from '../components/disciplina/HistorialSection';
import EstadisticasSection from '../components/disciplina/EstadisticasSection';
import ConfigSection from '../components/disciplina/ConfigSection';
import MiPerfilSection from '../components/disciplina/MiPerfilSection';

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const ROLES_STAFF = ['Administrador', 'Instructor'];
  const ROLES_PERMITIDOS = ['Administrador', 'Instructor', 'Alumno'];

  const fetchAllData = async () => {
    const [accionesData, cadetesData, accionesDisciplinarias] = await Promise.all([
      api.get('/acciones').catch(() => []),
      api.get('/cadetes').catch(() => []),
      api.get('/accionesdisciplinarias').catch(() => [])
    ]);
    setAccionesDefinidas(accionesData);
    setCadetes(cadetesData);
    setAcciones(accionesDisciplinarias);
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setError(null);

        const usuarioData = localStorage.getItem('usuario');
        if (!usuarioData) {
          navigate('/');
          return;
        }

        const usuario = JSON.parse(usuarioData);
        setOficialActual(usuario);

        if (!ROLES_PERMITIDOS.includes(usuario.rol)) {
          setAccesoRestringido(true);
          setLoading(false);
          return;
        }

        // Alumno solo necesita acciones definidas (para mi perfil)
        if (usuario.rol === 'Alumno') {
          setActiveSection('miPerfil');
          setLoading(false);
          return;
        }

        await fetchAllData();
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos. Verifique la conexión.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [navigate]);

  useEffect(() => {
    const refreshHandler = async () => {
      try {
        await fetchAllData();
      } catch (err) {
        console.error('Error refreshing data:', err);
      }
    };
    window.addEventListener('refreshData', refreshHandler);
    return () => window.removeEventListener('refreshData', refreshHandler);
  }, []);

  const obtenerDatosCadete = async (cadeteId) => {
    try {
      return await api.get(`/acciones/${cadeteId}`);
    } catch (error) {
      console.error('Error obteniendo datos cadete:', error);
      return null;
    }
  };

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

  const handleRegistrarAccion = async (data) => {
    setLoadingRegistro(true);
    try {
      await api.post('/registroaccion', {
        cadeteId: data.cadeteId,
        codigo: data.codigo,
        observacion: data.observacion,
        ruta_imagen: data.ruta_imagen || null,
        fecha: data.fecha,
        hora: data.hora,
      });

      const [accionesActualizadas, cadetesActualizados] = await Promise.all([
        api.get('/accionesdisciplinarias'),
        api.get('/cadetes')
      ]);

      setAcciones(accionesActualizadas);
      setCadetes(cadetesActualizados);

      const cadeteActualizado = cadetesActualizados.find(c => c.id === data.cadeteId);
      if (cadeteActualizado) setCadeteSeleccionado(cadeteActualizado);

      setMensaje({ type: 'success', text: '✅ Acción registrada correctamente' });
      setTimeout(() => setMensaje(null), 5000);
    } catch (apiError) {
      console.error(apiError);
      setMensaje({ type: 'error', text: apiError.message || 'Error al registrar acción' });
      setTimeout(() => setMensaje(null), 5000);
    } finally {
      setLoadingRegistro(false);
    }
  };

  const obtenerAccionesCadete = (cadeteId) => acciones.filter(a => a.cadeteId === cadeteId);

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
            No tienes permisos para acceder a este módulo.
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

  const esAlumno = oficialActual?.rol === 'Alumno';

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        rol={oficialActual?.rol}
        collapsed={isSidebarCollapsed}
        setCollapsed={setIsSidebarCollapsed}
      />

      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-20' : 'ml-72'
      }`}>
        {/* HEADER */}
        <header className={`fixed top-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100/50 h-[5.5rem] transition-all duration-300 ${
          isSidebarCollapsed ? 'left-20' : 'left-72'
        }`}>
          <div className="h-full flex items-center px-4 lg:px-6">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center group">
                <div className="group-hover:scale-105 transition-transform duration-300">
                  <h1 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent leading-tight">
                    CONTROL DISCIPLINARIO
                  </h1>
                  <p className="text-sm lg:text-base text-slate-500 font-medium tracking-wide -mt-1">
                    {esAlumno ? 'Mi Perfil Disciplinario' : 'Registro de Acciones Positivas y Negativas'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {oficialActual && (
                  <div className="text-right hidden md:flex flex-col items-end gap-0.5 pr-4 border-r border-slate-200">
                    <p className="font-bold text-slate-900 text-sm lg:text-base leading-tight">
                      {oficialActual.gradoU}. {oficialActual.nombreU}
                    </p>
                    <p className="text-xs lg:text-sm text-slate-500 font-medium tracking-wide">
                      {oficialActual.rol}
                    </p>
                  </div>
                )}
                <div className="relative group">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 cursor-pointer border-4 border-white/50">
                    <UserIcon className="w-7 h-7 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="px-6 pt-24 pb-2">
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
        <main className="flex-1 overflow-y-auto p-6 pt-4 pb-20">
          {activeSection === 'miPerfil' && (
            <MiPerfilSection oficialActual={oficialActual} />
          )}

          {activeSection === 'dashboard' && !esAlumno && (
            <DashboardSection
              cadetes={cadetes}
              acciones={acciones}
              estadisticasGlobales={estadisticasGlobales}
              onNewAction={() => setActiveSection('registrar')}
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === 'cadetes' && !esAlumno && (
            <CadetesSection
              cadetes={cadetes}
              acciones={acciones}
              onSelectCadete={handleSelectCadete}
              cadeteSeleccionado={cadeteSeleccionado}
              onCloseExpediente={() => setCadeteSeleccionado(null)}
              obtenerAccionesCadete={obtenerAccionesCadete}
            />
          )}

          {activeSection === 'registrar' && !esAlumno && (
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

          {activeSection === 'historial' && !esAlumno && (
            <HistorialSection acciones={acciones} cadetes={cadetes} />
          )}

          {activeSection === 'estadisticas' && !esAlumno && (
            <EstadisticasSection cadetes={cadetes} acciones={acciones} />
          )}

          {activeSection === 'configuracion' && oficialActual?.rol === 'Administrador' && (
            <ConfigSection accionesDefinidas={accionesDefinidas} setAccionesDefinidas={setAccionesDefinidas} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Disciplina;
