import React, { useState } from 'react';
import { X, Swords, Plus } from 'lucide-react';

export default function MatchModal({ isOpen, onClose, teams, onSave }) {
  const [homeTeamId, setHomeTeamId] = useState('');
  const [awayTeamId, setAwayTeamId] = useState('');
  const [matchDay, setMatchDay] = useState(1);
  const [matchDate, setMatchDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setMinutes(0);
    return d.toISOString().slice(0, 16);
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (homeTeamId === awayTeamId) {
      setError('El equipo local y visitante no pueden ser el mismo.');
      return;
    }

    const homeTeam = teams.find((t) => String(t.id) === String(homeTeamId));
    const awayTeam = teams.find((t) => String(t.id) === String(awayTeamId));

    if (!homeTeam || !awayTeam) {
      setError('Seleccione ambos equipos.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await onSave({
        homeTeamId: parseInt(homeTeamId, 10),
        awayTeamId: parseInt(awayTeamId, 10),
        homeTeamName: homeTeam.name,
        awayTeamName: awayTeam.name,
        homeTeamLogo: homeTeam.logoUrl,
        awayTeamLogo: awayTeam.logoUrl,
        matchDay: parseInt(matchDay, 10),
        matchDate: matchDate,
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al programar el partido');
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
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Programar Encuentro</h3>
              <p className="text-xs text-slate-400">Selecciona clubes, jornada y horario oficial</p>
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Teams Select */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Equipo Local *
              </label>
              <select
                required
                value={homeTeamId}
                onChange={(e) => setHomeTeamId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Seleccionar --</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Equipo Visitante *
              </label>
              <select
                required
                value={awayTeamId}
                onChange={(e) => setAwayTeamId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Seleccionar --</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Match Day & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Jornada / Fecha # *
              </label>
              <input
                type="number"
                min="1"
                max="100"
                required
                value={matchDay}
                onChange={(e) => setMatchDay(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Fecha y Hora *
              </label>
              <input
                type="datetime-local"
                required
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {loading ? 'Guardando...' : 'Programar Partido'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
