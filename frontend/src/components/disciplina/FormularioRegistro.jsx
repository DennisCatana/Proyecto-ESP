import { useState, useRef, useMemo } from 'react';
import { Camera, Upload, X, AlertCircle, CheckCircle, Calendar, Clock, User, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../../services/api';

const FormularioRegistro = ({ cadete, accionesDefinidas, onSubmit, onCancel, loading, oficialActual }) => {
  const [selectedTipo, setSelectedTipo] = useState(''); // 'Positiva' o 'Negativa'
  const [selectedAccion, setSelectedAccion] = useState('');
  const [observacion, setObservacion] = useState('');
  const [evidencia, setEvidencia] = useState(null);
  const [evidenciaPreview, setEvidenciaPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Fecha y hora
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [usarFechaActual, setUsarFechaActual] = useState(true);
  
  // Estado para colapsar secciones
  const [seccionesExpandidas, setSeccionesExpandidas] = useState({
    cadete: true,
    accion: true,
    detalles: true,
    evidencia: false
  });

  const fileInputRef = useRef(null);

  // Filtrar acciones por tipo seleccionado
  const accionesFiltradas = useMemo(() => {
    if (!selectedTipo) return [];
    return accionesDefinidas.filter(a => a.tipo === selectedTipo && a.activa);
  }, [accionesDefinidas, selectedTipo]);

  // Obtener acción seleccionada
  const accionSeleccionada = accionesDefinidas.find(a => a.codigo === selectedAccion);

  // Obtener fecha y hora actual
  const fechaActual = new Date().toISOString().split('T')[0];
  const horaActual = new Date().toTimeString().slice(0, 5);

  // Manejar expansión de secciones
  const toggleSeccion = (seccion) => {
    setSeccionesExpandidas(prev => ({
      ...prev,
      [seccion]: !prev[seccion]
    }));
  };

  // Manejar selección de tipo
  const handleSelectTipo = (tipo) => {
    setSelectedTipo(tipo);
    setSelectedAccion(''); // Resetear selección de acción
  };

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Tipo de archivo no válido. Solo se permiten imágenes JPG, JPEG y PNG.');
      return;
    }

    // Validar tamaño (5MB máximo)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('El archivo es demasiado grande. Tamaño máximo: 5MB');
      return;
    }

    setError(null);
    setEvidencia(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setEvidenciaPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Eliminar evidencia seleccionada
  const handleRemoveEvidencia = () => {
    setEvidencia(null);
    setEvidenciaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Subir evidencia y registrar acción
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!cadete) {
      setError('Debe seleccionar un cadete');
      return;
    }

    if (!selectedTipo) {
      setError('Debe seleccionar el tipo de acción (Positiva o Negativa)');
      return;
    }

    if (!selectedAccion) {
      setError('Debe seleccionar una acción disciplinaria');
      return;
    }

    try {
      let rutaImagen = null;

      // Subir evidencia si existe
      if (evidencia) {
        setUploading(true);
        try {
          const uploadResult = await api.upload('/upload-evidencia', evidencia, 'evidencia');
          rutaImagen = uploadResult.ruta_imagen;
          setSuccess('Evidencia subida correctamente');
        } catch (uploadError) {
          console.error('Error subiendo evidencia:', uploadError);
          setError('Error al subir la evidencia: ' + uploadError.message);
          setUploading(false);
          return;
        }
        setUploading(false);
      }

      // Determinar fecha y hora a enviar
      const fechaEnviar = usarFechaActual ? null : (fecha || null);
      const horaEnviar = usarFechaActual ? null : (hora || null);

      // Registrar la acción con todos los datos
      await onSubmit({
        cadeteId: cadete.id,
        codigo: selectedAccion,
        observacion: observacion.trim(),
        ruta_imagen: rutaImagen,
        fecha: fechaEnviar,
        hora: horaEnviar
      });

      // Limpiar formulario después de éxito
      setSelectedTipo('');
      setSelectedAccion('');
      setObservacion('');
      handleRemoveEvidencia();
      setFecha('');
      setHora('');
      setUsarFechaActual(true);
      
    } catch (err) {
      setError(err.message || 'Error al registrar la acción');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Registro de Acción Disciplinaria</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error general */}
        {error && (
          <div className="p-3 rounded-lg bg-red-100 text-red-700 border border-red-300 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="p-3 rounded-lg bg-green-100 text-green-700 border border-green-300 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Sección: Información del Oficial */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSeccion('cadete')}
            className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition"
          >
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-slate-600" />
              <span className="font-medium text-slate-700">Información del Oficial</span>
            </div>
            {seccionesExpandidas.cadete ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {seccionesExpandidas.cadete && (
            <div className="p-4 bg-white">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Grado</p>
                  <p className="font-medium text-slate-800">{oficialActual?.gradoU || 'Instructor'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Nombre</p>
                  <p className="font-medium text-slate-800">{oficialActual?.nombreU || oficialActual?.nombre || 'Usuario'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Selector de tipo de acción */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tipo de Acción *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSelectTipo('Positiva')}
              className={`p-4 rounded-lg border-2 text-center transition font-medium ${
                selectedTipo === 'Positiva' 
                  ? 'border-green-500 bg-green-50 text-green-700' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              ✓ Positiva
            </button>
            <button
              type="button"
              onClick={() => handleSelectTipo('Negativa')}
              className={`p-4 rounded-lg border-2 text-center transition font-medium ${
                selectedTipo === 'Negativa' 
                  ? 'border-red-500 bg-red-50 text-red-700' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              ✗ Negativa
            </button>
          </div>
        </div>

        {/* Acciones disponibles según el tipo */}
        {selectedTipo && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Seleccionar Acción *
            </label>
            {accionesFiltradas.length === 0 ? (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
                No hay acciones {selectedTipo.toLowerCase()}s definidas en la base de datos.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-2">
                {accionesFiltradas.map((accion) => (
                  <button
                    key={accion.id}
                    type="button"
                    onClick={() => setSelectedAccion(accion.codigo)}
                    className={`p-3 rounded-lg border-2 text-left transition ${
                      selectedAccion === accion.codigo
                        ? selectedTipo === 'Positiva' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-red-500 bg-red-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold">{accion.codigo}</span>
                        <span className={`ml-2 text-sm font-medium ${
                          accion.tipo === 'Positiva' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          ({accion.tipo === 'Positiva' ? '+' : '-'}{accion.puntaje})
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{accion.titulo}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Acción seleccionada - mostrar detalles */}
        {accionSeleccionada && (
          <div className={`p-4 rounded-lg border-2 ${
            accionSeleccionada.tipo === 'Positiva' 
              ? 'bg-green-50 border-green-300' 
              : 'bg-red-50 border-red-300'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-slate-800">{accionSeleccionada.titulo}</p>
                <p className="text-sm text-slate-600 mt-1">{accionSeleccionada.descripcion}</p>
              </div>
              <p className={`text-2xl font-bold ${
                accionSeleccionada.tipo === 'Positiva' ? 'text-green-600' : 'text-red-600'
              }`}>
                {accionSeleccionada.tipo === 'Positiva' ? '+' : '-'}{accionSeleccionada.puntaje}
              </p>
            </div>
          </div>
        )}

        {/* Sección: Fecha y Hora */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSeccion('detalles')}
            className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-600" />
              <span className="font-medium text-slate-700">Fecha y Hora</span>
            </div>
            {seccionesExpandidas.detalles ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {seccionesExpandidas.detalles && (
            <div className="p-4 bg-white space-y-4">
              {/* Checkbox para usar fecha actual */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="usarFechaActual"
                  checked={usarFechaActual}
                  onChange={(e) => setUsarFechaActual(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="usarFechaActual" className="text-sm text-slate-700">
                  Usar fecha y hora actual
                </label>
              </div>

              {!usarFechaActual && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      max={fechaActual}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Hora
                    </label>
                    <input
                      type="time"
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {usarFechaActual && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>Se registrará con la fecha y hora actual: {new Date().toLocaleString('es-EC')}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Observación / Descripción */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <FileText className="w-4 h-4 inline mr-1" />
            Descripción / Observación
          </label>
          <textarea
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            placeholder="Ingrese los detalles de la acción (opcional)"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            rows={3}
          />
        </div>

        {/* Evidencia Fotográfica */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSeccion('evidencia')}
            className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition"
          >
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-slate-600" />
              <span className="font-medium text-slate-700">Evidencia Fotográfica (opcional)</span>
            </div>
            {seccionesExpandidas.evidencia ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {seccionesExpandidas.evidencia && (
            <div className="p-4 bg-white">
              {!evidenciaPreview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
                >
                  <Camera className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">
                    Click para seleccionar imagen
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    JPG, PNG (máx 5MB)
                  </p>
                </div>
              ) : (
                <div className="relative inline-block w-full">
                  <img 
                    src={evidenciaPreview} 
                    alt="Evidencia" 
                    className="max-h-48 rounded-lg border border-slate-300 mx-auto"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveEvidencia}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition font-medium"
            disabled={loading || uploading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={!cadete || !selectedTipo || !selectedAccion || loading || uploading}
          >
            {uploading ? (
              <>
                <Upload className="w-5 h-5 animate-pulse" />
                Subiendo...
              </>
            ) : loading ? (
              'Registrando...'
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Registrar Acción
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistro;

