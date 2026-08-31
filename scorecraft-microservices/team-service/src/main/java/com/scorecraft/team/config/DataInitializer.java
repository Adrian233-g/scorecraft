package com.scorecraft.team.config;

import com.scorecraft.team.domain.Team;
import com.scorecraft.team.repository.TeamRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(TeamRepository teamRepository) {
        return args -> {
            if (teamRepository.count() == 0) {
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
            }
        };
    }
}
