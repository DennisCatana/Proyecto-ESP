import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit, Trash2, Users, FileText, UploadCloud, ShieldCheck, GraduationCap, UserCog } from 'lucide-react';

const CADETE_FIELDS = [
  { name: 'nombre',    label: 'Nombre',     type: 'text'   },
  { name: 'cedula',    label: 'Cédula',     type: 'text'   },
  { name: 'correo',    label: 'Correo',     type: 'email'  },
  { name: 'promocion', label: 'Promoción',  type: 'text'   },
  { name: 'cia',       label: 'Compañía',   type: 'text'   },
  { name: 'seccion',   label: 'Sección',    type: 'text'   },
  { name: 'genero',    label: 'Género',     type: 'select', options: ['M', 'F'] },
  { name: 'telefono',  label: 'Teléfono',   type: 'text'   },
];

const INSTRUCTOR_FIELDS = [
  { name: 'nombre',      label: 'Nombre',      type: 'text'   },
  { name: 'cedula',      label: 'Cédula',      type: 'text'   },
  { name: 'correo',      label: 'Correo',      type: 'email'  },
  { name: 'grado',       label: 'Grado',       type: 'select', options: ['SBTE', 'TNTE', 'CPTN', 'MYR', 'TCNL', 'CRNL'] },
  { name: 'especialidad',label: 'Especialidad', type: 'text'   },
  { name: 'telefono',    label: 'Teléfono',    type: 'text'   },
];

const ADMIN_FIELDS = [
  { name: 'nombre',          label: 'Nombre',            type: 'text'     },
  { name: 'correo',          label: 'Correo',            type: 'email'    },
  { name: 'passwordInicial', label: 'Contraseña Inicial', type: 'password' },
];

const ACCION_FIELDS = [
  { name: 'codigo',      label: 'Código',      type: 'text'     },
  { name: 'titulo',      label: 'Título',      type: 'text'     },
  { name: 'puntaje',     label: 'Puntaje',     type: 'number'   },
  { name: 'descripcion', label: 'Descripción', type: 'textarea' },
];

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

  const loadData = async () => {
    setLoading(true);
    try {
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
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveItem = async () => {
    try {
      if (activeTab === 'usuarios') {
        if (subTabUsuario === 'cadete') {
          const { nombre, cedula, correo, promocion, cia, seccion } = formData;
          if (!nombre || !cedula || !correo || !promocion || !cia || !seccion)
            return showMsg('Faltan campos obligatorios: Nombre, Cédula, Correo, Promoción, Compañía y Sección', true);
          if (editing) {
            await api.put(`/cadetes/${editing.id}`, formData);
            showMsg('Cadete actualizado correctamente');
          } else {
            await api.post('/cadetes', formData);
            showMsg('Cadete registrado correctamente');
          }
        } else if (subTabUsuario === 'instructor') {
          const { nombre, cedula, correo } = formData;
          if (!nombre || !cedula || !correo)
            return showMsg('Nombre, cédula y correo son obligatorios', true);
          await api.post('/usuarios/instructor', formData);
          showMsg('Instructor registrado correctamente');
        } else {
          const { nombre, correo, passwordInicial } = formData;
          if (!nombre || !correo || !passwordInicial)
            return showMsg('Nombre, correo y contraseña inicial son obligatorios', true);
          await api.post('/usuarios/administrador', formData);
          showMsg('Administrador registrado correctamente');
        }
      } else {
        const payload = { ...formData, tipo: subTabAccion };
        const { codigo, titulo, puntaje } = payload;
        if (!codigo || !titulo || puntaje == null || puntaje === '')
          return showMsg('Código, título y puntaje son obligatorios', true);
        if (editing) {
          await api.put(`/accionesdefinidas/${editing.id}`, payload);
          showMsg('Acción actualizada correctamente');
        } else {
          await api.post('/accionesdefinidas', payload);
          showMsg(`Acción ${subTabAccion === 'Positiva' ? 'positiva' : 'negativa'} creada correctamente`);
        }
      }
      setEditing(null);
      setFormData({});
      loadData();
      window.dispatchEvent(new CustomEvent('refreshData'));
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
      loadData();
      showMsg('Eliminado correctamente');
      window.dispatchEvent(new CustomEvent('refreshData'));
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
    loadData();
    showMsg('Todos los registros eliminados correctamente');
    window.dispatchEvent(new CustomEvent('refreshData'));
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
    setUploading(true);
    try {
      const result = await api.upload('/cadetes/bulk-upload', uploadFile, 'files');
      showMsg(`${result.count || 0} cadetes cargados`);
      loadData();
    } catch (err) {
      showMsg('Error: ' + err.message, true);
    } finally {
      setUploading(false);
      setUploadFile(null);
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

  // Solo cadetes y acciones tienen edición
  const canEdit = activeTab === 'acciones' || (activeTab === 'usuarios' && subTabUsuario === 'cadete');

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
            { id: 'cadete',        label: 'Cadete',          Icon: GraduationCap, active: 'bg-blue-600 text-white'   },
            { id: 'instructor',    label: 'Instructor',      Icon: UserCog,       active: 'bg-green-600 text-white'  },
            { id: 'administrador', label: 'Administrador',   Icon: ShieldCheck,   active: 'bg-purple-600 text-white' },
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
                {getActiveFields().map(field => (
                  <div key={field.name} className={field.type === 'textarea' ? 'lg:col-span-3' : ''}>
                    <label className="block text-xs font-medium text-slate-600 mb-1">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Seleccionar...</option>
                        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  </div>
                ))}
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

            {/* Carga masiva — solo para cadetes */}
            {activeTab === 'usuarios' && subTabUsuario === 'cadete' && (
              <div className="bg-slate-50 p-4 w-56 rounded-xl border-2 border-dashed border-slate-300 flex flex-col shrink-0">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={e => setUploadFile(e.target.files[0])}
                  className="hidden"
                  id="upload-cadetes"
                />
                <label htmlFor="upload-cadetes" className="cursor-pointer flex flex-col items-center p-4 text-center">
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
