import React from 'react';
import { Shield, Plus, Edit2, Trash2 } from 'lucide-react';

export default function TeamsView({ teams, onOpenNewTeam, onEditTeam, onDeleteTeam }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <span>🛡️</span> Directorio de Equipos
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestionado por <code>team-service</code> (Puerto 8081 / Base de Datos: <code>ScoreCraft_Teams</code>)
          </p>
        </div>
        <button
          onClick={onOpenNewTeam}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Registrar Nuevo Equipo</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teams && teams.length > 0 ? (
          teams.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all"
            >
              {/* Primary Color Strip */}
              <div
                className="h-1.5 w-full absolute top-0 left-0"
                style={{ backgroundColor: t.primaryColor || '#3B82F6' }}
              ></div>

              <div className="flex items-start justify-between gap-4 mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/60 p-2 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {t.logoUrl ? (
                      <img src={t.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-xl font-extrabold text-slate-400">{t.shortName}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-tight">{t.name}</h3>
                    <span className="inline-block px-2 py-0.5 mt-1 rounded bg-slate-800 text-slate-300 font-mono text-[10px] font-bold tracking-wider">
                      {t.shortName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">📍 Ciudad:</span>
                  <span className="font-medium text-slate-200">{t.city || 'No especificada'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">🏟️ Estadio:</span>
                  <span className="font-medium text-slate-200">{t.stadium || 'No especificado'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-end gap-2">
                <button
                  onClick={() => onEditTeam(t)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => onDeleteTeam(t.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-12 text-center">
            <span className="text-4xl">🛡️</span>
            <h3 className="text-base font-bold text-white mt-3">No hay equipos registrados</h3>
            <p className="text-xs text-slate-400 mt-1">Comienza agregando los clubes del campeonato.</p>
            <button
              onClick={onOpenNewTeam}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
            >
              + Crear Primer Equipo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
