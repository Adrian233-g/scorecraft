package com.scorecraft.match.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class MatchCreateDto {

    @NotNull(message = "Debe seleccionar el equipo local")
    private Long homeTeamId;

    @NotNull(message = "Debe seleccionar el equipo visitante")
    private Long awayTeamId;

    private String homeTeamName;
    private String awayTeamName;
    private String homeTeamLogo;
    private String awayTeamLogo;

    @NotNull(message = "La jornada es obligatoria")
    @Min(value = 1, message = "La jornada debe ser al menos 1")
    private Integer matchDay = 1;

    @NotNull(message = "La fecha y hora es obligatoria")
    private LocalDateTime matchDate;

    public MatchCreateDto() {
    }

    public Long getHomeTeamId() {
        return homeTeamId;
    }

    public void setHomeTeamId(Long homeTeamId) {
        this.homeTeamId = homeTeamId;
    }

    public Long getAwayTeamId() {
        return awayTeamId;
    }

    public void setAwayTeamId(Long awayTeamId) {
        this.awayTeamId = awayTeamId;
    }

    public String getHomeTeamName() {
        return homeTeamName;
    }

    public void setHomeTeamName(String homeTeamName) {
        this.homeTeamName = homeTeamName;
    }

    public String getAwayTeamName() {
        return awayTeamName;
    }

    public void setAwayTeamName(String awayTeamName) {
        this.awayTeamName = awayTeamName;
    }

    public String getHomeTeamLogo() {
        return homeTeamLogo;
    }

    public void setHomeTeamLogo(String homeTeamLogo) {
        this.homeTeamLogo = homeTeamLogo;
    }

    public String getAwayTeamLogo() {
        return awayTeamLogo;
    }

    public void setAwayTeamLogo(String awayTeamLogo) {
        this.awayTeamLogo = awayTeamLogo;
    }

    public Integer getMatchDay() {
        return matchDay;
    }

    public void setMatchDay(Integer matchDay) {
        this.matchDay = matchDay;
    }

    public LocalDateTime getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(LocalDateTime matchDate) {
        this.matchDate = matchDate;
    }
}
