package com.scorecraft.layers.controller;

import com.scorecraft.layers.service.MatchService;
import com.scorecraft.layers.service.StandingService;
import com.scorecraft.layers.service.TeamService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    private final TeamService teamService;
    private final MatchService matchService;
    private final StandingService standingService;

    public HomeController(TeamService teamService, MatchService matchService, StandingService standingService) {
        this.teamService = teamService;
        this.matchService = matchService;
        this.standingService = standingService;
    }

    @GetMapping({"/", "/dashboard"})
    public String dashboard(Model model) {
        model.addAttribute("activeTab", "dashboard");
        model.addAttribute("teamCount", teamService.countTeams());
        model.addAttribute("totalMatches", matchService.countTotalMatches());
        model.addAttribute("finishedMatches", matchService.countFinishedMatches());
        model.addAttribute("topStandings", standingService.getTopStandings(5));
        model.addAttribute("recentMatches", matchService.getRecentFinishedMatches());
        model.addAttribute("upcomingMatches", matchService.getUpcomingMatches());
        return "dashboard";
    }
}
