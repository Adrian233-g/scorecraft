package com.scorecraft.match.controller;

import com.scorecraft.match.domain.Match;
import com.scorecraft.match.dto.MatchCreateDto;
import com.scorecraft.match.dto.MatchScoreDto;
import com.scorecraft.match.service.MatchService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/matches")
public class MatchRestController {

    private final MatchService matchService;

    public MatchRestController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping
    public List<Match> getAllMatches(@RequestParam(required = false) String status,
                                     @RequestParam(required = false) Integer matchDay) {
        return matchService.getAllMatches(status, matchDay);
    }

    @GetMapping("/finished")
    public List<Match> getFinishedMatches() {
        return matchService.getFinishedMatches();
    }

    @GetMapping("/matchdays")
    public List<Integer> getMatchDays() {
        return matchService.getMatchDays();
    }

    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        return Map.of(
                "total", matchService.countTotalMatches(),
                "finished", matchService.countFinishedMatches()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable Long id) {
        return matchService.getMatchById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createMatch(@Valid @RequestBody MatchCreateDto dto) {
        try {
            Match created = matchService.createMatch(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @PutMapping("/{id}/score")
    public ResponseEntity<?> recordScore(@PathVariable Long id, @Valid @RequestBody MatchScoreDto dto) {
        try {
            Match updated = matchService.recordScore(id, dto);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMatch(@PathVariable Long id) {
        try {
            matchService.deleteMatch(id);
            return ResponseEntity.ok(Map.of("message", "Partido eliminado exitosamente"));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("error", "Error al eliminar partido"));
        }
    }
}
