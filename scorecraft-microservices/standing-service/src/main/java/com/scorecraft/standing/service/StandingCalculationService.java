package com.scorecraft.standing.service;

import com.scorecraft.standing.client.MatchClient;
import com.scorecraft.standing.client.TeamClient;
import com.scorecraft.standing.dto.DashboardSummaryDto;
import com.scorecraft.standing.dto.MatchDto;
import com.scorecraft.standing.dto.StandingRowDto;
import com.scorecraft.standing.dto.TeamDto;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StandingCalculationService {

    private final TeamClient teamClient;
    private final MatchClient matchClient;

    public StandingCalculationService(TeamClient teamClient, MatchClient matchClient) {
        this.teamClient = teamClient;
        this.matchClient = matchClient;
    }

    public List<StandingRowDto> calculateStandings() {
        List<TeamDto> teams = teamClient.getAllTeams();
        List<MatchDto> finishedMatches = matchClient.getFinishedMatches();

        Map<Long, StandingRowDto> map = new HashMap<>();
        for (TeamDto team : teams) {
            map.put(team.getId(), new StandingRowDto(team));
        }

        // Process each finished match
        for (MatchDto match : finishedMatches) {
            StandingRowDto homeStats = map.get(match.getHomeTeamId());
            StandingRowDto awayStats = map.get(match.getAwayTeamId());

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

        List<StandingRowDto> sorted = map.values().stream()
                .sorted(Comparator
                        .comparingInt(StandingRowDto::getPoints).reversed()
                        .thenComparing(Comparator.comparingInt(StandingRowDto::getGoalDifference).reversed())
                        .thenComparing(Comparator.comparingInt(StandingRowDto::getGoalsFor).reversed())
                        .thenComparing(row -> row.getTeamName() != null ? row.getTeamName().toLowerCase() : "")
                )
                .collect(Collectors.toList());

        for (int i = 0; i < sorted.size(); i++) {
            StandingRowDto row = sorted.get(i);
            row.setPosition(i + 1);
            if (row.getRecentForm().size() > 5) {
                List<String> form = row.getRecentForm();
                row.setRecentForm(form.subList(form.size() - 5, form.size()));
            }
        }

        return sorted;
    }

    public DashboardSummaryDto getDashboardSummary() {
        List<TeamDto> teams = teamClient.getAllTeams();
        List<MatchDto> allMatches = matchClient.getAllMatches();
        List<StandingRowDto> standings = calculateStandings();

        DashboardSummaryDto summary = new DashboardSummaryDto();
        summary.setTeamCount(teams.size());
        summary.setTotalMatches(allMatches.size());

        List<MatchDto> finished = allMatches.stream()
                .filter(m -> "FINISHED".equalsIgnoreCase(m.getStatus()))
                .collect(Collectors.toList());
        summary.setFinishedMatches(finished.size());

        if (!standings.isEmpty()) {
            summary.setLeader(standings.get(0));
            summary.setTopStandings(standings.stream().limit(5).collect(Collectors.toList()));
        } else {
            summary.setTopStandings(Collections.emptyList());
        }

        // Recent matches (last 4 finished)
        List<MatchDto> recent = finished.stream()
                .sorted(Comparator.comparing(MatchDto::getMatchDate, Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(4)
                .collect(Collectors.toList());
        summary.setRecentMatches(recent);

        // Upcoming matches (next 4 scheduled)
        List<MatchDto> upcoming = allMatches.stream()
                .filter(m -> "SCHEDULED".equalsIgnoreCase(m.getStatus()))
                .sorted(Comparator.comparing(MatchDto::getMatchDate, Comparator.nullsLast(Comparator.naturalOrder())))
                .limit(4)
                .collect(Collectors.toList());
        summary.setUpcomingMatches(upcoming);

        return summary;
    }
}
