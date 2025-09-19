package com.example.azilacol_back.infra;


import com.example.azilacol_back.handlers.CustomAuthenticationEntryPoint;
import com.example.azilacol_back.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserRepository userRepository;
    private final SecurityFilter securityFilter;

    @Bean
    @Primary
    public SecurityFilterChain configureHttp(HttpSecurity httpSecurity, CustomAuthenticationEntryPoint authenticationEntryPoint) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfig()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/auth/**").hasAnyRole("ADMIN", "PROFESSOR")
//                        .requestMatchers(HttpMethod.POST, "/auth/criar-mais-de-um-aluno/{turmaID}").hasAnyRole("ADMIN", "PROFESSOR")
//                        .requestMatchers(HttpMethod.PUT, "/user/change-user-role").hasAnyRole("ADMIN")
//                        .requestMatchers(HttpMethod.GET, "/user/search-by-name").hasAnyRole("ADMIN")
//                        .requestMatchers(HttpMethod.GET, "/user/get-user-info").hasAnyRole("ADMIN")
//                        .requestMatchers(HttpMethod.POST, "/instituicao/cadastrar").hasAnyRole("ADMIN", "PROFESSOR")
//                        .requestMatchers(HttpMethod.GET, "/questao/**").hasAnyRole("ADMIN", "PROFESSOR")
//                        .requestMatchers(HttpMethod.POST, "/questao/**").hasAnyRole("ADMIN", "PROFESSOR")
//                        .requestMatchers(HttpMethod.POST, "/alunos/**").hasAnyRole("ADMIN", "PROFESSOR")
//                        .requestMatchers(HttpMethod.POST, "/provas/**").authenticated()
//                        .requestMatchers(HttpMethod.POST, "/questao/**").authenticated()
//                        .requestMatchers(HttpMethod.POST, "/processo-seletivo/**")
//                            .hasAnyRole("ADMIN", "PROFESSOR")
//                        .requestMatchers(HttpMethod.PUT, "/vestibular/**", "/concurso/**", "/processo-seletivo/**", "/projeto-educacional")
//                            .hasAnyRole("ADMIN", "PROFESSOR")
//                        .requestMatchers(
//                            "/swagger-ui/**",
//                            "/v3/api-docs/**",
//                            "/swagger-resources/**",
//                            "/webjars/**"
//                        ).permitAll()

                .anyRequest().authenticated()
                )
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(authenticationEntryPoint)
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfig() {
        var configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");

        configuration.setAllowedMethods(List.of("*"));

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setAllowCredentials(true);

        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

//    @Bean
//    public OpenAPI customOpenAPI() {
//        return new OpenAPI()
//                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
//                .components(new Components()
//                        .addSecuritySchemes("bearerAuth",
//                                new SecurityScheme()
//                                        .type(SecurityScheme.Type.HTTP)
//                                        .scheme("bearer")
//                                        .bearerFormat("JWT")));
//    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return userRepository::findByNome;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        var authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}