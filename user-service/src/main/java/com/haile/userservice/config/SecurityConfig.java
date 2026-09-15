package com.haile.userservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.haile.common.security.JwtAuthFilter;

import com.haile.common.security.JwtService;

@Configuration
@RequiredArgsConstructor
@org.springframework.context.annotation.Import({JwtService.class, JwtAuthFilter.class})
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Tắt CSRF vì ta dùng JWT
                .httpBasic(AbstractHttpConfigurer::disable) // Tắt HTTP Basic Auth để ngăn popup của trình duyệt
                .exceptionHandling(e -> e.authenticationEntryPoint((request, response, authException) -> {
                    response.setStatus(401);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write("{\"code\": 401, \"message\": \"Không có quyền truy cập\"}");
                }))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/**").permitAll() // Cho phép công khai
                        .requestMatchers("/api/v1/courses/**").permitAll() // Tạm thời cho công khai
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/v1/users/*/profile").permitAll() // Xem thông tin giảng viên công khai
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/v1/users/teachers").permitAll() // Xem danh sách giảng viên công khai
                        .requestMatchers("/api/v1/users/uploads/**").permitAll() // Cho phép xem ảnh public
                        .anyRequest().authenticated() // Tất cả còn lại cần login
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Mã hóa mật khẩu
    }
}
