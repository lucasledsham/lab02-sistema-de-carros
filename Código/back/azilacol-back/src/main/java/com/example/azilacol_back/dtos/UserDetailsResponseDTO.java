package com.example.azilacol_back.dtos;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record UserDetailsResponseDTO(String email, String name) {
}

