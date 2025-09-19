package com.example.azilacol_back.controllers;

import com.example.azilacol_back.dtos.AuthenticationDTO;
import com.example.azilacol_back.dtos.LoginResponseDTO;
import com.example.azilacol_back.dtos.RegisterDTO;
import com.example.azilacol_back.models.User;
import com.example.azilacol_back.models.UserRole;
import com.example.azilacol_back.repositories.UserRepository;
import com.example.azilacol_back.services.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.ArrayList;
import java.util.LinkedHashSet;


@RequestMapping("/auth")
@RequiredArgsConstructor
@Validated
@RestController
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody AuthenticationDTO loginAuthentication) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(
                loginAuthentication.nome(),
                loginAuthentication.password());

        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());

        UserRole userRole = userRepository.findByNome(loginAuthentication.nome()).getRole();

        return new LoginResponseDTO(token, loginAuthentication.nome(), userRole);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO register) {
        if (this.userRepository.findByNome(register.nome()) != null) return ResponseEntity.badRequest().build();

        String encriptedPassword = new BCryptPasswordEncoder().encode(register.password());
        User newUser = User.builder()
                .nome(register.nome())
                .password(encriptedPassword)
                .role(register.userRole())
                .email(register.email())
                .build();

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }

}
