package com.scorecraft.layers.service;

import com.scorecraft.layers.domain.Match;
import com.scorecraft.layers.domain.MatchStatus;
import com.scorecraft.layers.domain.Team;
import com.scorecraft.layers.dto.MatchCreateDto;
import com.scorecraft.layers.dto.MatchScoreDto;
import com.scorecraft.layers.repository.MatchRepository;
import com.scorecraft.layers.repository.TeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class MatchService {

    private final MatchRepository matchRepository;
    private final TeamRepository teamRepository;

    public MatchService(MatchRepository matchRepository, TeamRepository teamRepository) {
        this.matchRepository = matchRepository;
        this.teamRepository = teamRepository;
    }

    @Transactional(readOnly = true)
    public List<Match> getAllMatches() {
        return matchRepository.findAllByOrderByMatchDateDesc();
    }

    @Transactional(readOnly = true)
    public List<Match> getMatchesByStatus(MatchStatus status) {
        return matchRepository.findByStatusOrderByMatchDateAsc(status);
    }

    @Transactional(readOnly = true)
    public List<Match> getMatchesByMatchDay(Integer matchDay) {
        return matchRepository.findByMatchDayOrderByMatchDateAsc(matchDay);
    }

    @Transactional(readOnly = true)
    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }

    public Match createMatch(MatchCreateDto dto) {
        if (Objects.equals(dto.getHomeTeamId(), dto.getAwayTeamId())) {
            throw new IllegalArgumentException("El equipo local y el equipo visitante no pueden ser el mismo.");
        }

        Team homeTeam = teamRepository.findById(dto.getHomeTeamId())
                .orElseThrow(() -> new IllegalArgumentException("Equipo local no encontrado"));

        Team awayTeam = teamRepository.findById(dto.getAwayTeamId())
                .orElseThrow(() -> new IllegalArgumentException("Equipo visitante no encontrado"));

        Match match = new Match(homeTeam, awayTeam, dto.getMatchDay(), dto.getMatchDate());
        return matchRepository.save(match);
    }

    public Match recordResult(Long matchId, MatchScoreDto scoreDto) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new IllegalArgumentException("Encuentro no encontrado"));

        match.setHomeScore(scoreDto.getHomeScore());
        match.setAwayScore(scoreDto.getAwayScore());
        match.setStatus(scoreDto.getStatus() != null ? scoreDto.getStatus() : MatchStatus.FINISHED);

        return matchRepository.save(match);
    }

    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Match> getRecentFinishedMatches() {
        return matchRepository.findTop5ByStatusOrderByMatchDateDesc(MatchStatus.FINISHED);
    }

    @Transactional(readOnly = true)
    public List<Match> getUpcomingMatches() {
        return matchRepository.findTop5ByStatusOrderByMatchDateAsc(MatchStatus.SCHEDULED);
    }

    @Transactional(readOnly = true)
    public List<Integer> getDistinctMatchDays() {
        return matchRepository.findDistinctMatchDays();
    }

    @Transactional(readOnly = true)
    public long countTotalMatches() {
        return matchRepository.count();
    }

    @Transactional(readOnly = true)
    public long countFinishedMatches() {
        return matchRepository.findByStatus(MatchStatus.FINISHED).size();
    }
}
