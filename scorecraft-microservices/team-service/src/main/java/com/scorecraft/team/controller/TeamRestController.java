package com.scorecraft.team.controller;

import com.scorecraft.team.domain.Team;
import com.scorecraft.team.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/teams")
public class TeamRestController {

    private final TeamService teamService;

    public TeamRestController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Long id) {
        return teamService.getTeamById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createTeam(@Valid @RequestBody Team team) {
        try {
            Team created = teamService.saveTeam(team);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTeam(@PathVariable Long id, @Valid @RequestBody Team team) {
        return teamService.getTeamById(id)
                .map(existing -> {
                    team.setId(id);
                    try {
                        Team updated = teamService.saveTeam(team);
                        return ResponseEntity.ok(updated);
                    } catch (IllegalArgumentException ex) {
                        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTeam(@PathVariable Long id) {
        try {
            teamService.deleteTeam(id);
            return ResponseEntity.ok(Map.of("message", "Equipo eliminado correctamente"));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("error", "Error al eliminar equipo"));
        }
    }

    @GetMapping("/count")
    public Map<String, Long> countTeams() {
        return Map.of("count", teamService.countTeams());
    }
}
