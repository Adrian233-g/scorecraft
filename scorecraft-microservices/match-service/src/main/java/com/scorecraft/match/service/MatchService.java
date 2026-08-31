package com.scorecraft.match.service;

import com.scorecraft.match.domain.Match;
import com.scorecraft.match.domain.MatchStatus;
import com.scorecraft.match.dto.MatchCreateDto;
import com.scorecraft.match.dto.MatchScoreDto;
import com.scorecraft.match.repository.MatchRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class MatchService {

    private final MatchRepository matchRepository;

    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    @Transactional(readOnly = true)
    public List<Match> getAllMatches(String status, Integer matchDay) {
        if (matchDay != null) {
            return matchRepository.findByMatchDayOrderByMatchDateAsc(matchDay);
        }
        if (status != null && !status.isBlank()) {
            try {
                MatchStatus matchStatus = MatchStatus.valueOf(status.toUpperCase());
                return matchRepository.findByStatusOrderByMatchDateAsc(matchStatus);
            } catch (IllegalArgumentException ignored) {
            }
        }
        return matchRepository.findAllByOrderByMatchDateDesc();
    }

    @Transactional(readOnly = true)
    public List<Match> getFinishedMatches() {
        return matchRepository.findByStatusOrderByMatchDateAsc(MatchStatus.FINISHED);
    }

    @Transactional(readOnly = true)
    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }

    public Match createMatch(MatchCreateDto dto) {
        if (Objects.equals(dto.getHomeTeamId(), dto.getAwayTeamId())) {
            throw new IllegalArgumentException("El equipo local y visitante no pueden ser el mismo.");
        }

        Match match = new Match(
                dto.getHomeTeamId(),
                dto.getAwayTeamId(),
                dto.getHomeTeamName(),
                dto.getAwayTeamName(),
                dto.getHomeTeamLogo(),
                dto.getAwayTeamLogo(),
                dto.getMatchDay(),
                dto.getMatchDate()
        );

        return matchRepository.save(match);
    }

    public Match recordScore(Long matchId, MatchScoreDto scoreDto) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new IllegalArgumentException("Partido no encontrado"));

        match.setHomeScore(scoreDto.getHomeScore());
        match.setAwayScore(scoreDto.getAwayScore());
        match.setStatus(scoreDto.getStatus() != null ? scoreDto.getStatus() : MatchStatus.FINISHED);

        return matchRepository.save(match);
    }

    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Integer> getMatchDays() {
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
