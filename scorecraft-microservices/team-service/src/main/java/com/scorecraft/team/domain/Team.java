package com.scorecraft.team.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre del equipo es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @NotBlank(message = "La abreviatura es obligatoria")
    @Size(min = 2, max = 5, message = "La abreviatura debe tener entre 2 y 5 caracteres")
    @Column(nullable = false, length = 5)
    private String shortName;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String stadium;

    @Column(length = 500)
    private String logoUrl;

    @Column(length = 20)
    private String primaryColor;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Team() {
    }

    public Team(String name, String shortName, String city, String stadium, String logoUrl, String primaryColor) {
        this.name = name;
        this.shortName = shortName != null ? shortName.toUpperCase() : null;
        this.city = city;
        this.stadium = stadium;
        this.logoUrl = logoUrl;
        this.primaryColor = primaryColor;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.shortName != null) {
            this.shortName = this.shortName.toUpperCase();
        }
        if (this.primaryColor == null || this.primaryColor.isBlank()) {
            this.primaryColor = "#3B82F6";
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName != null ? shortName.toUpperCase() : null;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStadium() {
        return stadium;
    }

    public void setStadium(String stadium) {
        this.stadium = stadium;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getPrimaryColor() {
        return primaryColor;
    }

    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Team team)) return false;
        return Objects.equals(id, team.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
