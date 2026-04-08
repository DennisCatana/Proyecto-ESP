import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit, Trash2, Users, User, FileText, UploadCloud, ShieldCheck, GraduationCap, UserCog } from 'lucide-react';

// ──────────────────────────────────────────────────────────────────
// Definición de campos alineada con el schema.prisma
// required:true  → campo obligatorio siempre
// createOnly:true → obligatorio al crear, opcional al editar
// ──────────────────────────────────────────────────────────────────

const CADETE_FIELDS = [
  // ── Datos principales ──────────────────────────────────────────
  { name: 'nombre',    label: 'Nombre completo',    type: 'text',   required: true  },
  { name: 'cedula',    label: 'Cédula',             type: 'text',   required: true  },
  { name: 'correo',    label: 'Correo electrónico', type: 'email',  createOnly: true },
  { name: 'genero',    label: 'Género',             type: 'select', options: ['M', 'F'] },
  // ── Información académica ───────────────────────────────────────
  { name: 'promocion', label: 'Promoción',          type: 'text',   required: true  },
  { name: 'cia',       label: 'Compañía',           type: 'text',   required: true  },
  { name: 'seccion',   label: 'Sección',            type: 'text',   required: true  },
  { name: 'habitacion',     label: 'Habitación',       type: 'text' },
  { name: 'grupo_guardia',  label: 'Grupo de Guardia', type: 'text' },
  { name: 'antiguedad',     label: 'Antigüedad (años)', type: 'number' },
  // ── Datos de contacto ──────────────────────────────────────────
  { name: 'telefono',          label: 'Teléfono',         type: 'text' },
  { name: 'numero_emergencia', label: 'N° Emergencias',   type: 'text' },
  { name: 'parentesco',        label: 'Parentesco',       type: 'text' },
  // ── Datos adicionales ──────────────────────────────────────────
  { name: 'fecha_nacimiento',  label: 'Fecha Nacimiento', type: 'date' },
  { name: 'lugar_nacimiento',  label: 'Lugar Nacimiento', type: 'text' },
  { name: 'lugar_residencia',  label: 'Lugar Residencia', type: 'text' },
  { name: 'seguro_medico',     label: 'Seguro Médico',    type: 'text' },
];

const INSTRUCTOR_FIELDS = [
  { name: 'nombre',       label: 'Nombre completo', type: 'text',   required: true                     },
  { name: 'cedula',       label: 'Cédula',          type: 'text',   required: true                     },
  // correo pertenece a Usuario — solo visible al crear
  { name: 'correo',       label: 'Correo',          type: 'email',  createOnly: true, required: true   },
  { name: 'grado',        label: 'Grado',           type: 'select',
    options: ['SBTE', 'TNTE', 'CPTN', 'MYR', 'TCNL', 'CRNL']                                          },
  { name: 'especialidad', label: 'Especialidad',    type: 'text'                                       },
  { name: 'telefono',     label: 'Teléfono',        type: 'text'                                       },
];

const ADMIN_FIELDS = [
  { name: 'nombre',          label: 'Nombre completo',    type: 'text',     required: true             },
  // correo y password pertenecen a Usuario — solo visibles al crear
  { name: 'correo',          label: 'Correo',             type: 'email',    createOnly: true, required: true },
  { name: 'passwordInicial', label: 'Contraseña inicial', type: 'password', createOnly: true, required: true },
];

const ACCION_FIELDS = [
  { name: 'codigo',      label: 'Código',      type: 'text',     required: true },
  { name: 'titulo',      label: 'Título',      type: 'text',     required: true },
  { name: 'puntaje',     label: 'Puntaje',     type: 'number',   required: true },
  { name: 'descripcion', label: 'Descripción', type: 'textarea'                 },
];

// Convierte valores del objeto para mostrarlos correctamente en el formulario
const getFormValue = (field, formData) => {
  const val = formData[field.name];
  if (val === null || val === undefined) return '';
  if (field.type === 'date') {
    // Fecha puede venir como ISO string "2000-01-15T00:00:00.000Z" → "2000-01-15"
    if (typeof val === 'string') return val.split('T')[0];
    if (val instanceof Date)     return val.toISOString().split('T')[0];
    return '';
  }
  return String(val);
};

