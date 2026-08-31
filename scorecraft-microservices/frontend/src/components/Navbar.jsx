import React from 'react';
import { LayoutDashboard, Trophy, Swords, Shield, Plus, Activity } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenNewMatch, onOpenNewTeam }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <span className="text-xl">⚽</span>
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                  Score<span className="text-emerald-400">Craft</span>
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                  Microservicios + React SPA
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800 text-white shadow ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('standings')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'standings'
                  ? 'bg-slate-800 text-white shadow ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              Tabla de Posiciones
            </button>

            <button
              onClick={() => setActiveTab('matches')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'matches'
                  ? 'bg-slate-800 text-white shadow ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Swords className="w-4 h-4 text-emerald-400" />
              Fixture & Partidos
            </button>

            <button
              onClick={() => setActiveTab('teams')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'teams'
                  ? 'bg-slate-800 text-white shadow ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Shield className="w-4 h-4 text-blue-400" />
              Equipos
            </button>
          </nav>

          {/* Action Buttons & Status */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenNewMatch}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Programar Partido</span>
            </button>

            <button
              onClick={onOpenNewTeam}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nuevo Equipo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
