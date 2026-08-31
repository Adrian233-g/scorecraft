import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sportsApi = {
  // Standings & Dashboard
  getDashboard: () => api.get('/standings/dashboard').then(res => res.data),
  getStandings: () => api.get('/standings').then(res => res.data),

  // Teams Service
  getTeams: () => api.get('/teams').then(res => res.data),
  getTeam: (id) => api.get(`/teams/${id}`).then(res => res.data),
  createTeam: (team) => api.post('/teams', team).then(res => res.data),
  updateTeam: (id, team) => api.put(`/teams/${id}`, team).then(res => res.data),
  deleteTeam: (id) => api.delete(`/teams/${id}`).then(res => res.data),

  // Match Service
  getMatches: (params) => api.get('/matches', { params }).then(res => res.data),
  getMatchDays: () => api.get('/matches/matchdays').then(res => res.data),
  createMatch: (match) => api.post('/matches', match).then(res => res.data),
  recordScore: (id, scoreData) => api.put(`/matches/${id}/score`, scoreData).then(res => res.data),
  deleteMatch: (id) => api.delete(`/matches/${id}`).then(res => res.data),
};

export default api;