const ConfigSection = () => {
  const [activeTab, setActiveTab]         = useState('usuarios');
  const [subTabUsuario, setSubTabUsuario] = useState('cadete');
  const [subTabAccion, setSubTabAccion]   = useState('Positiva');

  const [cadetes,         setCadetes]         = useState([]);
  const [instructores,    setInstructores]    = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [accionesPos,     setAccionesPos]     = useState([]);
  const [accionesNeg,     setAccionesNeg]     = useState([]);

  const [loading,     setLoading]     = useState(false);
  const [editing,     setEditing]     = useState(null);
  const [formData,    setFormData]    = useState({});
  const [uploadFile,  setUploadFile]  = useState(null);
  const [uploading,   setUploading]   = useState(false);
  const [successMsg,  setSuccessMsg]  = useState('');
  const [errorMsg,    setErrorMsg]    = useState('');

  useEffect(() => {
    loadData();
    setEditing(null);
    setFormData({});
  }, [activeTab, subTabUsuario, subTabAccion]);

  const showMsg = (text, isError = false) => {
    if (isError) { setErrorMsg(text); setSuccessMsg(''); }
    else          { setSuccessMsg(text); setErrorMsg(''); }
    setTimeout(() => { setSuccessMsg(''); setErrorMsg(''); }, 3500);
  };

  const fetchCurrentData = async () => {
    if (activeTab === 'usuarios') {
      if (subTabUsuario === 'cadete') {
        setCadetes(await api.get('/cadetes'));
      } else if (subTabUsuario === 'instructor') {
        setInstructores(await api.get('/usuarios/instructores'));
      } else {
        setAdministradores(await api.get('/usuarios/administradores'));
      }
    } else {
      const data = await api.get('/acciones');
      setAccionesPos(data.filter(a => a.tipo === 'Positiva'));
      setAccionesNeg(data.filter(a => a.tipo === 'Negativa'));
    }
  };

  // Carga inicial — muestra spinner
  const loadData = async () => {
    setLoading(true);
    try {
      await fetchCurrentData();
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Refresco silencioso tras guardar — sin spinner, la lista se actualiza en segundo plano
  const refreshSilent = () => {
    fetchCurrentData().catch(err => console.error('Error refreshing:', err));
    window.dispatchEvent(new CustomEvent('refreshData'));
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveItem = async () => {
    try {
      if (activeTab === 'usuarios') {
        if (subTabUsuario === 'cadete') {
          const { nombre, cedula, correo, promocion, cia, seccion } = formData;

          if (editing) {
            // Al editar, solo se requieren los campos de identidad
            if (!nombre || !cedula || !promocion || !cia || !seccion)
              return showMsg('Faltan campos obligatorios: Nombre, Cédula, Promoción, Compañía y Sección', true);

            // Enviar solo los campos editables (no enviar id, puntajeTotal, etc.)
            const { id, puntajeTotal, estado, createdAt, updatedAt, ...camposEditables } = formData;
            await api.put(`/cadetes/${editing.id}`, camposEditables);
            showMsg('Cadete actualizado correctamente');
          } else {
            // Al crear, correo es obligatorio (se usa para la cuenta de usuario)
            if (!nombre || !cedula || !correo || !promocion || !cia || !seccion)
              return showMsg('Faltan campos obligatorios: Nombre, Cédula, Correo, Promoción, Compañía y Sección', true);
            await api.post('/cadetes', formData);
            showMsg('Cadete registrado correctamente');
          }

        } else if (subTabUsuario === 'instructor') {
          const { nombre, cedula, correo } = formData;

          if (editing) {
            if (!nombre || !cedula)
              return showMsg('Nombre y cédula son obligatorios', true);
            const { id, usuarioId, estado, createdAt, updatedAt, usuario, ...camposEditables } = formData;
            await api.put(`/instructores/${editing.id}`, camposEditables);
            showMsg('Instructor actualizado correctamente');
          } else {
            if (!nombre || !cedula || !correo)
              return showMsg('Nombre, cédula y correo son obligatorios', true);
            await api.post('/usuarios/instructor', formData);
            showMsg('Instructor registrado correctamente');
          }

        } else {
          const { nombre, correo, passwordInicial } = formData;

          if (editing) {
            if (!nombre)
              return showMsg('El nombre es obligatorio', true);
            await api.put(`/administradores/${editing.id}`, { nombre });
            showMsg('Administrador actualizado correctamente');
          } else {
            if (!nombre || !correo || !passwordInicial)
              return showMsg('Nombre, correo y contraseña inicial son obligatorios', true);
            await api.post('/usuarios/administrador', formData);
            showMsg('Administrador registrado correctamente');
          }
        }

      } else {
        const payload = { ...formData, tipo: subTabAccion };
        const { codigo, titulo, puntaje } = payload;
        if (!codigo || !titulo || puntaje == null || puntaje === '')
          return showMsg('Código, título y puntaje son obligatorios', true);

        // Enviar solo campos relevantes (limpiar campos internos del objeto)
        const payloadLimpio = {
          codigo:      payload.codigo,
          titulo:      payload.titulo,
          descripcion: payload.descripcion || '',
          tipo:        payload.tipo,
          puntaje:     Number(payload.puntaje),
          ...(editing && payload.activa !== undefined ? { activa: payload.activa } : {}),
        };

        if (editing) {
          await api.put(`/accionesdefinidas/${editing.id}`, payloadLimpio);
          showMsg('Acción actualizada correctamente');
        } else {
          await api.post('/accionesdefinidas', payloadLimpio);
          showMsg(`Acción ${subTabAccion === 'Positiva' ? 'positiva' : 'negativa'} creada correctamente`);
        }
      }

      setEditing(null);
      setFormData({});
      refreshSilent();
    } catch (err) {
      showMsg(err.message || 'Error al guardar', true);
    }
  };

  const deleteItem = async (item) => {
    if (!confirm('¿Confirmar eliminación?')) return;
    try {
      if (activeTab === 'usuarios') {
        if (subTabUsuario === 'cadete') {
          await api.delete(`/cadetes/${item.id}`);
        } else {
          const uid = item.usuarioId || item.usuario?.id;
          await api.delete(`/usuarios/${uid}`);
        }
      } else {
        await api.delete(`/accionesdefinidas/${item.id}`);
      }
      refreshSilent();
      showMsg('Eliminado correctamente');
    } catch (err) {
      showMsg('Error al eliminar: ' + err.message, true);
    }
  };

  const deleteAll = async () => {
  const confirmMsg = `¿Confirmar eliminación de TODOS los ${dataList.length} registros? ESTA ACCIÓN NO SE PUEDE DESHACER.`;
  if (!confirm(confirmMsg)) return;
  try {
    let endpoint;
    if (activeTab === 'usuarios') {
      if (subTabUsuario === 'cadete')           endpoint = '/cadetes/eliminar-todos';
      else if (subTabUsuario === 'instructor')  endpoint = '/instructores/eliminar-todos';
      else                                      endpoint = '/administradores/eliminar-todos';
    } else {
      endpoint = '/accionesdefinidas/all';
    }
    await api.delete(endpoint);
    refreshSilent();
    showMsg('Todos los registros eliminados correctamente');
  } catch (err) {
    showMsg('Error al eliminar todos: ' + err.message, true);
  }
};


  const editItem = (item) => {
    setEditing(item);
    setFormData(item);
  };

  const handleBulkUpload = async () => {
    if (!uploadFile) return;

    let endpoint;
    let label;
    if (activeTab === 'usuarios') {
      if (subTabUsuario === 'cadete') {
        endpoint = '/cadetes/bulk-upload';
        label = 'cadetes';
      } else if (subTabUsuario === 'instructor') {
        endpoint = '/instructores/bulk-upload';
        label = 'instructores';
      } else {
        return showMsg('Carga masiva no disponible para administradores', true);
      }
    } else {
      endpoint = `/accionesdefinidas/bulk-upload?tipo=${subTabAccion}`;
      label = 'acciones';
    }

    setUploading(true);
    try {
      const result = await api.upload(endpoint, uploadFile, 'files');
      const count     = result.count ?? 0;
      const omitidas  = result.omitidas ?? 0;
      const filtradas = result.filtradas ?? 0;
      const errCount  = result.errores?.length ?? 0;

      const columnas = result.columnas ? `Columnas detectadas: ${result.columnas.join(', ')}` : '';
      if (count === 0 && errCount === 0 && omitidas === 0 && filtradas === 0) {
        showMsg(`El archivo no contiene filas con datos válidos. ${columnas}`, true);
      } else if (count === 0 && filtradas > 0 && omitidas === 0) {
        showMsg(`${filtradas} fila(s) con datos incompletos — ninguna insertada. ${columnas}`, true);
      } else if (count === 0 && omitidas > 0) {
        showMsg(`Todos los registros del archivo ya existen en el sistema (${omitidas} omitidos)`);
      } else {
        let msg = `${count} ${label} cargados correctamente`;
        if (omitidas > 0) msg += ` · ${omitidas} ya existían (omitidos)`;
        if (filtradas > 0) msg += ` · ${filtradas} filas ignoradas por datos incompletos`;
        if (errCount > 0) msg += ` · ${errCount} con error`;
        showMsg(msg, errCount > 0);
      }
      refreshSilent();
    } catch (err) {
      showMsg('Error: ' + err.message, true);
    } finally {
      setUploading(false);
      setUploadFile(null);
      const input = document.getElementById(uploadId);
      if (input) input.value = '';
    }
  };

  const getActiveFields = () => {
    if (activeTab === 'usuarios') {
      if (subTabUsuario === 'cadete')       return CADETE_FIELDS;
      if (subTabUsuario === 'instructor')   return INSTRUCTOR_FIELDS;
      return ADMIN_FIELDS;
    }
    return ACCION_FIELDS;
  };

  const getDataList = () => {
    if (activeTab === 'usuarios') {
      if (subTabUsuario === 'cadete')       return cadetes;
      if (subTabUsuario === 'instructor')   return instructores;
      return administradores;
    }
    return subTabAccion === 'Positiva' ? accionesPos : accionesNeg;
  };

  const getTableConfig = () => {
    if (activeTab === 'usuarios') {
      if (subTabUsuario === 'cadete') return {
        headers: ['Nombre', 'Cédula', 'Compañía', 'Sección', 'Puntaje'],
        row: (item) => [item.nombre, item.cedula, item.cia, item.seccion, item.puntajeTotal],
      };
      if (subTabUsuario === 'instructor') return {
        headers: ['Nombre', 'Cédula', 'Grado', 'Especialidad', 'Correo'],
        row: (item) => [item.nombre, item.cedula, item.grado || '-', item.especialidad || '-', item.usuario?.correo || '-'],
      };
      return {
        headers: ['Nombre', 'Correo', 'Estado'],
        row: (item) => [item.nombre, item.usuario?.correo || '-', item.estado ? 'Activo' : 'Inactivo'],
      };
    }
    return {
      headers: ['Código', 'Título', 'Puntaje', 'Descripción'],
      row: (item) => [item.codigo, item.titulo, item.puntaje, item.descripcion?.slice(0, 50) || '-'],
    };
  };

  // Todos los sub-tabs tienen edición
  const canEdit = true;

  const tableConfig = getTableConfig();
  const dataList    = getDataList();

  const formTitle = () => {
    const action = editing ? 'Editar' : 'Registrar';
    if (activeTab === 'usuarios') {
      if (subTabUsuario === 'cadete')     return `${action} Cadete`;
      if (subTabUsuario === 'instructor') return `${action} Instructor`;
      return `${action} Administrador`;
    }
    return `${action} Acción ${subTabAccion === 'Positiva' ? 'Positiva' : 'Negativa'}`;
  };

  const uploadId = `upload-bulk-${activeTab}-${subTabUsuario}-${subTabAccion}`;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Configuración del Sistema</h2>

      {/* Tabs principales */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'usuarios', label: 'Registro de Usuarios', Icon: Users },
            { id: 'acciones', label: 'Tipos de Acciones',    Icon: FileText },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Sub-tabs Usuarios */}
      {activeTab === 'usuarios' && (
        <div className="flex gap-2">
          {[
            { id: 'cadete',        label: 'Cadete',          Icon: User, active: 'bg-blue-600 text-white'   },
            { id: 'instructor',    label: 'Instructor',      Icon: ShieldCheck,       active: 'bg-green-600 text-white'  },
            { id: 'administrador', label: 'Administrador',   Icon: UserCog,   active: 'bg-purple-600 text-white' },
          ].map(({ id, label, Icon, active }) => (
            <button
              key={id}
              onClick={() => { setSubTabUsuario(id); setEditing(null); setFormData({}); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                subTabUsuario === id ? active : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Sub-tabs Acciones */}
      {activeTab === 'acciones' && (
        <div className="flex gap-2">
          {[
            { id: 'Positiva', label: 'Acciones Positivas', active: 'bg-emerald-600 text-white' },
            { id: 'Negativa', label: 'Acciones Negativas', active: 'bg-red-600 text-white'     },
          ].map(({ id, label, active }) => (
            <button
              key={id}
              onClick={() => { setSubTabAccion(id); setEditing(null); setFormData({}); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                subTabAccion === id ? active : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Mensajes */}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-500">Cargando...</div>
      ) : (
        <div className="space-y-6">

          {/* Formulario + Carga masiva */}
          <div className="flex gap-6 items-start">
            <div className="bg-white p-6 flex-1 rounded-xl shadow-md border border-slate-200">
              <h3 className="text-base font-bold text-slate-800 mb-4">{formTitle()}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {getActiveFields().map(field => {
                  // Ocultar correo al editar (solo requerido en crear)
                  if (field.createOnly && editing) return null;

                  const isRequired = field.required || (!editing && field.createOnly);
                  const inputCls   = 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none';

                  return (
                    <div key={field.name} className={field.type === 'textarea' ? 'lg:col-span-3' : ''}>
                      <label htmlFor={field.name} className="block text-xs font-medium text-slate-600 mb-1">
                        {field.label}
                        {isRequired && <span className="text-red-500 ml-0.5">*</span>}
                      </label>

                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          value={getFormValue(field, formData)}
                          onChange={handleInputChange}
                          rows="2"
                          className={inputCls}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          id={field.name}
                          name={field.name}
                          value={getFormValue(field, formData)}
                          onChange={handleInputChange}
                          className={inputCls}
                        >
                          <option value="">Seleccionar...</option>
                          {field.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field.name}
                          type={field.type}
                          name={field.name}
                          value={getFormValue(field, formData)}
                          onChange={handleInputChange}
                          className={inputCls}
                          step={field.type === 'number' ? '1' : undefined}
                          min={field.type === 'number' ? '0' : undefined}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={saveItem}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  {editing ? 'Actualizar' : 'Registrar'}
                </button>
                {editing && (
                  <button
                    onClick={() => { setEditing(null); setFormData({}); }}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>

            {/* Carga masiva — cadetes, instructores y acciones */}
            {(activeTab === 'acciones' || (activeTab === 'usuarios' && subTabUsuario !== 'administrador')) && (
              <div className="bg-slate-50 p-4 w-56 rounded-xl border-2 border-dashed border-slate-300 flex flex-col shrink-0">
                <input
                  key={uploadFile ? 'has-file' : 'empty'}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={e => setUploadFile(e.target.files[0])}
                  className="hidden"
                  id={uploadId}
                />
                <label htmlFor={uploadId} className="cursor-pointer flex flex-col items-center p-4 text-center">
                  <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
                  <p className="text-sm font-medium text-slate-700">Carga masiva</p>
                  <p className="text-xs text-slate-500 mt-1">XLSX / CSV</p>
                  {uploadFile && <p className="text-xs text-green-600 mt-2 break-all">{uploadFile.name}</p>}
                </label>
                <button
                  onClick={handleBulkUpload}
                  disabled={!uploadFile || uploading}
                  className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                >
                  {uploading ? 'Cargando...' : 'Cargar'}
                </button>
              </div>
            )}
          </div>

          {/* Tabla */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-3 border-b border-slate-200 flex justify-between items-center">
              <span className="font-semibold text-slate-700 text-sm">
                {activeTab === 'usuarios'
                  ? subTabUsuario === 'cadete'       ? 'Cadetes'
                  : subTabUsuario === 'instructor'   ? 'Instructores'
                  : 'Administradores'
                  : `Acciones ${subTabAccion === 'Positiva' ? 'Positivas' : 'Negativas'}`}
                <span className="ml-2 text-slate-400 font-normal">({dataList.length})</span>
              </span>
              {dataList.length > 0 && (
                <button
                  onClick={deleteAll}
                  className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 flex items-center gap-1 font-medium"
                >
                  <Trash2 className="w-3 h-3" />
                  Eliminar Todos
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {tableConfig.headers.map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dataList.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      {tableConfig.row(item).map((cell, i) => (
                        <td key={i} className="px-4 py-3 text-slate-700">{cell ?? '-'}</td>
                      ))}
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {canEdit && (
                            <button
                              onClick={() => editItem(item)}
                              className="p-1 text-blue-600 hover:text-blue-800 rounded"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteItem(item)}
                            className="p-1 text-red-600 hover:text-red-800 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {dataList.length === 0 && (
                    <tr>
                      <td
                        colSpan={tableConfig.headers.length + 1}
                        className="px-4 py-10 text-center text-slate-400"
                      >
                        No hay registros
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ConfigSection;
