package com.scorecraft.match.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El ID del equipo local es obligatorio")
    @Column(name = "home_team_id", nullable = false)
    private Long homeTeamId;

    @NotNull(message = "El ID del equipo visitante es obligatorio")
    @Column(name = "away_team_id", nullable = false)
    private Long awayTeamId;

    @Column(name = "home_team_name")
    private String homeTeamName;

    @Column(name = "away_team_name")
    private String awayTeamName;

    @Column(name = "home_team_logo", length = 500)
    private String homeTeamLogo;

    @Column(name = "away_team_logo", length = 500)
    private String awayTeamLogo;

    @Column(name = "match_day")
    private Integer matchDay = 1;

    @NotNull(message = "La fecha y hora del encuentro es obligatoria")
    @Column(name = "match_date", nullable = false)
    private LocalDateTime matchDate;

    @Column(name = "home_score")
    private Integer homeScore;

    @Column(name = "away_score")
    private Integer awayScore;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MatchStatus status = MatchStatus.SCHEDULED;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Match() {
    }

    public Match(Long homeTeamId, Long awayTeamId, String homeTeamName, String awayTeamName,
                 String homeTeamLogo, String awayTeamLogo, Integer matchDay, LocalDateTime matchDate) {
        this.homeTeamId = homeTeamId;
        this.awayTeamId = awayTeamId;
        this.homeTeamName = homeTeamName;
        this.awayTeamName = awayTeamName;
        this.homeTeamLogo = homeTeamLogo;
        this.awayTeamLogo = awayTeamLogo;
        this.matchDay = matchDay;
        this.matchDate = matchDate;
        this.status = MatchStatus.SCHEDULED;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = MatchStatus.SCHEDULED;
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Match match)) return false;
        return Objects.equals(id, match.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
