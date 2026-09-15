package com.haile.userservice.controller;

import com.haile.common.dto.response.ApiResponse;
import com.haile.common.dto.request.ChangePasswordRequest;
import com.haile.common.dto.request.UpdateProfileRequest;
import com.haile.common.dto.response.UserProfileResponse;
import com.haile.userservice.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.haile.userservice.service.FileService;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final FileService fileService;

    // Hàm tiện ích: Trích xuất username từ Token của người dùng đang gọi API
    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    // 1. API lấy thông tin cá nhân của người đang đăng nhập
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getMyProfile() {
        UserProfileResponse profile = userService.getMyProfile(getCurrentUsername());
        return ResponseEntity.ok(ApiResponse.<UserProfileResponse>builder()
                .code(200)
                .message("Lấy thông tin cá nhân thành công")
                .data(profile)
                .build());
    }

    // Lấy thông tin user bằng ID (Dành cho internal service gọi)
    @GetMapping("/{id}/profile")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getUserProfileById(@PathVariable Long id) {
        UserProfileResponse profile = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.<UserProfileResponse>builder()
                .code(200)
                .message("Lấy thông tin cá nhân thành công")
                .data(profile)
                .build());
    }

    // 2. API cập nhật thông tin cá nhân (Đổi tên)
    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateProfile(@RequestBody @Valid UpdateProfileRequest request) {
        UserProfileResponse profile = userService.updateProfile(getCurrentUsername(), request);
        return ResponseEntity.ok(ApiResponse.<UserProfileResponse>builder()
                .code(200)
                .message("Cập nhật thông tin thành công")
                .data(profile)
                .build());
    }

    // 3. API đổi mật khẩu
    @PutMapping("/password")
    public ResponseEntity<ApiResponse<String>> changePassword(@RequestBody @Valid ChangePasswordRequest request) {
        String result = userService.changePassword(getCurrentUsername(), request);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .code(200)
                .message(result)
                .build());
    }

    // 4. API Upload ảnh đại diện
    @PostMapping("/me/avatar")
    public ResponseEntity<ApiResponse<String>> uploadAvatar(@RequestParam("file") MultipartFile file) {
        String avatarUrl = fileService.saveAvatar(file);
        
        // Tự động lưu vào profile
        userService.updateAvatar(getCurrentUsername(), avatarUrl);
        
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .code(200)
                .message("Tải ảnh lên thành công")
                .data(avatarUrl)
                .build());
    }

    // 5. API Upload file dùng chung (Banner, Hình ảnh bài viết...)
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<String>> uploadGenericFile(@RequestParam("file") MultipartFile file) {
        String fileUrl = fileService.saveAvatar(file); // Tạm dùng chung thư mục lưu trữ với avatar
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .code(200)
                .message("Tải tệp lên thành công")
                .data(fileUrl)
                .build());
    }

    // 6. API lấy danh sách giảng viên (Public)
    @GetMapping("/teachers")
    public ResponseEntity<ApiResponse<java.util.List<UserProfileResponse>>> getPublicTeachers() {
        return ResponseEntity.ok(ApiResponse.<java.util.List<UserProfileResponse>>builder()
                .code(200)
                .message("Lấy danh sách giảng viên thành công")
                .data(userService.getActiveTeachers())
                .build());
    }
}
