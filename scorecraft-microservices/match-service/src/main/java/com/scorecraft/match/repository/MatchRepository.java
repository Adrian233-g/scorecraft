package com.scorecraft.match.repository;

import com.scorecraft.match.domain.Match;
import com.scorecraft.match.domain.MatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findAllByOrderByMatchDateDesc();
    List<Match> findAllByOrderByMatchDateAsc();
    List<Match> findByStatusOrderByMatchDateAsc(MatchStatus status);
    List<Match> findByStatusOrderByMatchDateDesc(MatchStatus status);
    List<Match> findByMatchDayOrderByMatchDateAsc(Integer matchDay);
    List<Match> findByStatus(MatchStatus status);

    @Query("SELECT DISTINCT m.matchDay FROM Match m ORDER BY m.matchDay ASC")
    List<Integer> findDistinctMatchDays();
}
