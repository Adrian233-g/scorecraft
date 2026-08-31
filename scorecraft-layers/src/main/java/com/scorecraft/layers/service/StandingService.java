package com.scorecraft.layers.service;

import com.scorecraft.layers.domain.Match;
import com.scorecraft.layers.domain.MatchStatus;
import com.scorecraft.layers.domain.Team;
import com.scorecraft.layers.dto.StandingRowDto;
import com.scorecraft.layers.repository.MatchRepository;
import com.scorecraft.layers.repository.TeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class StandingService {

    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;

    public StandingService(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    /**
     * Calculates the league standings table dynamically from all finished matches.
     */
    public List<StandingRowDto> calculateStandings() {
        List<Team> teams = teamRepository.findAll();
        List<Match> finishedMatches = matchRepository.findByStatusOrderByMatchDateAsc(MatchStatus.FINISHED);

        // Initialize standings map for all registered teams
        Map<Long, StandingRowDto> standingsMap = new HashMap<>();
        for (Team team : teams) {
            standingsMap.put(team.getId(), new StandingRowDto(team));
        }

        // Process each finished match chronologically to compute stats and recent form
        for (Match match : finishedMatches) {
            StandingRowDto homeStats = standingsMap.get(match.getHomeTeam().getId());
            StandingRowDto awayStats = standingsMap.get(match.getAwayTeam().getId());

            if (homeStats == null || awayStats == null) {
                continue;
            }

            int homeScore = match.getHomeScore() != null ? match.getHomeScore() : 0;
            int awayScore = match.getAwayScore() != null ? match.getAwayScore() : 0;

            if (homeScore > awayScore) {
                homeStats.addWin(homeScore, awayScore);
                awayStats.addLoss(awayScore, homeScore);
            } else if (homeScore == awayScore) {
                homeStats.addDraw(homeScore, awayScore);
                awayStats.addDraw(awayScore, homeScore);
            } else {
                homeStats.addLoss(homeScore, awayScore);
                awayStats.addWin(awayScore, homeScore);
            }
        }

        // Sort rows by:
        // 1. Points DESC
        // 2. Goal Difference DESC
        // 3. Goals For DESC
        // 4. Team Name ASC
        List<StandingRowDto> sortedStandings = standingsMap.values().stream()
                .sorted(Comparator
                        .comparingInt(StandingRowDto::getPoints).reversed()
                        .thenComparing(Comparator.comparingInt(StandingRowDto::getGoalDifference).reversed())
                        .thenComparing(Comparator.comparingInt(StandingRowDto::getGoalsFor).reversed())
                        .thenComparing(row -> row.getTeam().getName().toLowerCase())
                )
                .collect(Collectors.toList());

        // Assign rankings and limit recent form to the last 5 results
        for (int i = 0; i < sortedStandings.size(); i++) {
            StandingRowDto row = sortedStandings.get(i);
            row.setPosition(i + 1);
            if (row.getRecentForm().size() > 5) {
                List<String> form = row.getRecentForm();
                row.setRecentForm(form.subList(form.size() - 5, form.size()));
            }
        }

        return sortedStandings;
    }

    public List<StandingRowDto> getTopStandings(int limit) {
        List<StandingRowDto> full = calculateStandings();
        return full.stream().limit(limit).collect(Collectors.toList());
    }
}
