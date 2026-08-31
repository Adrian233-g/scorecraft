package com.scorecraft.match.config;

import com.scorecraft.match.domain.Match;
import com.scorecraft.match.domain.MatchStatus;
import com.scorecraft.match.repository.MatchRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initMatches(MatchRepository matchRepository) {
        return args -> {
            if (matchRepository.count() == 0) {
                LocalDateTime now = LocalDateTime.now();

                // Match 1: Alianza Lima vs Universitario (Jornada 1 - FINISHED 2-1)
                Match m1 = new Match(1L, 2L, "Alianza Lima", "Universitario de Deportes",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Escudo_del_Club_Alianza_Lima.svg/300px-Escudo_del_Club_Alianza_Lima.svg.png",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Escudo_del_Club_Universitario_de_Deportes.svg/300px-Escudo_del_Club_Universitario_de_Deportes.svg.png",
                        1, now.minusDays(2).withHour(15).withMinute(0));
                m1.setHomeScore(2);
                m1.setAwayScore(1);
                m1.setStatus(MatchStatus.FINISHED);

                // Match 2: Sporting Cristal vs FBC Melgar (Jornada 1 - FINISHED 3-3)
                Match m2 = new Match(3L, 4L, "Sporting Cristal", "FBC Melgar",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Escudo_del_Club_Sporting_Cristal.svg/300px-Escudo_del_Club_Sporting_Cristal.svg.png",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Escudo_de_FBC_Melgar.svg/300px-Escudo_de_FBC_Melgar.svg.png",
                        1, now.minusDays(2).withHour(18).withMinute(0));
                m2.setHomeScore(3);
                m2.setAwayScore(3);
                m2.setStatus(MatchStatus.FINISHED);

                // Match 3: Cienciano vs Cusco FC (Jornada 1 - FINISHED 1-0)
                Match m3 = new Match(5L, 6L, "Cienciano", "Cusco FC",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Escudo_del_Club_Cienciano.svg/300px-Escudo_del_Club_Cienciano.svg.png",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Escudo_Cusco_FC.svg/300px-Escudo_Cusco_FC.svg.png",
                        1, now.minusDays(1).withHour(15).withMinute(30));
                m3.setHomeScore(1);
                m3.setAwayScore(0);
                m3.setStatus(MatchStatus.FINISHED);

                // Match 4: Universitario vs Sporting Cristal (Jornada 2 - SCHEDULED)
                Match m4 = new Match(2L, 3L, "Universitario de Deportes", "Sporting Cristal",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Escudo_del_Club_Universitario_de_Deportes.svg/300px-Escudo_del_Club_Universitario_de_Deportes.svg.png",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Escudo_del_Club_Sporting_Cristal.svg/300px-Escudo_del_Club_Sporting_Cristal.svg.png",
                        2, now.plusDays(2).withHour(16).withMinute(0));

                // Match 5: FBC Melgar vs Cienciano (Jornada 2 - SCHEDULED)
                Match m5 = new Match(4L, 5L, "FBC Melgar", "Cienciano",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Escudo_de_FBC_Melgar.svg/300px-Escudo_de_FBC_Melgar.svg.png",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Escudo_del_Club_Cienciano.svg/300px-Escudo_del_Club_Cienciano.svg.png",
                        2, now.plusDays(3).withHour(15).withMinute(0));

                // Match 6: Cusco FC vs Alianza Lima (Jornada 2 - SCHEDULED)
                Match m6 = new Match(6L, 1L, "Cusco FC", "Alianza Lima",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Escudo_Cusco_FC.svg/300px-Escudo_Cusco_FC.svg.png",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Escudo_del_Club_Alianza_Lima.svg/300px-Escudo_del_Club_Alianza_Lima.svg.png",
                        2, now.plusDays(3).withHour(18).withMinute(0));

                matchRepository.saveAll(List.of(m1, m2, m3, m4, m5, m6));
            }
        };
    }
}
