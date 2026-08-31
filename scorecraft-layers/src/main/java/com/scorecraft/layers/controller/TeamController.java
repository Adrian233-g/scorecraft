package com.scorecraft.layers.controller;

import com.scorecraft.layers.domain.Team;
import com.scorecraft.layers.service.TeamService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public String listTeams(Model model) {
        model.addAttribute("activeTab", "teams");
        model.addAttribute("teams", teamService.getAllTeams());
        return "teams/list";
    }

    @GetMapping("/new")
    public String showCreateForm(Model model) {
        model.addAttribute("activeTab", "teams");
        model.addAttribute("team", new Team());
        model.addAttribute("isEdit", false);
        return "teams/form";
    }

    @PostMapping("/save")
    public String saveTeam(@Valid @ModelAttribute("team") Team team,
                           BindingResult result,
                           Model model,
                           RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            model.addAttribute("activeTab", "teams");
            model.addAttribute("isEdit", team.getId() != null);
            return "teams/form";
        }

        try {
            teamService.saveTeam(team);
            redirectAttributes.addFlashAttribute("successMessage", "¡Equipo '" + team.getName() + "' guardado correctamente!");
            return "redirect:/teams";
        } catch (IllegalArgumentException ex) {
            model.addAttribute("activeTab", "teams");
            model.addAttribute("isEdit", team.getId() != null);
            model.addAttribute("errorMessage", ex.getMessage());
            return "teams/form";
        }
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        return teamService.getTeamById(id)
                .map(team -> {
                    model.addAttribute("activeTab", "teams");
                    model.addAttribute("team", team);
                    model.addAttribute("isEdit", true);
                    return "teams/form";
                })
                .orElseGet(() -> {
                    redirectAttributes.addFlashAttribute("errorMessage", "Equipo no encontrado con ID: " + id);
                    return "redirect:/teams";
                });
    }

    @PostMapping("/delete/{id}")
    public String deleteTeam(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            teamService.deleteTeam(id);
            redirectAttributes.addFlashAttribute("successMessage", "Equipo eliminado con éxito.");
        } catch (Exception ex) {
            redirectAttributes.addFlashAttribute("errorMessage", "No se puede eliminar el equipo porque tiene partidos asociados.");
        }
        return "redirect:/teams";
    }
}
