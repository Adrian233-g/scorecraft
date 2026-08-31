package com.scorecraft.standing.client;

import com.scorecraft.standing.dto.MatchDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Collections;
import java.util.List;

@Component
public class MatchClient {

    private final RestClient restClient;

    public MatchClient(@Value("${services.match-url:http://localhost:8082}") String matchServiceUrl) {
        this.restClient = RestClient.builder()
                .baseUrl(matchServiceUrl)
                .build();
    }

    public List<MatchDto> getAllMatches() {
        try {
            return restClient.get()
                    .uri("/api/matches")
                    .retrieve()
                    .body(new ParameterizedTypeReference<List<MatchDto>>() {});
        } catch (Exception ex) {
            return Collections.emptyList();
        }
    }

    public List<MatchDto> getFinishedMatches() {
        try {
            return restClient.get()
                    .uri("/api/matches/finished")
                    .retrieve()
                    .body(new ParameterizedTypeReference<List<MatchDto>>() {});
        } catch (Exception ex) {
            return Collections.emptyList();
        }
    }
}
