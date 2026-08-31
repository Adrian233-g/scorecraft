package com.scorecraft.layers.controller;

import com.scorecraft.layers.domain.Match;
import com.scorecraft.layers.domain.MatchStatus;
import com.scorecraft.layers.dto.MatchCreateDto;
import com.scorecraft.layers.dto.MatchScoreDto;
import com.scorecraft.layers.service.MatchService;
import com.scorecraft.layers.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/matches")
public class MatchController {

    private final MatchService matchService;
    private final TeamService teamService;

    public MatchController(MatchService matchService, TeamService teamService) {
        this.matchService = matchService;
        this.teamService = teamService;
    }

    @GetMapping
    public String listMatches(@RequestParam(required = false) String status,
                              @RequestParam(required = false) Integer matchDay,
                              Model model) {
        model.addAttribute("activeTab", "matches");
        model.addAttribute("matchDays", matchService.getDistinctMatchDays());
        model.addAttribute("selectedStatus", status);
        model.addAttribute("selectedMatchDay", matchDay);

        List<Match> matches;
        if (matchDay != null) {
            matches = matchService.getMatchesByMatchDay(matchDay);
        } else if (status != null && !status.isBlank()) {
            try {
                MatchStatus matchStatus = MatchStatus.valueOf(status.toUpperCase());
                matches = matchService.getMatchesByStatus(matchStatus);
            } catch (IllegalArgumentException e) {
                matches = matchService.getAllMatches();
            }
        } else {
            matches = matchService.getAllMatches();
        }

        model.addAttribute("matches", matches);
        return "matches/list";
    }

    @GetMapping("/new")
    public String showCreateForm(Model model) {
        model.addAttribute("activeTab", "matches");
        model.addAttribute("matchDto", new MatchCreateDto());
        model.addAttribute("teams", teamService.getAllTeams());
        return "matches/form";
    }

    @PostMapping("/save")
    public String saveMatch(@Valid @ModelAttribute("matchDto") MatchCreateDto matchDto,
                            BindingResult result,
                            Model model,
                            RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            model.addAttribute("activeTab", "matches");
            model.addAttribute("teams", teamService.getAllTeams());
            return "matches/form";
        }

        try {
            matchService.createMatch(matchDto);
            redirectAttributes.addFlashAttribute("successMessage", "¡Partido programado con éxito!");
            return "redirect:/matches";
        } catch (IllegalArgumentException ex) {
            model.addAttribute("activeTab", "matches");
            model.addAttribute("teams", teamService.getAllTeams());
            model.addAttribute("errorMessage", ex.getMessage());
            return "matches/form";
        }
    }

    @GetMapping("/{id}/result")
    public String showRecordResultForm(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        return matchService.getMatchById(id)
                .map(match -> {
                    model.addAttribute("activeTab", "matches");
                    model.addAttribute("match", match);
                    MatchScoreDto scoreDto = new MatchScoreDto(
                            match.getHomeScore() != null ? match.getHomeScore() : 0,
                            match.getAwayScore() != null ? match.getAwayScore() : 0
                    );
                    scoreDto.setStatus(match.getStatus() == MatchStatus.FINISHED ? MatchStatus.FINISHED : MatchStatus.FINISHED);
                    model.addAttribute("scoreDto", scoreDto);
                    return "matches/score-form";
                })
                .orElseGet(() -> {
                    redirectAttributes.addFlashAttribute("errorMessage", "Partido no encontrado con ID: " + id);
                    return "redirect:/matches";
                });
    }

    @PostMapping("/{id}/result/save")
    public String saveMatchResult(@PathVariable Long id,
                                  @Valid @ModelAttribute("scoreDto") MatchScoreDto scoreDto,
                                  BindingResult result,
                                  Model model,
                                  RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            Match match = matchService.getMatchById(id).orElse(null);
            model.addAttribute("activeTab", "matches");
            model.addAttribute("match", match);
            return "matches/score-form";
        }

        try {
            matchService.recordResult(id, scoreDto);
            redirectAttributes.addFlashAttribute("successMessage", "¡Resultado registrado y tabla de posiciones actualizada!");
            return "redirect:/standings";
        } catch (IllegalArgumentException ex) {
            redirectAttributes.addFlashAttribute("errorMessage", ex.getMessage());
            return "redirect:/matches";
        }
    }

    @PostMapping("/{id}/delete")
    public String deleteMatch(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            matchService.deleteMatch(id);
            redirectAttributes.addFlashAttribute("successMessage", "Partido eliminado exitosamente.");
        } catch (Exception ex) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error al eliminar el partido.");
        }
        return "redirect:/matches";
    }
}
