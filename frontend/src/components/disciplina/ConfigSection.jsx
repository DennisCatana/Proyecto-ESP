import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit, Trash2, Users, User, FileText, UploadCloud } from 'lucide-react';

const ConfigSection = () => {
  const [activeTab, setActiveTab] = useState('usuarios');
  const [usuarios, setUsuarios] = useState([]);
  const [cadetes, setCadetes] = useState([]);
  const [accionesDefinidas, setAccionesDefinidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'usuarios') {
        const data = await api.get('/usuarios');
        setUsuarios(data);
      } else if (activeTab === 'cadetes') {
        const data = await api.get('/cadetes');
        setCadetes(data);
      } else if (activeTab === 'accionesdefinidas') {
        const data = await api.get('/acciones');
        setAccionesDefinidas(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const saveItem = async () => {
  try {
    let msg = '';
    if (activeTab === 'usuarios') {
      if (!formData.nombreU || !formData.correoU || !formData.cedula || !formData.rol) {
        alert('Faltan campos requeridos: Nombre, Email, Cédula y Rol');
        return;
      }
      if (editing) {
        await api.put(`/usuarios/${editing.id}`, formData);
        msg = 'Usuario actualizado correctamente';
      } else {
        await api.post('/usuarios', formData);
        msg = 'Usuario registrado correctamente';
      }
    } else if (activeTab === 'cadetes') {
      if (!formData.nombre || !formData.cedula) {
        alert('Faltan campos requeridos: Nombre y Cédula');
        return;
      }
      if (editing) {
        await api.put(`/cadetes/${editing.id}`, formData);
        msg = 'Cadete actualizado correctamente';
      } else {
        await api.post('/cadetes', formData);
        msg = 'Cadete registrado correctamente';
      }
    } else if (activeTab === 'accionesdefinidas') {
      if (editing) {
        await api.put(`/accionesdefinidas/${editing.id}`, formData);
        msg = 'Acción definida actualizada correctamente';
      } else {
        await api.post('/accionesdefinidas', formData);
        msg = 'Acción definida registrada correctamente';
      }
    }
      loadData();
      setEditing(null);
      setFormData({});
      // Show message
      alert(msg);
      // Refresh parent
      window.dispatchEvent(new CustomEvent('refreshData'));
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error: ' + error.message);
    }
  };



const deleteItem = async (id) => {
  console.log('deleteItem llamado con id:', id);
  if (!confirm('Confirmar eliminación?')) return;
  try {
    if (activeTab === 'usuarios') {
      await api.delete(`/usuarios/${id}`);
    } else if (activeTab === 'cadetes') {
      await api.delete(`/cadetes/${id}`);
    } else if (activeTab === 'accionesdefinidas') {
      await api.delete(`/accionesdefinidas/${id}`);
    }
    setUsuarios(prev => prev.filter(u => u.id !== id));
    setCadetes(prev => prev.filter(c => c.id !== id));
    setAccionesDefinidas(prev => prev.filter(a => a.id !== id));
    await loadData();
    window.dispatchEvent(new CustomEvent('refreshData'));
    alert('Eliminado correctamente');
  } catch (error) {
    console.error('Error deleting:', error);
    alert('Error al eliminar: ' + (error?.message || error));
  }
};

  const editItem = (item) => {
    setEditing(item);
    setFormData(item);
  };

  const tabs = [
    { id: 'usuarios', label: 'Usuarios', icon: Users },
    { id: 'cadetes', label: 'Cadetes', icon: User },
    { id: 'accionesdefinidas', label: 'Acciones Definidas', icon: FileText }
  ];

  const getFields = () => {
    if (activeTab === 'usuarios') return [
      { name: 'nombreU', label: 'Nombre', type: 'text' },
      { name: 'gradoU', label: 'Grado', type: 'select', options: ['ADMIN', 'ASPD', 'SBTE', 'TNTE', 'CPTN', 'MYR', 'TCNL', 'CRNL' ]},
      { name: 'correoU', label: 'Email', type: 'email' },
      { name: 'rol', label: 'Rol', type: 'select', options: ['Administrador', 'Instructor', 'Servicio', 'Alumno'] },
      { name: 'cedula', label: 'Cédula', type: 'text' }
    ];
    if (activeTab === 'cadetes') return [
      { name: 'nombre', label: 'Nombre', type: 'text' },
      { name: 'cedula', label: 'Cédula', type: 'text' },
      { name: 'cia', label: 'Compañía', type: 'text' },
      { name: 'seccion', label: 'Sección', type: 'text' }
    ];
    return [
      { name: 'codigo', label: 'Código', type: 'text' },
      { name: 'titulo', label: 'Título', type: 'text' },
      { name: 'tipo', label: 'Tipo', type: 'select', options: ['Positiva', 'Negativa'] },
      { name: 'puntaje', label: 'Puntaje', type: 'number' },
      { name: 'descripcion', label: 'Descripción', type: 'textarea' }
    ];
  };

  const dataList = activeTab === 'usuarios' ? usuarios : activeTab === 'cadetes' ? cadetes : accionesDefinidas;

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleBulkUpload = async () => {
    if (!uploadFile) return;
    setUploading(true);
    try {
      const endpoint = activeTab === 'usuarios' ? '/usuarios/bulk-upload' : activeTab === 'cadetes' ? '/cadetes/bulk-upload' : null;
      if (!endpoint) return alert('Bulk upload not implemented for this tab');
      const result = await api.upload(endpoint, uploadFile, 'files');
      alert(`Éxito: ${result.count || 0} registros cargados`);
      loadData();
    } catch (error) {
      console.error(error);
      alert('Error: ' + error.message);
    }
    setUploading(false);
    setUploadFile(null);
  };

  const handleDeleteAll = async () => {
    if (!confirm('¿Eliminar todos los registros de esta categoría?')) return;
    try {
      const endpoint = activeTab === 'usuarios' ? '/usuarios/all' : activeTab === 'cadetes' ? '/elimiarcadetes' : null;
      if (!endpoint) return alert('Delete all not implemented for this tab');
      await api.delete(endpoint);
      loadData();
      alert('Eliminados todos los registros');
    } catch (error) {
      console.error(error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Configuración del Sistema</h2>
      
      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-1 inline" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {loading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : (
        <>
        <div className='flex space-x-6'>
        {/* Form */}
          <div className="bg-white p-4 w-3xl rounded-xl shadow-md border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6">{editing ? 'Editar' : 'Agregar Nuevo'} {activeTab}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {getFields().map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {field.label} *
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Seleccione {field.label}</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={saveItem}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Plus className="w-5 h-5" />
                {editing ? 'Actualizar' : 'Crear Nuevo'}
              </button>
              <button
                onClick={() => {
                  setEditing(null);
                  setFormData({});
                }}
                className="flex-1 bg-slate-200 text-slate-800 py-3 px-6 rounded-lg hover:bg-slate-300 font-semibold flex items-center justify-center shadow-md transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-slate-50 p-2 w-sm rounded-lg border-2 border-dashed border-slate-300">
            <input 
              type="file" 
              accept=".xlsx,.xls,.csv" 
              onChange={handleFileChange}
              className="hidden"
              id={`upload-${activeTab}`}
            />
            <label htmlFor={`upload-${activeTab}`} className="cursor-pointer flex flex-col items-center justify-center p-10 text-center">
              <UploadCloud className="w-25 h-25 text-slate-400 mb-5" />
              <p className="text-sm font-medium text-slate-700 mb-1">Cargar XLSX/CSV ({activeTab})</p>
              <p className="text-xs text-slate-500">Subir archivo para {activeTab}</p>
              {uploadFile && (
                <p className="text-xs text-green-600 mt-2">{uploadFile.name}</p>
              )}
            </label>
            <button 
              onClick={handleBulkUpload}
              disabled={!uploadFile || uploading}
              className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploading ? 'Cargando...' : 'Cargar Archivo'}
            </button>
          </div>
          </div>

          {/* Delete All */}
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <button 
              onClick={handleDeleteAll}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 font-medium flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar TODOS los {activeTab}
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Datos</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {dataList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.id}</td>
                      <td className="px-6 py-4">
                        {Object.entries(item).slice(0, 4).map(([key, val]) => (
                          <div key={key} className="text-sm text-slate-900">
                            <span className="font-medium">{key}:</span> {val?.toString().slice(0, 30)}
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => editItem(item)} className="text-blue-600 hover:text-blue-900 p-1 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteItem(item.id)} className="text-red-600 hover:text-red-900 p-1 rounded ml-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          
        </>
      )}
    </div>
  );
};

export default ConfigSection;
