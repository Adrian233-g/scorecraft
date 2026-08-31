package com.scorecraft.layers.dto;

import com.scorecraft.layers.domain.Team;
import java.util.ArrayList;
import java.util.List;

public class StandingRowDto {
    private int position;
    private Team team;
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

    public StandingRowDto(Team team) {
        this.team = team;
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

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
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
