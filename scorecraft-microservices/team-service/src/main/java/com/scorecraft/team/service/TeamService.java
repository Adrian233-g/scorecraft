package com.scorecraft.team.service;

import com.scorecraft.team.domain.Team;
import com.scorecraft.team.repository.TeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Transactional(readOnly = true)
    public List<Team> getAllTeams() {
        return teamRepository.findAllByOrderByNameAsc();
    }

    @Transactional(readOnly = true)
    public Optional<Team> getTeamById(Long id) {
        return teamRepository.findById(id);
    }

    public Team saveTeam(Team team) {
        if (team.getId() == null) {
            if (teamRepository.existsByNameIgnoreCase(team.getName())) {
                throw new IllegalArgumentException("Ya existe un equipo registrado con el nombre: " + team.getName());
            }
        } else {
            if (teamRepository.existsByNameIgnoreCaseAndIdNot(team.getName(), team.getId())) {
                throw new IllegalArgumentException("Ya existe otro equipo con el nombre: " + team.getName());
            }
        }
        return teamRepository.save(team);
    }

    public void deleteTeam(Long id) {
        teamRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public long countTeams() {
        return teamRepository.count();
    }
}
