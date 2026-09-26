import React from 'react';
import { Shield, Swords, Trophy, Target, ArrowRight, Play, Calendar } from 'lucide-react';
import ClubBadge from '../components/ClubBadge';

export default function DashboardView({ data, loading, onOpenScoreModal, setActiveTab }) {
  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Consultando microservicios...</p>
      </div>
    );
  }

  const { teamCount, totalMatches, finishedMatches, leader, topStandings, recentMatches, upcomingMatches } = data || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Clubs */}
        <div className="bg-[#101623] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 shadow-sm relative overflow-hidden transition-all group">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Equipos en Torneo</span>
            <div className="w-8 h-8 rounded-xl bg-slate-800/60 flex items-center justify-center text-slate-300">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{teamCount || 0}</span>
            <span className="text-xs font-semibold text-emerald-400">clubes</span>
          </div>
          <button
            onClick={() => setActiveTab('teams')}
            className="mt-3 inline-flex items-center text-xs font-semibold text-slate-400 hover:text-emerald-400 gap-1 transition-colors cursor-pointer"
          >
            Ver todos los clubes <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 2: Matches */}
        <div className="bg-[#101623] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 shadow-sm relative overflow-hidden transition-all group">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Total Encuentros</span>
            <div className="w-8 h-8 rounded-xl bg-slate-800/60 flex items-center justify-center text-slate-300">
              <Swords className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{totalMatches || 0}</span>
            <span className="text-xs font-semibold text-slate-400">partidos</span>
          </div>
          <button
            onClick={() => setActiveTab('matches')}
            className="mt-3 inline-flex items-center text-xs font-semibold text-slate-400 hover:text-sky-400 gap-1 transition-colors cursor-pointer"
          >
            Ver calendario fixture <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 3: Disputed */}
        <div className="bg-[#101623] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 shadow-sm relative overflow-hidden transition-all group">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Partidos Disputados</span>
            <div className="w-8 h-8 rounded-xl bg-slate-800/60 flex items-center justify-center text-slate-300">
              <Target className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400">{finishedMatches || 0}</span>
            <span className="text-xs font-semibold text-slate-400">de {totalMatches || 0}</span>
          </div>
          <span className="mt-3 block text-xs font-medium text-slate-500">100% computados al instante</span>
        </div>

        {/* Card 4: Leader */}
        <div className="bg-[#101623] border border-amber-500/30 hover:border-amber-500/50 rounded-2xl p-5 shadow-sm relative overflow-hidden transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400 flex items-center gap-1.5">
              <span>👑</span> Líder del Torneo
            </span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              1° Lugar
            </span>
          </div>
          {leader ? (
            <div className="mt-3 flex items-center gap-3">
              <ClubBadge
                name={leader.teamName}
                shortName={leader.shortName}
                logoUrl={leader.logoUrl}
                primaryColor={leader.primaryColor}
                size="md"
              />
              <div className="truncate">
                <div className="text-sm font-extrabold text-white leading-tight truncate">{leader.teamName}</div>
                <div className="text-xs font-semibold text-amber-300 mt-0.5">
                  {leader.points} pts ({leader.goalDifference > 0 ? `+${leader.goalDifference}` : leader.goalDifference} DG)
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-3 text-xs text-slate-400">Aún no hay partidos computados</div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top 5 Standings (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>🏆</span> Top Posiciones
              </h2>
              <p className="text-xs text-slate-400">Calculado en tiempo real por standing-service</p>
            </div>
            <button
              onClick={() => setActiveTab('standings')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              Tabla Completa &rarr;
            </button>
          </div>

          <div className="bg-[#101623] border border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/90 text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-800/80 font-bold">
                  <tr>
                    <th className="py-3.5 px-3.5 text-center w-12">#</th>
                    <th className="py-3.5 px-3.5">Club</th>
                    <th className="py-3.5 px-3 text-center">PJ</th>
                    <th className="py-3.5 px-3 text-center">DG</th>
                    <th className="py-3.5 px-3.5 text-center font-bold text-white">PTS</th>
                    <th className="py-3.5 px-3.5 text-center">Forma</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-slate-200">
                  {topStandings && topStandings.length > 0 ? (
                    topStandings.map((row) => (
                      <tr key={row.teamId} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-3.5 text-center font-mono font-bold text-xs">
                          {row.position === 1 ? (
                            <span className="w-6 h-6 inline-flex items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              1
                            </span>
                          ) : row.position <= 3 ? (
                            <span className="w-6 h-6 inline-flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              {row.position}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs">{row.position}</span>
                          )}
                        </td>
                        <td className="py-3 px-3.5">
                          <div className="flex items-center gap-2.5">
                            <ClubBadge
                              name={row.teamName}
                              shortName={row.shortName}
                              logoUrl={row.logoUrl}
                              primaryColor={row.primaryColor}
                              size="sm"
                            />
                            <span className="font-bold text-white text-xs sm:text-sm truncate">{row.teamName}</span>
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
                        <td className="py-3 px-3.5 text-center font-mono font-extrabold text-sm text-white">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50">
                            {row.points}
                          </span>
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span>🎯</span> Últimos Resultados
              </h3>
              <button
                onClick={() => setActiveTab('matches')}
                className="text-xs text-emerald-400 hover:underline cursor-pointer"
              >
                Ver todos
              </button>
            </div>

            <div className="space-y-2.5">
              {recentMatches && recentMatches.length > 0 ? (
                recentMatches.map((m) => (
                  <div
                    key={m.id}
                    className="bg-[#101623] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-3.5 shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2.5">
                      <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        Jornada {m.matchDay}
                      </span>
                      <span className="text-slate-400 text-[11px]">{new Date(m.matchDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      {/* Home */}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <ClubBadge
                          name={m.homeTeamName}
                          logoUrl={m.homeTeamLogo}
                          size="xs"
                        />
                        <span className="text-xs font-bold text-white truncate">{m.homeTeamName}</span>
                      </div>

                      {/* Score Board */}
                      <div className="px-3 py-1 bg-slate-950/80 border border-slate-800 rounded-lg font-mono font-black text-sm text-white tracking-widest shrink-0">
                        {m.homeScore} - {m.awayScore}
                      </div>

                      {/* Away */}
                      <div className="flex items-center justify-end gap-2 flex-1 min-w-0 text-right">
                        <span className="text-xs font-bold text-white truncate">{m.awayTeamName}</span>
                        <ClubBadge
                          name={m.awayTeamName}
                          logoUrl={m.awayTeamLogo}
                          size="xs"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-[#101623]/60 border border-dashed border-slate-800 rounded-2xl p-4 text-center text-xs text-slate-500">
                  No hay resultados disputados.
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Matches */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span>⏳</span> Próximos Encuentros
              </h3>
              <button
                onClick={() => setActiveTab('matches')}
                className="text-xs text-emerald-400 hover:underline cursor-pointer"
              >
                Ver fixture
              </button>
            </div>

            <div className="space-y-2.5">
              {upcomingMatches && upcomingMatches.length > 0 ? (
                upcomingMatches.map((m) => (
                  <div
                    key={m.id}
                    className="bg-[#101623] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-3.5 shadow-sm transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Jornada {m.matchDay} • {new Date(m.matchDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white truncate">
                        <ClubBadge name={m.homeTeamName} logoUrl={m.homeTeamLogo} size="xs" />
                        <span className="truncate">{m.homeTeamName}</span>
                        <span className="text-slate-500 font-normal px-1">vs</span>
                        <span className="truncate">{m.awayTeamName}</span>
                        <ClubBadge name={m.awayTeamName} logoUrl={m.awayTeamLogo} size="xs" />
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenScoreModal(m)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow transition-all whitespace-nowrap cursor-pointer shrink-0"
                    >
                      Marcador &rarr;
                    </button>
                  </div>
                ))
              ) : (
                <div className="bg-[#101623]/60 border border-dashed border-slate-800 rounded-2xl p-4 text-center text-xs text-slate-500">
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
