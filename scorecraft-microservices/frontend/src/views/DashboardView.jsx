import React from 'react';
import { Shield, Swords, Trophy, Target, ArrowRight, Play } from 'lucide-react';

export default function DashboardView({ data, loading, onOpenScoreModal, setActiveTab }) {
  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-400">Consultando microservicios...</p>
      </div>
    );
  }

  const { teamCount, totalMatches, finishedMatches, leader, topStandings, recentMatches, upcomingMatches } = data || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute -right-2 -bottom-2 text-6xl opacity-5 select-none pointer-events-none group-hover:scale-110 transition-transform">
            🛡️
          </div>
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Equipos en Torneo</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{teamCount || 0}</span>
            <span className="text-xs font-semibold text-emerald-400">clubes</span>
          </div>
          <button
            onClick={() => setActiveTab('teams')}
            className="mt-3 inline-flex items-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 gap-1"
          >
            Ver todos <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute -right-2 -bottom-2 text-6xl opacity-5 select-none pointer-events-none group-hover:scale-110 transition-transform">
            ⚔️
          </div>
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Total Encuentros</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{totalMatches || 0}</span>
            <span className="text-xs font-semibold text-slate-400">partidos</span>
          </div>
          <button
            onClick={() => setActiveTab('matches')}
            className="mt-3 inline-flex items-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 gap-1"
          >
            Ver fixture <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute -right-2 -bottom-2 text-6xl opacity-5 select-none pointer-events-none group-hover:scale-110 transition-transform">
            🎯
          </div>
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Partidos Disputados</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400">{finishedMatches || 0}</span>
            <span className="text-xs font-semibold text-slate-400">de {totalMatches || 0}</span>
          </div>
          <span className="mt-3 block text-xs font-medium text-slate-500">100% computados</span>
        </div>

        {/* Card 4: Leader */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-5 shadow-lg shadow-amber-950/20 relative overflow-hidden">
          <div className="absolute top-3 right-3 text-xl">👑</div>
          <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">Líder del Torneo</span>
          {leader ? (
            <div className="mt-2 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 p-1 flex items-center justify-center shrink-0 border border-amber-500/30">
                {leader.logoUrl ? (
                  <img src={leader.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="font-mono font-bold text-slate-300 text-xs">{leader.shortName}</span>
                )}
              </div>
              <div className="truncate">
                <div className="text-base font-extrabold text-white leading-snug truncate">{leader.teamName}</div>
                <div className="text-xs font-semibold text-amber-300">
                  {leader.points} pts ({leader.goalDifference > 0 ? `+${leader.goalDifference}` : leader.goalDifference} DG)
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-2 text-xs text-slate-400">Sin partidos disputados</div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top 5 Standings (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                <span>🏆</span> Top Posiciones
              </h2>
              <p className="text-xs text-slate-400">Calculado dinámicamente por standing-service</p>
            </div>
            <button
              onClick={() => setActiveTab('standings')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl transition-all"
            >
              Tabla Completa &rarr;
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3.5 text-center w-12">#</th>
                    <th className="py-3 px-3.5">Club</th>
                    <th className="py-3 px-3 text-center">PJ</th>
                    <th className="py-3 px-3 text-center">DG</th>
                    <th className="py-3 px-3.5 text-center font-bold text-white">PTS</th>
                    <th className="py-3 px-3.5 text-center">Forma</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {topStandings && topStandings.length > 0 ? (
                    topStandings.map((row) => (
                      <tr key={row.teamId} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3.5 text-center font-mono font-bold text-xs">
                          {row.position === 1 ? (
                            <span className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              1
                            </span>
                          ) : row.position <= 3 ? (
                            <span className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              {row.position}
                            </span>
                          ) : (
                            <span className="text-slate-400">{row.position}</span>
                          )}
                        </td>
                        <td className="py-3 px-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full bg-slate-800 p-0.5 flex items-center justify-center shrink-0">
                              {row.logoUrl ? (
                                <img src={row.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                              ) : (
                                <span className="font-mono text-[9px] font-bold text-slate-400">{row.shortName}</span>
                              )}
                            </div>
                            <span className="font-bold text-white text-sm truncate">{row.teamName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-xs text-slate-300">{row.played}</td>
                        <td
                          className={`py-3 px-3 text-center font-mono text-xs font-semibold ${
                            row.goalDifference > 0
                              ? 'text-emerald-400'
                              : row.goalDifference < 0
                              ? 'text-rose-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                        </td>
                        <td className="py-3 px-3.5 text-center font-mono font-extrabold text-sm text-white bg-slate-800/30">
                          {row.points}
                        </td>
                        <td className="py-3 px-3.5 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {row.recentForm?.map((f, i) => (
                              <span
                                key={i}
                                className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center text-white ${
                                  f === 'W' ? 'bg-emerald-600' : f === 'D' ? 'bg-amber-600' : 'bg-rose-600'
                                }`}
                              >
                                {f === 'W' ? 'G' : f === 'D' ? 'E' : 'P'}
                              </span>
                            ))}
                            {(!row.recentForm || row.recentForm.length === 0) && (
                              <span className="text-[10px] text-slate-500 font-mono">-</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-xs text-slate-400">
                        No hay partidos calculados aún.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Column 2: Recent & Upcoming (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recent Matches */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span>🎯</span> Últimos Resultados
              </h3>
              <button
                onClick={() => setActiveTab('matches')}
                className="text-xs text-indigo-400 hover:underline"
              >
                Ver todos
              </button>
            </div>

            <div className="space-y-2.5">
              {recentMatches && recentMatches.length > 0 ? (
                recentMatches.map((m) => (
                  <div
                    key={m.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 shadow hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                      <span className="font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                        Jornada {m.matchDay}
                      </span>
                      <span>{new Date(m.matchDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        {m.homeTeamLogo && (
                          <img src={m.homeTeamLogo} alt="Home" className="w-5 h-5 object-contain" />
                        )}
                        <span className="text-xs font-bold text-white truncate">{m.homeTeamName}</span>
                      </div>
                      <div className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg font-mono font-extrabold text-sm text-white tracking-widest mx-2">
                        {m.homeScore} - {m.awayScore}
                      </div>
                      <div className="flex items-center justify-end gap-2 flex-1 text-right">
                        <span className="text-xs font-bold text-white truncate">{m.awayTeamName}</span>
                        {m.awayTeamLogo && (
                          <img src={m.awayTeamLogo} alt="Away" className="w-5 h-5 object-contain" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-xl p-4 text-center text-xs text-slate-500">
                  No hay resultados computados.
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Matches */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span>⏳</span> Próximos Encuentros
              </h3>
              <button
                onClick={() => setActiveTab('matches')}
                className="text-xs text-indigo-400 hover:underline"
              >
                Ver fixture
              </button>
            </div>

            <div className="space-y-2.5">
              {upcomingMatches && upcomingMatches.length > 0 ? (
                upcomingMatches.map((m) => (
                  <div
                    key={m.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 shadow hover:border-slate-700 transition-all flex items-center justify-between"
                  >
                    <div className="flex-1 pr-2 truncate">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Jornada {m.matchDay} • {new Date(m.matchDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs font-bold text-white truncate">
                        {m.homeTeamName} vs {m.awayTeamName}
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenScoreModal(m)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-all whitespace-nowrap cursor-pointer"
                    >
                      Marcador &rarr;
                    </button>
                  </div>
                ))
              ) : (
                <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-xl p-4 text-center text-xs text-slate-500">
                  No hay partidos programados pendientes.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
