import React from 'react';
import { Shield, Plus, Edit2, Trash2, MapPin, Landmark } from 'lucide-react';
import ClubBadge from '../components/ClubBadge';

export default function TeamsView({ teams, onOpenNewTeam, onEditTeam, onDeleteTeam }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <span>🛡️</span> Directorio de Equipos
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestionado por <code>team-service</code> (Puerto 8081 / Base de Datos: <code>ScoreCraft_Teams</code>)
          </p>
        </div>
        <button
          onClick={onOpenNewTeam}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Registrar Nuevo Equipo</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teams && teams.length > 0 ? (
          teams.map((t) => (
            <div
              key={t.id}
              className="bg-[#101623] border border-slate-800/80 rounded-2xl p-5 shadow-sm relative overflow-hidden group hover:border-slate-700/80 transition-all"
            >
              {/* Primary Color Accent Strip */}
              <div
                className="h-1.5 w-full absolute top-0 left-0"
                style={{ backgroundColor: t.primaryColor || '#10B981' }}
              ></div>

              <div className="flex items-start justify-between gap-4 mt-2">
                <div className="flex items-center gap-3.5">
                  <ClubBadge
                    name={t.name}
                    shortName={t.shortName}
                    logoUrl={t.logoUrl}
                    primaryColor={t.primaryColor}
                    size="lg"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-tight">{t.name}</h3>
                    <span className="inline-block px-2 py-0.5 mt-1.5 rounded-md bg-slate-800/80 text-slate-300 font-mono text-[10px] font-bold tracking-wider border border-slate-700/50">
                      {t.shortName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-400">Ciudad:</span>
                  <span className="font-semibold text-slate-200">{t.city || 'No especificada'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-400">Estadio:</span>
                  <span className="font-semibold text-slate-200">{t.stadium || 'No especificado'}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 pt-3 border-t border-slate-800/50 flex items-center justify-end gap-2">
                <button
                  onClick={() => onEditTeam(t)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/50 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => onDeleteTeam(t.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-[#101623] border border-dashed border-slate-800 rounded-2xl p-12 text-center">
            <span className="text-4xl">🛡️</span>
            <h3 className="text-base font-bold text-white mt-3">No hay equipos registrados</h3>
            <p className="text-xs text-slate-400 mt-1">Comienza agregando los clubes del campeonato.</p>
            <button
              onClick={onOpenNewTeam}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer"
            >
              + Crear Primer Equipo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
