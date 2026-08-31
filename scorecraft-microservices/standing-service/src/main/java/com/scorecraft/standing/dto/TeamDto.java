package com.scorecraft.standing.dto;

public class TeamDto {
    private Long id;
    private String name;
    private String shortName;
    private String city;
    private String stadium;
    private String logoUrl;
    private String primaryColor;

    public TeamDto() {
    }

    public TeamDto(Long id, String name, String shortName, String city, String stadium, String logoUrl, String primaryColor) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.city = city;
        this.stadium = stadium;
        this.logoUrl = logoUrl;
        this.primaryColor = primaryColor;
    }

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
        this.shortName = shortName;
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
}
