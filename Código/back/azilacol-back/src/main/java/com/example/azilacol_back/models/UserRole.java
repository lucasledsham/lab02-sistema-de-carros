package com.example.azilacol_back.models;

import lombok.Getter;

@Getter
public enum UserRole {
    CLIENTE("cliente"),
    AGENTE("agente");

    private final String role;

    UserRole (String role){
        this.role = role;
    }
}
