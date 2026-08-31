package com.scorecraft.layers.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDateTime;

public class MatchCreateDto {

    @NotNull(message = "Debe seleccionar el equipo local")
    private Long homeTeamId;

    @NotNull(message = "Debe seleccionar el equipo visitante")
    private Long awayTeamId;

    @NotNull(message = "La jornada es obligatoria")
    @Min(value = 1, message = "La jornada debe ser al menos 1")
    private Integer matchDay = 1;

    @NotNull(message = "La fecha y hora del partido es obligatoria")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime matchDate;

    public MatchCreateDto() {
        this.matchDate = LocalDateTime.now().plusDays(1).withMinute(0).withSecond(0).withNano(0);
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
