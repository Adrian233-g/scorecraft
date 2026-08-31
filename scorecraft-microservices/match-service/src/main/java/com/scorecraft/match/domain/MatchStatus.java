package com.scorecraft.match.domain;

public enum MatchStatus {
    SCHEDULED("Programado"),
    IN_PROGRESS("En Juego"),
    FINISHED("Finalizado"),
    CANCELLED("Cancelado");

    private final String displayName;

    MatchStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
