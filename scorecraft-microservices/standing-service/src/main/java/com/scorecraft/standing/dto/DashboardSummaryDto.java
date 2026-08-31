package com.scorecraft.standing.dto;

import java.util.List;

public class DashboardSummaryDto {
    private long teamCount;
    private long totalMatches;
    private long finishedMatches;
    private StandingRowDto leader;
    private List<StandingRowDto> topStandings;
    private List<MatchDto> recentMatches;
    private List<MatchDto> upcomingMatches;

    public DashboardSummaryDto() {
    }

    public long getTeamCount() {
        return teamCount;
    }

    public void setTeamCount(long teamCount) {
        this.teamCount = teamCount;
    }

    public long getTotalMatches() {
        return totalMatches;
    }

    public void setTotalMatches(long totalMatches) {
        this.totalMatches = totalMatches;
    }

    public long getFinishedMatches() {
        return finishedMatches;
    }

    public void setFinishedMatches(long finishedMatches) {
        this.finishedMatches = finishedMatches;
    }

    public StandingRowDto getLeader() {
        return leader;
    }

    public void setLeader(StandingRowDto leader) {
        this.leader = leader;
    }

    public List<StandingRowDto> getTopStandings() {
        return topStandings;
    }

    public void setTopStandings(List<StandingRowDto> topStandings) {
        this.topStandings = topStandings;
    }

    public List<MatchDto> getRecentMatches() {
        return recentMatches;
    }

    public void setRecentMatches(List<MatchDto> recentMatches) {
        this.recentMatches = recentMatches;
    }

    public List<MatchDto> getUpcomingMatches() {
        return upcomingMatches;
    }

    public void setUpcomingMatches(List<MatchDto> upcomingMatches) {
        this.upcomingMatches = upcomingMatches;
    }
}
