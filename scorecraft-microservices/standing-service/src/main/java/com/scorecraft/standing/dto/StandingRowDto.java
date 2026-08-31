package com.scorecraft.standing.dto;

import java.util.ArrayList;
import java.util.List;

public class StandingRowDto {
    private int position;
    private Long teamId;
    private String teamName;
    private String shortName;
    private String logoUrl;
    private String primaryColor;
    private int played;
    private int won;
    private int drawn;
    private int lost;
    private int goalsFor;
    private int goalsAgainst;
    private int goalDifference;
    private int points;
    private List<String> recentForm = new ArrayList<>();

    public StandingRowDto() {
    }

    public StandingRowDto(TeamDto team) {
        this.teamId = team.getId();
        this.teamName = team.getName();
        this.shortName = team.getShortName();
        this.logoUrl = team.getLogoUrl();
        this.primaryColor = team.getPrimaryColor();
        this.played = 0;
        this.won = 0;
        this.drawn = 0;
        this.lost = 0;
        this.goalsFor = 0;
        this.goalsAgainst = 0;
        this.goalDifference = 0;
        this.points = 0;
    }

    public void addWin(int scored, int conceded) {
        this.played++;
        this.won++;
        this.goalsFor += scored;
        this.goalsAgainst += conceded;
        this.goalDifference = this.goalsFor - this.goalsAgainst;
        this.points += 3;
        this.recentForm.add("W");
    }

    public void addDraw(int scored, int conceded) {
        this.played++;
        this.drawn++;
        this.goalsFor += scored;
        this.goalsAgainst += conceded;
        this.goalDifference = this.goalsFor - this.goalsAgainst;
        this.points += 1;
        this.recentForm.add("D");
    }

    public void addLoss(int scored, int conceded) {
        this.played++;
        this.lost++;
        this.goalsFor += scored;
        this.goalsAgainst += conceded;
        this.goalDifference = this.goalsFor - this.goalsAgainst;
        this.recentForm.add("L");
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getPrimaryColor() {
        return primaryColor;
    }

    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }

    public int getPlayed() {
        return played;
    }

    public void setPlayed(int played) {
        this.played = played;
    }

    public int getWon() {
        return won;
    }

    public void setWon(int won) {
        this.won = won;
    }

    public int getDrawn() {
        return drawn;
    }

    public void setDrawn(int drawn) {
        this.drawn = drawn;
    }

    public int getLost() {
        return lost;
    }

    public void setLost(int lost) {
        this.lost = lost;
    }

    public int getGoalsFor() {
        return goalsFor;
    }

    public void setGoalsFor(int goalsFor) {
        this.goalsFor = goalsFor;
    }

    public int getGoalsAgainst() {
        return goalsAgainst;
    }

    public void setGoalsAgainst(int goalsAgainst) {
        this.goalsAgainst = goalsAgainst;
    }

    public int getGoalDifference() {
        return goalDifference;
    }

    public void setGoalDifference(int goalDifference) {
        this.goalDifference = goalDifference;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public List<String> getRecentForm() {
        return recentForm;
    }

    public void setRecentForm(List<String> recentForm) {
        this.recentForm = recentForm;
    }
}
