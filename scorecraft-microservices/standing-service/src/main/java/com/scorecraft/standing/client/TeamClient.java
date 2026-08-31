package com.scorecraft.standing.client;

import com.scorecraft.standing.dto.TeamDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Collections;
import java.util.List;

@Component
public class TeamClient {

    private final RestClient restClient;

    public TeamClient(@Value("${services.team-url:http://localhost:8081}") String teamServiceUrl) {
        this.restClient = RestClient.builder()
                .baseUrl(teamServiceUrl)
                .build();
    }

    public List<TeamDto> getAllTeams() {
        try {
            return restClient.get()
                    .uri("/api/teams")
                    .retrieve()
                    .body(new ParameterizedTypeReference<List<TeamDto>>() {});
        } catch (Exception ex) {
            return Collections.emptyList();
        }
    }
}
