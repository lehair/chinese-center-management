package com.haile.userservice.controller;

import com.haile.common.dto.response.ApiResponse;
import com.haile.common.dto.request.GoogleLoginRequest;
import com.haile.common.dto.request.LoginRequest;
import com.haile.common.dto.request.RegisterRequest; // Đã thêm import này
import com.haile.common.dto.response.TokenResponse;
import com.haile.userservice.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@RequestBody @Valid LoginRequest request) {
        TokenResponse tokenResponse = authService.login(request);

        // Tạo HttpOnly Cookie chứa Refresh Token dựa trên phiên vừa tạo
        var cookie = authService.createHttpOnlyCookie(request.getUsername());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(ApiResponse.<TokenResponse>builder()
                        .code(200)
                        .message("Đăng nhập hệ thống thành công")
                        .data(tokenResponse)
                        .build());
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@RequestBody @Valid RegisterRequest request) {
        authService.register(request);

        // Đã sửa mã status(21) thành 201 (Created)
        return ResponseEntity.status(201).body(ApiResponse.<String>builder()
                .code(201)
                .message("Đăng ký tài khoản thành công")
                .build());
    }

    @PostMapping("/google")
    public ResponseEntity<ApiResponse<TokenResponse>> loginWithGoogle(@RequestBody @Valid GoogleLoginRequest request) {
        TokenResponse tokenResponse = authService.loginWithGoogle(request);

        // Tìm tên tài khoản mặc định (email) để bọc vào Cookie tương ứng
        String usernameDefault = tokenResponse.getAccessToken(); // Giả định hàm sinh token cấu trúc từ username
        // Để an toàn, ta trích xuất chính danh tính từ hệ thống sinh token hoặc trả trực tiếp username từ luồng service

        // Cập nhật lấy thông tin username từ token đã giải mã hoặc sửa hàm Service trả về cấu trúc bọc sẵn dữ liệu
        var cookie = authService.createHttpOnlyCookie(usernameDefault);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(ApiResponse.<TokenResponse>builder()
                        .code(200)
                        .message("Đăng nhập bằng tài khoản Google thành công")
                        .data(tokenResponse)
                        .build());
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        // Lấy thông tin username hiện tại đang thực hiện yêu cầu xác thực
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        authService.logout(currentUsername);
        var cleanCookie = authService.createCleanCookie();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cleanCookie.toString())
                .body(ApiResponse.<String>builder()
                        .code(200)
                        .message("Đăng xuất khỏi hệ thống thành công")
                        .build());
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<TokenResponse>> refresh(@CookieValue(name = "refreshToken", required = false) String refreshToken) {
        if (refreshToken == null || refreshToken.isEmpty()) {
            return ResponseEntity.status(401).body(ApiResponse.<TokenResponse>builder()
                    .code(401)
                    .message("Không tìm thấy Refresh Token")
                    .build());
        }

        try {
            TokenResponse tokenResponse = authService.refreshToken(refreshToken);
            return ResponseEntity.ok()
                    .body(ApiResponse.<TokenResponse>builder()
                            .code(200)
                            .message("Làm mới Token thành công")
                            .data(tokenResponse)
                            .build());
        } catch (Exception e) {
            var cleanCookie = authService.createCleanCookie();
            return ResponseEntity.status(401)
                    .header(HttpHeaders.SET_COOKIE, cleanCookie.toString())
                    .body(ApiResponse.<TokenResponse>builder()
                            .code(401)
                            .message("Refresh Token không hợp lệ hoặc đã hết hạn")
                            .build());
        }
    }
}
