import React, { useState, useEffect } from 'react';
import { X, Shield, Save } from 'lucide-react';

export default function TeamModal({ isOpen, onClose, teamToEdit, onSave }) {
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [city, setCity] = useState('');
  const [stadium, setStadium] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (teamToEdit) {
      setName(teamToEdit.name || '');
      setShortName(teamToEdit.shortName || '');
      setCity(teamToEdit.city || '');
      setStadium(teamToEdit.stadium || '');
      setLogoUrl(teamToEdit.logoUrl || '');
      setPrimaryColor(teamToEdit.primaryColor || '#3B82F6');
    } else {
      setName('');
      setShortName('');
      setCity('');
      setStadium('');
      setLogoUrl('');
      setPrimaryColor('#3B82F6');
    }
    setError(null);
  }, [teamToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSave({
        name,
        shortName: shortName.toUpperCase(),
        city,
        stadium,
        logoUrl,
        primaryColor,
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar equipo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {teamToEdit ? 'Editar Club' : 'Registrar Nuevo Club'}
              </h3>
              <p className="text-xs text-slate-400">Datos institucionales y escudo oficial</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Nombre del Club *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Alianza Lima"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Abrev. *
              </label>
              <input
                type="text"
                maxLength={5}
                required
                value={shortName}
                onChange={(e) => setShortName(e.target.value.toUpperCase())}
                placeholder="ALI"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Ciudad Sede
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Lima"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Estadio
              </label>
              <input
                type="text"
                value={stadium}
                onChange={(e) => setStadium(e.target.value)}
                placeholder="Alejandro Villanueva"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                URL del Escudo
              </label>
              <input
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-9 w-12 rounded-lg bg-slate-950 border border-slate-700 cursor-pointer"
                />
                <span className="text-xs text-slate-400 font-mono">{primaryColor}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Guardando...' : teamToEdit ? 'Actualizar Club' : 'Guardar Club'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
