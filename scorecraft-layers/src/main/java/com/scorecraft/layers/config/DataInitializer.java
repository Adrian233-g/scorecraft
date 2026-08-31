package com.scorecraft.layers.config;

import com.scorecraft.layers.domain.Match;
import com.scorecraft.layers.domain.MatchStatus;
import com.scorecraft.layers.domain.Team;
import com.scorecraft.layers.repository.MatchRepository;
import com.scorecraft.layers.repository.TeamRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(TeamRepository teamRepository, MatchRepository matchRepository) {
        return args -> {
            if (teamRepository.count() == 0) {
                // Initialize Teams
                Team alianza = new Team(
                        "Alianza Lima",
                        "ALI",
                        "Lima",
                        "Alejandro Villanueva",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Escudo_del_Club_Alianza_Lima.svg/300px-Escudo_del_Club_Alianza_Lima.svg.png",
                        "#002B7F"
                );

                Team universitario = new Team(
                        "Universitario de Deportes",
                        "UNI",
                        "Lima",
                        "Monumental U Marathon",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Escudo_del_Club_Universitario_de_Deportes.svg/300px-Escudo_del_Club_Universitario_de_Deportes.svg.png",
                        "#8B1C28"
                );

                Team cristal = new Team(
                        "Sporting Cristal",
                        "CRI",
                        "Lima",
                        "Alberto Gallardo",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Escudo_del_Club_Sporting_Cristal.svg/300px-Escudo_del_Club_Sporting_Cristal.svg.png",
                        "#00A3E0"
                );

                Team melgar = new Team(
                        "FBC Melgar",
                        "MEL",
                        "Arequipa",
                        "Monumental de la UNSA",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Escudo_de_FBC_Melgar.svg/300px-Escudo_de_FBC_Melgar.svg.png",
                        "#E30613"
                );

                Team cienciano = new Team(
                        "Cienciano",
                        "CIE",
                        "Cusco",
                        "Inca Garcilaso de la Vega",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Escudo_del_Club_Cienciano.svg/300px-Escudo_del_Club_Cienciano.svg.png",
                        "#C8102E"
                );

                Team cusco = new Team(
                        "Cusco FC",
                        "CUS",
                        "Cusco",
                        "Inca Garcilaso de la Vega",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Escudo_Cusco_FC.svg/300px-Escudo_Cusco_FC.svg.png",
                        "#D4AF37"
                );

                teamRepository.saveAll(List.of(alianza, universitario, cristal, melgar, cienciano, cusco));

                // Initialize Matches (Jornada 1)
                LocalDateTime now = LocalDateTime.now();

                // Match 1: Alianza Lima 2 - 1 Universitario (FINISHED)
                Match m1 = new Match(alianza, universitario, 1, now.minusDays(2).withHour(15).withMinute(0));
                m1.setHomeScore(2);
                m1.setAwayScore(1);
                m1.setStatus(MatchStatus.FINISHED);

                // Match 2: Sporting Cristal 3 - 3 Melgar (FINISHED)
                Match m2 = new Match(cristal, melgar, 1, now.minusDays(2).withHour(18).withMinute(0));
                m2.setHomeScore(3);
                m2.setAwayScore(3);
                m2.setStatus(MatchStatus.FINISHED);

                // Match 3: Cienciano 1 - 0 Cusco FC (FINISHED)
                Match m3 = new Match(cienciano, cusco, 1, now.minusDays(1).withHour(15).withMinute(30));
                m3.setHomeScore(1);
                m3.setAwayScore(0);
                m3.setStatus(MatchStatus.FINISHED);

                // Initialize Matches (Jornada 2 - SCHEDULED)
                Match m4 = new Match(universitario, cristal, 2, now.plusDays(2).withHour(16).withMinute(0));
                Match m5 = new Match(melgar, cienciano, 2, now.plusDays(3).withHour(15).withMinute(0));
                Match m6 = new Match(cusco, alianza, 2, now.plusDays(3).withHour(18).withMinute(0));

                matchRepository.saveAll(List.of(m1, m2, m3, m4, m5, m6));
            }
        };
    }
}
