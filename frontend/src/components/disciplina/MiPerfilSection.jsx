import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  Shield, Award, AlertTriangle, Edit3, Save, X, Phone, Mail,
  MapPin, Users, Building2, Calendar, User, Activity, CheckCircle, AlertCircle
} from 'lucide-react';

const MiPerfilSection = ({ oficialActual }) => {
  const [cadete, setCadete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [formData, setFormData] = useState({
    correo: '',
    telefono: '',
    numero_emergencia: '',
    parentesco: '',
    lugar_residencia: ''
  });

  useEffect(() => {
    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get('/cadetes/mi-perfil');
      setCadete(data);
      setFormData({
        correo: data.correo || '',
        telefono: data.telefono || '',
        numero_emergencia: data.numero_emergencia || '',
        parentesco: data.parentesco || '',
        lugar_residencia: data.lugar_residencia || ''
      });
    } catch (err) {
      setError(err.message || 'No tienes un expediente de cadete vinculado a tu cuenta.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      const actualizado = await api.put('/cadetes/mi-perfil', formData);
      setCadete(prev => ({ ...prev, ...actualizado }));
      setEditando(false);
      setMensaje({ type: 'success', text: 'Datos actualizados correctamente.' });
      setTimeout(() => setMensaje(null), 4000);
    } catch (err) {
      setMensaje({ type: 'error', text: err.message || 'Error al actualizar datos.' });
      setTimeout(() => setMensaje(null), 4000);
    } finally {
      setGuardando(false);
    }
  };

  const handleCancelar = () => {
    setFormData({
      correo: cadete.correo || '',
      telefono: cadete.telefono || '',
      numero_emergencia: cadete.numero_emergencia || '',
      parentesco: cadete.parentesco || '',
      lugar_residencia: cadete.lugar_residencia || ''
    });
    setEditando(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600 mx-auto mb-3"></div>
          <p className="text-slate-500 text-sm">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Sin expediente vinculado</h3>
          <p className="text-red-600 text-sm">{error}</p>
          <p className="text-slate-500 text-sm mt-3">
            Contacta al administrador para vincular tu cuenta a un expediente de cadete.
          </p>
        </div>
      </div>
    );
  }

  if (!cadete) return null;

  const positivas = cadete.estadisticas?.positivas ?? 0;
  const negativas = cadete.estadisticas?.negativas ?? 0;
  const balance = parseFloat(cadete.puntajeTotal || 0);
  const accionesOrdenadas = [...(cadete.acciones || [])].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Mi Perfil Disciplinario</h2>
        {!editando ? (
          <button
            onClick={() => setEditando(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            <Edit3 className="w-4 h-4" />
            Editar Datos de Contacto
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancelar}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition text-sm font-medium"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              disabled={guardando}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {guardando ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        )}
      </div>

      {mensaje && (
        <div className={`p-4 rounded-xl border text-sm font-medium flex items-center gap-2 ${
          mensaje.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {mensaje.type === 'success'
            ? <CheckCircle className="w-5 h-5 shrink-0" />
            : <AlertCircle className="w-5 h-5 shrink-0" />}
          {mensaje.text}
        </div>
      )}

      {/* Encabezado del cadete */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
            <Shield className="w-10 h-10" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold">{cadete.nombre}</h3>
            <p className="text-blue-200 text-sm mt-0.5">C.I.: {cadete.cedula}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-sm">
                <Users className="w-4 h-4" /> {cadete.cia}
              </span>
              <span className="flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-sm">
                <Building2 className="w-4 h-4" /> Sección: {cadete.seccion}
              </span>
              <span className="flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-sm">
                <Award className="w-4 h-4" /> Promoción: {cadete.promocion}
              </span>
              <span className="flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-sm">
                <User className="w-4 h-4" /> {cadete.genero === 'M' ? 'Masculino' : cadete.genero === 'F' ? 'Femenino' : 'Sin especificar'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas disciplinarias */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500">
          <p className="text-xs text-slate-500 uppercase font-medium mb-1">Acciones Positivas</p>
          <p className="text-3xl font-bold text-green-600">{positivas}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-red-500">
          <p className="text-xs text-slate-500 uppercase font-medium mb-1">Acciones Negativas</p>
          <p className="text-3xl font-bold text-red-600">{negativas}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-slate-500 uppercase font-medium mb-1">Total Acciones</p>
          <p className="text-3xl font-bold text-blue-600">{positivas + negativas}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500">
          <p className="text-xs text-slate-500 uppercase font-medium mb-1">Balance</p>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {balance >= 0 ? '+' : ''}{parseFloat(balance).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datos generales */}
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
          <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide border-b pb-2">Datos Generales</h4>
          <InfoRow label="Habitación" value={cadete.habitacion || 'No asignada'} />
          <InfoRow label="Grupo Guardia" value={cadete.grupo_guardia || 'No asignado'} />
          <InfoRow label="Antigüedad" value={cadete.antiguedad ? `#${cadete.antiguedad}` : 'No registrada'} />
          {cadete.fecha_nacimiento && (
            <InfoRow
              label="Fecha de Nacimiento"
              value={new Date(cadete.fecha_nacimiento).toLocaleDateString('es-EC')}
            />
          )}
          <InfoRow label="Lugar de Nacimiento" value={cadete.lugar_nacimiento || 'No registrado'} />
          {cadete.seguro_medico && (
            <InfoRow label="Seguro Médico" value={cadete.seguro_medico} />
          )}
        </div>

        {/* Datos de contacto (editables) */}
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
          <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide border-b pb-2">
            Datos de Contacto
            {editando && <span className="ml-2 text-blue-500 font-normal text-xs">(editando)</span>}
          </h4>

          {editando ? (
            <div className="space-y-3">
              <EditField
                icon={<Mail className="w-4 h-4 text-slate-400" />}
                label="Correo Electrónico"
                value={formData.correo}
                onChange={v => setFormData(p => ({ ...p, correo: v }))}
                type="email"
              />
              <EditField
                icon={<Phone className="w-4 h-4 text-slate-400" />}
                label="Teléfono"
                value={formData.telefono}
                onChange={v => setFormData(p => ({ ...p, telefono: v }))}
              />
              <EditField
                icon={<MapPin className="w-4 h-4 text-slate-400" />}
                label="Lugar de Residencia"
                value={formData.lugar_residencia}
                onChange={v => setFormData(p => ({ ...p, lugar_residencia: v }))}
              />
              <EditField
                icon={<Phone className="w-4 h-4 text-slate-400" />}
                label="Número de Emergencia"
                value={formData.numero_emergencia}
                onChange={v => setFormData(p => ({ ...p, numero_emergencia: v }))}
              />
              <EditField
                icon={<User className="w-4 h-4 text-slate-400" />}
                label="Parentesco (contacto emergencia)"
                value={formData.parentesco}
                onChange={v => setFormData(p => ({ ...p, parentesco: v }))}
              />
            </div>
          ) : (
            <>
              <InfoRow icon={<Mail className="w-4 h-4 text-slate-400" />} label="Correo" value={cadete.correo || 'No registrado'} />
              <InfoRow icon={<Phone className="w-4 h-4 text-slate-400" />} label="Teléfono" value={cadete.telefono || 'No registrado'} />
              <InfoRow icon={<MapPin className="w-4 h-4 text-slate-400" />} label="Residencia" value={cadete.lugar_residencia || 'No registrada'} />
              <InfoRow label="Emergencia" value={
                cadete.numero_emergencia
                  ? `${cadete.numero_emergencia}${cadete.parentesco ? ` (${cadete.parentesco})` : ''}`
                  : 'No registrado'
              } />
            </>
          )}
        </div>
      </div>

      {/* Historial de acciones */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide border-b pb-3 mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Mis Acciones Disciplinarias ({accionesOrdenadas.length})
        </h4>

        {accionesOrdenadas.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <Activity className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p>No tienes acciones disciplinarias registradas.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-3 py-2 font-semibold text-slate-600">Fecha</th>
                  <th className="px-3 py-2 font-semibold text-slate-600">Tipo</th>
                  <th className="px-3 py-2 font-semibold text-slate-600">Acción</th>
                  <th className="px-3 py-2 font-semibold text-slate-600">Observación</th>
                  <th className="px-3 py-2 font-semibold text-slate-600 text-right">Puntaje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {accionesOrdenadas.map((accion, idx) => {
                  const esPositiva = accion.accionDefinida?.tipo === 'Positiva';
                  const puntaje = parseFloat(accion.puntajeAplicado || 0);
                  return (
                    <tr key={idx} className={`${esPositiva ? 'hover:bg-green-50' : 'hover:bg-red-50'} transition`}>
                      <td className="px-3 py-3 text-slate-600 whitespace-nowrap">
                        {new Date(accion.fecha).toLocaleDateString('es-EC')}
                      </td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          esPositiva
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {esPositiva ? <Award className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                          {esPositiva ? 'Positiva' : 'Negativa'}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <p className="font-medium text-slate-800">{accion.accionDefinida?.titulo || '-'}</p>
                        <p className="text-xs text-slate-500">{accion.accionDefinida?.codigo}</p>
                      </td>
                      <td className="px-3 py-3 text-slate-600 max-w-xs truncate">
                        {accion.observacion || accion.accionDefinida?.descripcion || '-'}
                      </td>
                      <td className={`px-3 py-3 text-right font-bold ${esPositiva ? 'text-green-600' : 'text-red-600'}`}>
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
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-2 text-sm">
    {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
    <div className="flex justify-between w-full gap-2">
      <span className="text-slate-500 shrink-0">{label}:</span>
      <span className="font-medium text-slate-800 text-right">{value}</span>
    </div>
  </div>
);

const EditField = ({ icon, label, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-xs text-slate-500 mb-1">{label}</label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full border border-slate-300 rounded-lg py-2 pr-3 ${icon ? 'pl-9' : 'pl-3'} text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
      />
    </div>
  </div>
);

export default MiPerfilSection;
