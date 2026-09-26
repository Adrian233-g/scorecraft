import React from 'react';
import { Trophy, Plus, RefreshCw } from 'lucide-react';
import ClubBadge from '../components/ClubBadge';

export default function StandingsView({ standings, loading, onRefresh, onOpenNewMatch }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <span>🏆</span> Tabla de Posiciones Oficial
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Calculada dinámicamente por <code>standing-service</code> consumiendo <code>match-service</code> y <code>team-service</code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="p-2.5 rounded-xl bg-[#101623] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80 transition-all cursor-pointer"
            title="Recargar datos"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
          <button
            onClick={onOpenNewMatch}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Programar Partido</span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-[#101623] border border-slate-800/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/90 text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-800/80 font-bold">
              <tr>
                <th className="py-4 px-4 text-center w-14">Pos</th>
                <th className="py-4 px-4">Club</th>
                <th className="py-4 px-3 text-center" title="Partidos Jugados">PJ</th>
                <th className="py-4 px-3 text-center text-emerald-400" title="Partidos Ganados">PG</th>
                <th className="py-4 px-3 text-center text-amber-400" title="Partidos Empatados">PE</th>
                <th className="py-4 px-3 text-center text-rose-400" title="Partidos Perdidos">PP</th>
                <th className="py-4 px-3 text-center hidden md:table-cell" title="Goles a Favor">GF</th>
                <th className="py-4 px-3 text-center hidden md:table-cell" title="Goles en Contra">GC</th>
                <th className="py-4 px-3 text-center" title="Diferencia de Goles">DG</th>
                <th className="py-4 px-4 text-center font-bold text-white text-sm" title="Puntos Totales">PTS</th>
                <th className="py-4 px-4 text-center">Últimos 5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-200">
              {standings && standings.length > 0 ? (
                standings.map((row) => (
                  <tr key={row.teamId} className="hover:bg-slate-800/30 transition-colors group">
                    {/* Position */}
                    <td className="py-4 px-4 text-center font-mono font-bold text-sm">
                      <div className="flex items-center justify-center">
                        {row.position === 1 ? (
                          <span className="w-7 h-7 inline-flex items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10 font-bold">
                            1
                          </span>
                        ) : row.position <= 3 ? (
                          <span className="w-7 h-7 inline-flex items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                            {row.position}
                          </span>
                        ) : row.position === 4 ? (
                          <span className="w-7 h-7 inline-flex items-center justify-center rounded-xl bg-sky-500/15 text-sky-300 border border-sky-500/30 font-bold">
                            4
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs font-semibold">{row.position}</span>
                        )}
                      </div>
                    </td>

                    {/* Club */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <ClubBadge
                          name={row.teamName}
                          shortName={row.shortName}
                          logoUrl={row.logoUrl}
                          primaryColor={row.primaryColor}
                          size="sm"
                        />
                        <div>
                          <span className="font-bold text-white text-sm block group-hover:text-emerald-400 transition-colors">
                            {row.teamName}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 font-bold">{row.shortName}</span>
                        </div>
                      </div>
                    </td>

                    {/* Stats */}
                    <td className="py-4 px-3 text-center font-mono text-sm text-slate-300">{row.played}</td>
                    <td className="py-4 px-3 text-center font-mono text-sm text-emerald-400 font-semibold">{row.won}</td>
                    <td className="py-4 px-3 text-center font-mono text-sm text-amber-400 font-semibold">{row.drawn}</td>
                    <td className="py-4 px-3 text-center font-mono text-sm text-rose-400 font-semibold">{row.lost}</td>
                    <td className="py-4 px-3 text-center font-mono text-xs text-slate-400 hidden md:table-cell">{row.goalsFor}</td>
                    <td className="py-4 px-3 text-center font-mono text-xs text-slate-400 hidden md:table-cell">{row.goalsAgainst}</td>
                    <td
                      className={`py-4 px-3 text-center font-mono text-sm font-bold ${
                        row.goalDifference > 0
                          ? 'text-emerald-400'
                          : row.goalDifference < 0
                          ? 'text-rose-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-black text-sm text-white">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/50">
                        {row.points}
                      </span>
                    </td>

                    {/* Form */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {row.recentForm?.map((f, i) => (
                          <span
                            key={i}
                            className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center text-white ${
                              f === 'W' ? 'bg-emerald-600 shadow-sm shadow-emerald-600/30' : f === 'D' ? 'bg-amber-600' : 'bg-rose-600'
                            }`}
                            title={f === 'W' ? 'Victoria' : f === 'D' ? 'Empate' : 'Derrota'}
                          >
                            {f === 'W' ? 'G' : f === 'D' ? 'E' : 'P'}
                          </span>
                        ))}
                        {(!row.recentForm || row.recentForm.length === 0) && (
                          <span className="text-xs text-slate-500 font-mono">-</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400 text-sm">
                    No hay clubes ni resultados computados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="bg-slate-900/60 p-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-500/40 border border-amber-500"></span>
              <span>1° Campeón</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-500"></span>
              <span>2° - 3° Copa Libertadores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-sky-500/40 border border-sky-500"></span>
              <span>4° Copa Sudamericana</span>
            </div>
          </div>
          <div className="text-slate-500 text-[11px] font-mono">
            Criterios oficiales: Puntos &gt; DG &gt; GF &gt; Nombre
          </div>
        </div>
      </div>
    </div>
  );
}
