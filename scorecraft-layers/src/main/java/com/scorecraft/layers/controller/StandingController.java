package com.scorecraft.layers.controller;

import com.scorecraft.layers.dto.StandingRowDto;
import com.scorecraft.layers.service.MatchService;
import com.scorecraft.layers.service.StandingService;
import com.scorecraft.layers.service.TeamService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/standings")
public class StandingController {

    private final StandingService standingService;
    private final TeamService teamService;
    private final MatchService matchService;

    public StandingController(StandingService standingService, TeamService teamService, MatchService matchService) {
        this.standingService = standingService;
        this.teamService = teamService;
        this.matchService = matchService;
    }

    @GetMapping
    public String viewStandings(Model model) {
        model.addAttribute("activeTab", "standings");
        List<StandingRowDto> standings = standingService.calculateStandings();
        model.addAttribute("standings", standings);
        model.addAttribute("totalTeams", teamService.countTeams());
        model.addAttribute("finishedMatches", matchService.countFinishedMatches());
        return "standings/table";
    }
}
