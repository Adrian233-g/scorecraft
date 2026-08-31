package com.scorecraft.standing.controller;

import com.scorecraft.standing.dto.DashboardSummaryDto;
import com.scorecraft.standing.dto.StandingRowDto;
import com.scorecraft.standing.service.StandingCalculationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/standings")
public class StandingRestController {

    private final StandingCalculationService standingCalculationService;

    public StandingRestController(StandingCalculationService standingCalculationService) {
        this.standingCalculationService = standingCalculationService;
    }

    @GetMapping
    public List<StandingRowDto> getStandings() {
        return standingCalculationService.calculateStandings();
    }

    @GetMapping("/dashboard")
    public DashboardSummaryDto getDashboardSummary() {
        return standingCalculationService.getDashboardSummary();
    }
}
