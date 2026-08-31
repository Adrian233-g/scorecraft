package com.scorecraft.layers.repository;

import com.scorecraft.layers.domain.Match;
import com.scorecraft.layers.domain.MatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findAllByOrderByMatchDateAsc();
    List<Match> findAllByOrderByMatchDateDesc();
    List<Match> findByStatusOrderByMatchDateAsc(MatchStatus status);
    List<Match> findByStatusOrderByMatchDateDesc(MatchStatus status);
    List<Match> findByMatchDayOrderByMatchDateAsc(Integer matchDay);
    List<Match> findByStatus(MatchStatus status);
    
    @Query("SELECT DISTINCT m.matchDay FROM Match m ORDER BY m.matchDay ASC")
    List<Integer> findDistinctMatchDays();

    List<Match> findTop5ByStatusOrderByMatchDateDesc(MatchStatus status);
    List<Match> findTop5ByStatusOrderByMatchDateAsc(MatchStatus status);
}
