package com.scorecraft.layers.service;

import com.scorecraft.layers.domain.Match;
import com.scorecraft.layers.domain.MatchStatus;
import com.scorecraft.layers.domain.Team;
import com.scorecraft.layers.dto.StandingRowDto;
import com.scorecraft.layers.repository.MatchRepository;
import com.scorecraft.layers.repository.TeamRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StandingServiceTest {

    @Mock
    private TeamRepository teamRepository;

    @Mock
    private MatchRepository matchRepository;

    @InjectMocks
    private StandingService standingService;

    private Team teamA;
    private Team teamB;
    private Team teamC;

    @BeforeEach
    void setUp() {
        teamA = new Team("Equipo A", "EAA", "Lima", "Estadio A", "", "#000000");
        teamA.setId(1L);

        teamB = new Team("Equipo B", "EBB", "Arequipa", "Estadio B", "", "#000000");
        teamB.setId(2L);

        teamC = new Team("Equipo C", "ECC", "Cusco", "Estadio C", "", "#000000");
        teamC.setId(3L);
    }

    @Test
    void testCalculateStandings_CorrectPointsAndOrder() {
        // Arrange
        when(teamRepository.findAll()).thenReturn(List.of(teamA, teamB, teamC));

        // Match 1: Team A 3 - 0 Team B (A wins -> 3 pts, B lost -> 0 pts)
        Match m1 = new Match(teamA, teamB, 1, LocalDateTime.now());
        m1.setId(10L);
        m1.setHomeScore(3);
        m1.setAwayScore(0);
        m1.setStatus(MatchStatus.FINISHED);

        // Match 2: Team B 2 - 2 Team C (Draw -> 1 pt each)
        Match m2 = new Match(teamB, teamC, 2, LocalDateTime.now());
        m2.setId(20L);
        m2.setHomeScore(2);
        m2.setAwayScore(2);
        m2.setStatus(MatchStatus.FINISHED);

        when(matchRepository.findByStatusOrderByMatchDateAsc(MatchStatus.FINISHED)).thenReturn(List.of(m1, m2));

        // Act
        List<StandingRowDto> standings = standingService.calculateStandings();

        // Assert
        assertEquals(3, standings.size());

        // 1st Place: Team A (1 PJ, 1 PG, 3 GF, 0 GC, +3 DG, 3 PTS)
        StandingRowDto first = standings.get(0);
        assertEquals("Equipo A", first.getTeam().getName());
        assertEquals(1, first.getPosition());
        assertEquals(1, first.getPlayed());
        assertEquals(1, first.getWon());
        assertEquals(3, first.getPoints());
        assertEquals(3, first.getGoalDifference());

        // 2nd Place: Team C (1 PJ, 0 PG, 1 PE, 2 GF, 2 GC, 0 DG, 1 PTS)
        StandingRowDto second = standings.get(1);
        assertEquals("Equipo C", second.getTeam().getName());
        assertEquals(2, second.getPosition());
        assertEquals(1, second.getPoints());
        assertEquals(0, second.getGoalDifference());

        // 3rd Place: Team B (2 PJ, 0 PG, 1 PE, 1 PP, 2 GF, 5 GC, -3 DG, 1 PTS)
        StandingRowDto third = standings.get(2);
        assertEquals("Equipo B", third.getTeam().getName());
        assertEquals(3, third.getPosition());
        assertEquals(2, third.getPlayed());
        assertEquals(1, third.getPoints());
        assertEquals(-3, third.getGoalDifference());
    }
}
