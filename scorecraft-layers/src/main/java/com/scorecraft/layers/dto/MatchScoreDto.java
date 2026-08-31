package com.scorecraft.layers.dto;

import com.scorecraft.layers.domain.MatchStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class MatchScoreDto {

    @NotNull(message = "Los goles del local son obligatorios")
    @Min(value = 0, message = "Los goles no pueden ser negativos")
    private Integer homeScore;

    @NotNull(message = "Los goles del visitante son obligatorios")
    @Min(value = 0, message = "Los goles no pueden ser negativos")
    private Integer awayScore;

    private MatchStatus status = MatchStatus.FINISHED;

    public MatchScoreDto() {
    }

    public MatchScoreDto(Integer homeScore, Integer awayScore) {
        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.status = MatchStatus.FINISHED;
    }

    public Integer getHomeScore() {
        return homeScore;
    }

    public void setHomeScore(Integer homeScore) {
        this.homeScore = homeScore;
    }

    public Integer getAwayScore() {
        return awayScore;
    }

    public void setAwayScore(Integer awayScore) {
        this.awayScore = awayScore;
    }

    public MatchStatus getStatus() {
        return status;
    }

    public void setStatus(MatchStatus status) {
        this.status = status;
    }
}
