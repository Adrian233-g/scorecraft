package com.scorecraft.gateway.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;

@RestController
public class GatewayProxyController {

    private final RestClient restClient;

    @Value("${services.team-url:http://localhost:8081}")
    private String teamServiceUrl;

    @Value("${services.match-url:http://localhost:8082}")
    private String matchServiceUrl;

    @Value("${services.standing-url:http://localhost:8083}")
    private String standingServiceUrl;

    public GatewayProxyController() {
        this.restClient = RestClient.builder().build();
    }

    @RequestMapping(value = {"/api/teams", "/api/teams/**", "/api/matches", "/api/matches/**", "/api/standings", "/api/standings/**"})
    public ResponseEntity<?> proxyRequest(HttpServletRequest request,
                                          @RequestBody(required = false) byte[] body) throws IOException {
        String uri = request.getRequestURI();
        String queryString = request.getQueryString();

        String targetBaseUrl;
        if (uri.startsWith("/api/teams")) {
            targetBaseUrl = teamServiceUrl;
        } else if (uri.startsWith("/api/matches")) {
            targetBaseUrl = matchServiceUrl;
        } else if (uri.startsWith("/api/standings")) {
            targetBaseUrl = standingServiceUrl;
        } else {
            return ResponseEntity.notFound().build();
        }

        String fullTargetUrl = targetBaseUrl + uri + (queryString != null ? "?" + queryString : "");
        HttpMethod method = HttpMethod.valueOf(request.getMethod());

        try {
            var requestSpec = restClient.method(method)
                    .uri(fullTargetUrl)
                    .headers(httpHeaders -> {
                        Collections.list(request.getHeaderNames()).forEach(headerName -> {
                            if (!headerName.equalsIgnoreCase("host") && !headerName.equalsIgnoreCase("content-length")) {
                                httpHeaders.addAll(headerName, Collections.list(request.getHeaders(headerName)));
                            }
                        });
                    });

            if (body != null && body.length > 0) {
                requestSpec.contentType(MediaType.parseMediaType(
                        request.getContentType() != null ? request.getContentType() : MediaType.APPLICATION_JSON_VALUE
                ));
                requestSpec.body(body);
            }

            return requestSpec.retrieve()
                    .toEntity(byte[].class);

        } catch (org.springframework.web.client.HttpClientErrorException | org.springframework.web.client.HttpServerErrorException ex) {
            return ResponseEntity.status(ex.getStatusCode())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(ex.getResponseBodyAsByteArray());
        } catch (Exception ex) {
            return ResponseEntity.status(503)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "Servicio no disponible: " + ex.getMessage()));
        }
    }
}
