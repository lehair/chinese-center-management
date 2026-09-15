package com.haile.userservice.controller;

import com.haile.common.dto.request.TeacherRequest;
import com.haile.common.dto.response.ApiResponse;
import com.haile.common.dto.response.UserProfileResponse;
import com.haile.userservice.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/admin/teachers")
@RequiredArgsConstructor
public class AdminTeacherController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserProfileResponse>>> getActiveTeachers() {
        return ResponseEntity.ok(ApiResponse.<List<UserProfileResponse>>builder()
                .code(200)
                .message("Lấy danh sách giáo viên thành công")
                .data(userService.getActiveTeachers())
                .build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserProfileResponse>> createTeacher(@RequestBody @Valid TeacherRequest request) {
        return ResponseEntity.ok(ApiResponse.<UserProfileResponse>builder()
                .code(200)
                .message("Thêm giáo viên thành công")
                .data(userService.createTeacher(request))
                .build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateTeacher(@PathVariable Long id, @RequestBody @Valid TeacherRequest request) {
        return ResponseEntity.ok(ApiResponse.<UserProfileResponse>builder()
                .code(200)
                .message("Cập nhật thông tin giáo viên thành công")
                .data(userService.updateTeacher(id, request))
                .build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteTeacher(@PathVariable Long id) {
        userService.deleteTeacher(id);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .code(200)
                .message("Đã xóa giáo viên")
                .build());
    }
}
