package com.example.azilacol_back.dtos;


import com.example.azilacol_back.models.UserRole;

public record LoginResponseDTO(String token, String nome, UserRole role){
}
