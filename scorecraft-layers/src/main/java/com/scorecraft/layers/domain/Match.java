package com.scorecraft.layers.domain;

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

    @NotNull(message = "El equipo local es obligatorio")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "home_team_id", nullable = false)
    private Team homeTeam;

    @NotNull(message = "El equipo visitante es obligatorio")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "away_team_id", nullable = false)
    private Team awayTeam;

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

    public Match(Team homeTeam, Team awayTeam, Integer matchDay, LocalDateTime matchDate) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
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

    // Helper business methods
    public boolean isFinished() {
        return this.status == MatchStatus.FINISHED;
    }

    public boolean isDraw() {
        return isFinished() && Objects.equals(homeScore, awayScore);
    }

    public Team getWinner() {
        if (!isFinished() || isDraw()) return null;
        return homeScore > awayScore ? homeTeam : awayTeam;
    }

    public Team getLoser() {
        if (!isFinished() || isDraw()) return null;
        return homeScore > awayScore ? awayTeam : homeTeam;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Team getHomeTeam() {
        return homeTeam;
    }

    public void setHomeTeam(Team homeTeam) {
        this.homeTeam = homeTeam;
    }

    public Team getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(Team awayTeam) {
        this.awayTeam = awayTeam;
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
