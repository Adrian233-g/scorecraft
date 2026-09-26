import React, { useState, useEffect } from 'react';
import { X, Trophy, Save } from 'lucide-react';
import ClubBadge from './ClubBadge';

export default function ScoreModal({ isOpen, onClose, match, onSave }) {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [status, setStatus] = useState('FINISHED');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match) {
      setHomeScore(match.homeScore ?? 0);
      setAwayScore(match.awayScore ?? 0);
      setStatus(match.status || 'FINISHED');
    }
  }, [match]);

  if (!isOpen || !match) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(match.id, {
        homeScore: parseInt(homeScore, 10),
        awayScore: parseInt(awayScore, 10),
        status: status,
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#101623] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              ⚽
            </div>
            <div>
              <h3 className="text-base font-black text-white">Registrar Marcador Oficial</h3>
              <p className="text-xs text-slate-400">
                Jornada {match.matchDay} • {new Date(match.matchDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Face-off Score Inputs */}
          <div className="grid grid-cols-5 items-center gap-3 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
            {/* Home Team */}
            <div className="col-span-2 flex flex-col items-center text-center space-y-2">
              <ClubBadge
                name={match.homeTeamName}
                logoUrl={match.homeTeamLogo}
                size="lg"
              />
              <span className="font-bold text-white text-xs sm:text-sm line-clamp-2">{match.homeTeamName}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Local</span>

              <input
                type="number"
                min="0"
                max="99"
                required
                value={homeScore}
                onChange={(e) => setHomeScore(e.target.value)}
                className="w-20 text-center py-2 text-2xl font-mono font-black rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none shadow-inner"
              />
            </div>

            {/* VS Separator */}
            <div className="col-span-1 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-slate-600 font-mono">:</span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">VS</span>
            </div>

            {/* Away Team */}
            <div className="col-span-2 flex flex-col items-center text-center space-y-2">
              <ClubBadge
                name={match.awayTeamName}
                logoUrl={match.awayTeamLogo}
                size="lg"
              />
              <span className="font-bold text-white text-xs sm:text-sm line-clamp-2">{match.awayTeamName}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">Visitante</span>

              <input
                type="number"
                min="0"
                max="99"
                required
                value={awayScore}
                onChange={(e) => setAwayScore(e.target.value)}
                className="w-20 text-center py-2 text-2xl font-mono font-black rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-emerald-500 focus:outline-none shadow-inner"
              />
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Estado del Encuentro
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="FINISHED">Finalizado (Computar a la Tabla)</option>
              <option value="IN_PROGRESS">En Juego</option>
              <option value="SCHEDULED">Programado</option>
              <option value="CANCELLED">Cancelado</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Guardando...' : 'Guardar y Recalcular'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
