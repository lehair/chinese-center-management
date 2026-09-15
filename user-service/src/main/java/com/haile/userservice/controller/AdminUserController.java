package com.haile.userservice.controller;

import com.haile.common.dto.response.ApiResponse;
import com.haile.common.dto.response.UserProfileResponse;
import com.haile.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users/admin")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserService userService;

    // Lấy danh sách toàn bộ người dùng
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserProfileResponse>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.<List<UserProfileResponse>>builder()
                .code(200)
                .message("Lấy danh sách người dùng thành công")
                .data(userService.getAllUsers())
                .build());
    }

    // Đổi quyền người dùng
    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> changeRole(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String newRole = request.get("role");
        userService.changeUserRole(id, newRole);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .code(200)
                .message("Cập nhật quyền thành công")
                .build());
    }

    // Lấy thống kê
    @GetMapping("/dashboard-stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getDashboardStats() {
        return ResponseEntity.ok(ApiResponse.<Map<String, Long>>builder()
                .code(200)
                .message("Lấy thống kê thành công")
                .data(userService.getDashboardStats())
                .build());
    }

    // Lấy thống kê đăng ký theo tháng
    @GetMapping("/registration-stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getRegistrationStats(@RequestParam(defaultValue = "2024") int year) {
        return ResponseEntity.ok(ApiResponse.<List<Map<String, Object>>>builder()
                .code(200)
                .message("Lấy thống kê đăng ký thành công")
                .data(userService.getMonthlyRegistrations(year))
                .build());
    }
}
