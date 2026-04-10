import { useState, useRef, useMemo } from 'react';
import {
  Camera, Upload, X, AlertCircle, CheckCircle, Calendar, Clock,
  User, FileText, Award, AlertTriangle, Image as ImageIcon
} from 'lucide-react';
import { api } from '../../services/api';

const FormularioRegistro = ({ cadete, accionesDefinidas, onSubmit, onCancel, loading, oficialActual }) => {
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedAccion, setSelectedAccion] = useState('');
  const [observacion, setObservacion] = useState('');
  const [evidencia, setEvidencia] = useState(null);
  const [evidenciaPreview, setEvidenciaPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Fecha de la acción (cuándo ocurrió)
  const [fechaAccion, setFechaAccion] = useState('');
  const [horaAccion, setHoraAccion] = useState('');
  const [usarFechaActual, setUsarFechaActual] = useState(true);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const fechaHoy = new Date().toISOString().split('T')[0];

  const accionesFiltradas = useMemo(() => {
    if (!selectedTipo) return [];
    return accionesDefinidas.filter(a => a.tipo === selectedTipo && a.activa);
  }, [accionesDefinidas, selectedTipo]);

  const accionSeleccionada = accionesDefinidas.find(a => a.codigo === selectedAccion);

  const handleSelectTipo = (tipo) => {
    setSelectedTipo(tipo);
    setSelectedAccion('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Solo se permiten imágenes JPG, PNG o WEBP.');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('El archivo es demasiado grande (máx 8MB).');
      return;
    }
    setError(null);
    setEvidencia(file);
    const reader = new FileReader();
    reader.onload = (ev) => setEvidenciaPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveEvidencia = () => {
    setEvidencia(null);
    setEvidenciaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!cadete) return setError('Debe seleccionar un cadete.');
    if (!selectedTipo) return setError('Debe seleccionar el tipo de acción.');
    if (!selectedAccion) return setError('Debe seleccionar la acción.');

    try {
      const formData = new FormData();

      formData.append('cadeteId', cadete.id);
      formData.append('codigo', selectedAccion);
      formData.append('observacion', observacion.trim());

      // Fecha y hora
      if (!usarFechaActual) {
        if (fechaAccion) formData.append('fecha', fechaAccion);
        if (horaAccion) formData.append('hora', horaAccion);
      }

      // Imagen (IMPORTANTE)
      if (evidencia) {
        formData.append('evidencia', evidencia);
      }

      await onSubmit(formData);

      // Reset
      setSelectedTipo('');
      setSelectedAccion('');
      setObservacion('');
      handleRemoveEvidencia();
      setFechaAccion('');
      setHoraAccion('');
      setUsarFechaActual(true);

    } catch (err) {
      setError(err.message || 'Error al registrar la acción.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Cabecera del formulario */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-4">
        <h3 className="text-lg font-bold">Registro de Acción Disciplinaria</h3>
        <p className="text-slate-300 text-sm mt-0.5">Complete todos los campos requeridos</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 flex items-center gap-2 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Información del Instructor */}
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-3 flex items-center gap-1.5">
            <User className="w-4 h-4" /> Instructor que Registra
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Grado</p>
              <p className="font-semibold text-slate-800">{oficialActual?.gradoU || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Nombre</p>
              <p className="font-semibold text-slate-800">{oficialActual?.nombreU || oficialActual?.nombre || '—'}</p>
            </div>
          </div>
        </div>

        {/* Cadete seleccionado */}
        {cadete && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-blue-500 uppercase mb-2">Cadete Seleccionado</p>
            <p className="font-bold text-blue-800 text-base">{cadete.nombre}</p>
            <p className="text-sm text-blue-600 mt-0.5">
              {cadete.cia} • {cadete.seccion}
              {cadete.habitacion ? ` • Hab: ${cadete.habitacion}` : ''}
              {cadete.grupo_guardia ? ` • GG: ${cadete.grupo_guardia}` : ''}
            </p>
          </div>
        )}

        {/* Tipo de acción */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Tipo de Acción <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSelectTipo('Positiva')}
              className={`p-4 rounded-xl border-2 text-center transition font-semibold flex flex-col items-center gap-2 ${selectedTipo === 'Positiva'
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                  : 'border-slate-200 hover:border-green-200 hover:bg-green-50/50 text-slate-600'
                }`}
            >
              <Award className={`w-7 h-7 ${selectedTipo === 'Positiva' ? 'text-green-500' : 'text-slate-400'}`} />
              Acción Positiva
            </button>
            <button
              type="button"
              onClick={() => handleSelectTipo('Negativa')}
              className={`p-4 rounded-xl border-2 text-center transition font-semibold flex flex-col items-center gap-2 ${selectedTipo === 'Negativa'
                  ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
                  : 'border-slate-200 hover:border-red-200 hover:bg-red-50/50 text-slate-600'
                }`}
            >
              <AlertTriangle className={`w-7 h-7 ${selectedTipo === 'Negativa' ? 'text-red-500' : 'text-slate-400'}`} />
              Acción Negativa
            </button>
          </div>
        </div>

        {/* Lista desplegable de acciones según tipo */}
        {selectedTipo && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Seleccionar {selectedTipo === 'Positiva' ? 'Acción Positiva' : 'Acción Negativa'} <span className="text-red-500">*</span>
            </label>

            {accionesFiltradas.length === 0 ? (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 text-sm">
                No hay acciones {selectedTipo.toLowerCase()}s definidas. Agrega en Configuración.
              </div>
            ) : (
              <select
                value={selectedAccion}
                onChange={e => setSelectedAccion(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl outline-none text-sm font-medium transition ${selectedAccion
                    ? selectedTipo === 'Positiva'
                      ? 'border-green-400 bg-green-50 text-green-800'
                      : 'border-red-400 bg-red-50 text-red-800'
                    : 'border-slate-300 focus:border-blue-400'
                  }`}
              >
                <option value="">— Selecciona la acción —</option>
                {accionesFiltradas.map(accion => (
                  <option key={accion.id} value={accion.codigo}>
                    [{accion.codigo}] {accion.titulo} ({accion.tipo === 'Positiva' ? '+' : '-'}{accion.puntaje} pts)
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Descripción de la acción seleccionada */}
        {accionSeleccionada && (
          <div className={`p-4 rounded-xl border-2 ${accionSeleccionada.tipo === 'Positiva'
              ? 'bg-green-50 border-green-300'
              : 'bg-red-50 border-red-300'
            }`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-bold text-slate-800">{accionSeleccionada.titulo}</p>
                <p className="text-sm text-slate-600 mt-1">{accionSeleccionada.descripcion}</p>
              </div>
              <p className={`text-2xl font-black shrink-0 ${accionSeleccionada.tipo === 'Positiva' ? 'text-green-600' : 'text-red-600'
                }`}>
                {accionSeleccionada.tipo === 'Positiva' ? '+' : '-'}{accionSeleccionada.puntaje}
              </p>
            </div>
          </div>
        )}

        {/* Fecha y hora de la acción (cuándo ocurrió) */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            Fecha y Hora de la Acción
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="usarFechaActual"
              checked={usarFechaActual}
              onChange={e => setUsarFechaActual(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            <label htmlFor="usarFechaActual" className="text-sm text-slate-600">
              Usar fecha y hora actual ({new Date().toLocaleString('es-EC')})
            </label>
          </div>

          {!usarFechaActual && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Fecha de la acción</label>
                <input
                  type="date"
                  value={fechaAccion}
                  onChange={e => setFechaAccion(e.target.value)}
                  max={fechaHoy}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Hora de la acción</label>
                <input
                  type="time"
                  value={horaAccion}
                  onChange={e => setHoraAccion(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
            </div>
          )}

          <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-lg">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            La fecha y hora de <strong>subida/registro</strong> se almacenan automáticamente al momento de guardar.
          </div>
        </div>

        {/* Observación */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-500" />
            Descripción / Observación
          </label>
          <textarea
            value={observacion}
            onChange={e => setObservacion(e.target.value)}
            placeholder="Describa los detalles de la acción o circunstancias relevantes (opcional)..."
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
            rows={3}
          />
        </div>

        {/* Evidencia fotográfica */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Camera className="w-4 h-4 text-slate-500" />
            Evidencia Fotográfica <span className="text-slate-400 font-normal">(opcional)</span>
          </label>

          {!evidenciaPreview ? (
            <div className="grid grid-cols-2 gap-3">
              {/* Galería */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition flex flex-col items-center gap-2"
              >
                <ImageIcon className="w-8 h-8 text-slate-400" />
                <p className="text-sm text-slate-600 font-medium">Seleccionar de Galería</p>
                <p className="text-xs text-slate-400">JPG, PNG, WEBP (máx 8MB)</p>
              </div>

              {/* Cámara */}
              <div
                onClick={() => cameraInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition flex flex-col items-center gap-2"
              >
                <Camera className="w-8 h-8 text-slate-400" />
                <p className="text-sm text-slate-600 font-medium">Tomar Fotografía</p>
                <p className="text-xs text-slate-400">Usar la cámara del dispositivo</p>
              </div>
            </div>
          ) : (
            <div className="relative inline-block w-full">
              <img
                src={evidenciaPreview}
                alt="Evidencia"
                className="max-h-56 rounded-xl border border-slate-300 mx-auto block"
              />
              <button
                type="button"
                onClick={handleRemoveEvidencia}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition shadow-md"
                title="Eliminar imagen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Inputs ocultos */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading || uploading}
            className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition font-semibold disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!cadete || !selectedTipo || !selectedAccion || loading || uploading}
            className={`flex-2 flex-1 px-6 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${selectedTipo === 'Positiva'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : selectedTipo === 'Negativa'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            {uploading ? (
              <>
                <Upload className="w-5 h-5 animate-pulse" />
                Subiendo evidencia...
              </>
            ) : loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Registrando...
              </>
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
