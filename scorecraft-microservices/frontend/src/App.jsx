import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import ScoreModal from './components/ScoreModal';
import MatchModal from './components/MatchModal';
import TeamModal from './components/TeamModal';
import DashboardView from './views/DashboardView';
import StandingsView from './views/StandingsView';
import MatchesView from './views/MatchesView';
import TeamsView from './views/TeamsView';
import { sportsApi } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState(null);

  // Data States
  const [dashboardData, setDashboardData] = useState(null);
  const [standings, setStandings] = useState([]);
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matchDays, setMatchDays] = useState([]);

  // Filter States
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedMatchDay, setSelectedMatchDay] = useState(null);

  // Loading States
  const [loading, setLoading] = useState(false);

  // Modal States
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [selectedMatchForScore, setSelectedMatchForScore] = useState(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Load Dashboard Data
  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const data = await sportsApi.getDashboard();
      setDashboardData(data);
    } catch (err) {
      console.error('Error cargando dashboard:', err);
      showToast('Error al conectar con los microservicios', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load Standings Data
  const loadStandings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await sportsApi.getStandings();
      setStandings(data);
    } catch (err) {
      console.error('Error cargando tabla de posiciones:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load Matches Data
  const loadMatches = useCallback(async () => {
    try {
      const params = {};
      if (selectedStatus) params.status = selectedStatus;
      if (selectedMatchDay) params.matchDay = selectedMatchDay;

      const [matchesData, daysData] = await Promise.all([
        sportsApi.getMatches(params),
        sportsApi.getMatchDays(),
      ]);
      setMatches(matchesData);
      setMatchDays(daysData);
    } catch (err) {
      console.error('Error cargando partidos:', err);
    }
  }, [selectedStatus, selectedMatchDay]);

  // Load Teams Data
  const loadTeams = useCallback(async () => {
    try {
      const data = await sportsApi.getTeams();
      setTeams(data);
    } catch (err) {
      console.error('Error cargando equipos:', err);
    }
  }, []);

  // Initial and reactive loads
  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadDashboard();
    } else if (activeTab === 'standings') {
      loadStandings();
    } else if (activeTab === 'matches') {
      loadMatches();
    } else if (activeTab === 'teams') {
      loadTeams();
    }
  }, [activeTab, loadDashboard, loadStandings, loadMatches, loadTeams]);

  // Handlers for Match Score
  const handleOpenScoreModal = (match) => {
    setSelectedMatchForScore(match);
    setIsScoreModalOpen(true);
  };

  const handleSaveScore = async (matchId, scoreData) => {
    try {
      await sportsApi.recordScore(matchId, scoreData);
      showToast('¡Marcador oficial registrado y tabla de posiciones actualizada!');
      // Refresh current view
      if (activeTab === 'dashboard') loadDashboard();
      if (activeTab === 'standings') loadStandings();
      if (activeTab === 'matches') loadMatches();
    } catch (err) {
      showToast(err.response?.data?.error || 'Error al registrar marcador', 'error');
      throw err;
    }
  };

  // Handlers for Match Creation / Deletion
  const handleSaveMatch = async (matchData) => {
    try {
      await sportsApi.createMatch(matchData);
      showToast('¡Encuentro programado exitosamente!');
      loadMatches();
      if (activeTab === 'dashboard') loadDashboard();
    } catch (err) {
      showToast(err.response?.data?.error || 'Error al programar partido', 'error');
      throw err;
    }
  };

  const handleDeleteMatch = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este encuentro?')) return;
    try {
      await sportsApi.deleteMatch(id);
      showToast('Partido eliminado');
      loadMatches();
      if (activeTab === 'dashboard') loadDashboard();
      if (activeTab === 'standings') loadStandings();
    } catch (err) {
      showToast('Error al eliminar partido', 'error');
    }
  };

  // Handlers for Team Creation / Update / Deletion
  const handleOpenNewTeam = () => {
    setTeamToEdit(null);
    setIsTeamModalOpen(true);
  };

  const handleEditTeam = (team) => {
    setTeamToEdit(team);
    setIsTeamModalOpen(true);
  };

  const handleSaveTeam = async (teamData) => {
    try {
      if (teamToEdit) {
        await sportsApi.updateTeam(teamToEdit.id, teamData);
        showToast(`¡Club '${teamData.name}' actualizado!`);
      } else {
        await sportsApi.createTeam(teamData);
        showToast(`¡Club '${teamData.name}' registrado con éxito!`);
      }
      loadTeams();
      if (activeTab === 'dashboard') loadDashboard();
      if (activeTab === 'standings') loadStandings();
    } catch (err) {
      showToast(err.response?.data?.error || 'Error al guardar club', 'error');
      throw err;
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este club?')) return;
    try {
      await sportsApi.deleteTeam(id);
      showToast('Club eliminado');
      loadTeams();
      if (activeTab === 'dashboard') loadDashboard();
      if (activeTab === 'standings') loadStandings();
    } catch (err) {
      showToast('Error al eliminar club', 'error');
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewMatch={() => setIsMatchModalOpen(true)}
        onOpenNewTeam={handleOpenNewTeam}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            data={dashboardData}
            loading={loading}
            onOpenScoreModal={handleOpenScoreModal}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'standings' && (
          <StandingsView
            standings={standings}
            loading={loading}
            onRefresh={loadStandings}
            onOpenNewMatch={() => setIsMatchModalOpen(true)}
          />
        )}

        {activeTab === 'matches' && (
          <MatchesView
            matches={matches}
            matchDays={matchDays}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedMatchDay={selectedMatchDay}
            setSelectedMatchDay={setSelectedMatchDay}
            onOpenNewMatch={() => setIsMatchModalOpen(true)}
            onOpenScoreModal={handleOpenScoreModal}
            onDeleteMatch={handleDeleteMatch}
          />
        )}

        {activeTab === 'teams' && (
          <TeamsView
            teams={teams}
            onOpenNewTeam={handleOpenNewTeam}
            onEditTeam={handleEditTeam}
            onDeleteTeam={handleDeleteTeam}
          />
        )}
      </main>

      {/* Modals */}
      <ScoreModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        match={selectedMatchForScore}
        onSave={handleSaveScore}
      />

      <MatchModal
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
        teams={teams}
        onSave={handleSaveMatch}
      />

      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        teamToEdit={teamToEdit}
        onSave={handleSaveTeam}
      />

      {/* Notification Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-200">ScoreCraft</span> &copy; 2026 - Proyecto Integrador de Microservicios (Ciclo VIII).
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
              Gateway: 8080
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-blue-300">
              Teams: 8081
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-emerald-300">
              Matches: 8082
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-amber-300">
              Standings: 8083
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
