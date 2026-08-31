import React, { useState } from 'react';
import { Swords, Plus, Trash2, Edit3, Calendar } from 'lucide-react';

export default function MatchesView({
  matches,
  matchDays,
  selectedStatus,
  setSelectedStatus,
  selectedMatchDay,
  setSelectedMatchDay,
  onOpenNewMatch,
  onOpenScoreModal,
  onDeleteMatch,
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <span>⚔️</span> Fixture & Resultados
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestionado por <code>match-service</code> (Puerto 8082 / Base de Datos: <code>ScoreCraft_Matches</code>)
          </p>
        </div>
        <button
          onClick={onOpenNewMatch}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Programar Encuentro</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedStatus('')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !selectedStatus ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedStatus('SCHEDULED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStatus === 'SCHEDULED' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            ⏳ Por Jugar
          </button>
          <button
            onClick={() => setSelectedStatus('FINISHED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStatus === 'FINISHED' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            ✅ Finalizados
          </button>
        </div>

        {/* Match Day Filters */}
        {matchDays && matchDays.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Jornada:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSelectedMatchDay(null)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedMatchDay === null ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Todas
              </button>
              {matchDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedMatchDay(day)}
                  className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center font-mono font-bold transition-all cursor-pointer ${
                    selectedMatchDay === day
                      ? 'bg-emerald-500 text-slate-950 font-extrabold shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Matches List */}
      <div className="space-y-3">
        {matches && matches.length > 0 ? (
          matches.map((m) => (
            <div
              key={m.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Meta info */}
              <div className="flex md:flex-col items-center md:items-start justify-between gap-1 text-xs text-slate-400 md:w-36">
                <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-[11px]">
                  Jornada {m.matchDay}
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  {new Date(m.matchDate).toLocaleDateString()} {new Date(m.matchDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Teams & Score Box */}
              <div className="flex-1 flex items-center justify-center gap-4 sm:gap-8 max-w-xl mx-auto">
                {/* Home */}
                <div className="flex-1 flex items-center justify-end gap-3 text-right">
                  <span className="font-extrabold text-white text-sm sm:text-base truncate">{m.homeTeamName}</span>
                  {m.homeTeamLogo && (
                    <img src={m.homeTeamLogo} alt="Home" className="w-8 h-8 object-contain rounded-full bg-slate-800 p-0.5 shrink-0" />
                  )}
                </div>

                {/* Center Box */}
                <div className="shrink-0 flex flex-col items-center">
                  {m.status === 'FINISHED' ? (
                    <div className="px-4 py-1.5 bg-slate-950 border border-slate-700 rounded-xl font-mono font-black text-lg text-white tracking-widest shadow-inner flex items-center gap-2">
                      <span>{m.homeScore}</span>
                      <span className="text-slate-600">:</span>
                      <span>{m.awayScore}</span>
                    </div>
                  ) : (
                    <div className="px-3 py-1 bg-amber-950/40 border border-amber-500/30 text-amber-400 rounded-lg text-xs font-extrabold uppercase tracking-wider">
                      VS
                    </div>
                  )}
                  <span
                    className={`text-[10px] mt-1 font-bold uppercase tracking-wider ${
                      m.status === 'FINISHED' ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {m.status === 'FINISHED' ? 'Finalizado' : 'Programado'}
                  </span>
                </div>

                {/* Away */}
                <div className="flex-1 flex items-center justify-start gap-3 text-left">
                  {m.awayTeamLogo && (
                    <img src={m.awayTeamLogo} alt="Away" className="w-8 h-8 object-contain rounded-full bg-slate-800 p-0.5 shrink-0" />
                  )}
                  <span className="font-extrabold text-white text-sm sm:text-base truncate">{m.awayTeamName}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800/80">
                <button
                  onClick={() => onOpenScoreModal(m)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Marcador</span>
                </button>
                <button
                  onClick={() => onDeleteMatch(m.id)}
                  className="p-2 rounded-xl text-xs font-semibold text-rose-400 bg-slate-800 hover:bg-rose-950 hover:text-rose-200 transition-all cursor-pointer"
                  title="Eliminar encuentro"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-12 text-center">
            <span className="text-4xl">⚔️</span>
            <h3 className="text-base font-bold text-white mt-3">No hay partidos para el filtro seleccionado</h3>
            <p className="text-xs text-slate-400 mt-1">Programa un nuevo partido o limpia los filtros.</p>
            <button
              onClick={onOpenNewMatch}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
            >
              + Programar Partido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
