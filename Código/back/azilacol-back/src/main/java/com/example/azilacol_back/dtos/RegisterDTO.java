package com.example.azilacol_back.dtos;


import com.example.azilacol_back.models.UserRole;

import java.time.LocalDate;

public record RegisterDTO(String nome,
                          String password,
                          String email,
                          UserRole userRole
                          ) {
}
