package com.haile.courseservice.controller;

import com.haile.common.dto.response.ApiResponse;
import com.haile.common.dto.response.CourseResponse;
import com.haile.courseservice.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/courses/admin")
@RequiredArgsConstructor
public class AdminCourseController {

    private final CourseService courseService;

    @GetMapping
    public ApiResponse<List<CourseResponse>> getAllCourses() {
        return ApiResponse.<List<CourseResponse>>builder()
                .code(200)
                .message("Lấy toàn bộ khóa học thành công")
                .data(courseService.getAllAdminCourses())
                .build();
    }

    @PostMapping
    public ApiResponse<CourseResponse> createCourse(@RequestBody com.haile.common.dto.request.CourseRequest request) {
        return ApiResponse.<CourseResponse>builder()
                .code(200)
                .message("Tạo khóa học thành công")
                .data(courseService.createCourse(request))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<CourseResponse> updateCourse(@PathVariable Long id, @RequestBody com.haile.common.dto.request.CourseRequest request) {
        return ApiResponse.<CourseResponse>builder()
                .code(200)
                .message("Cập nhật khóa học thành công")
                .data(courseService.updateCourse(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ApiResponse.<String>builder()
                .code(200)
                .message("Xóa khóa học thành công")
                .build();
    }

    @GetMapping("/dashboard-stats")
    public ApiResponse<Map<String, Long>> getDashboardStats() {
        long totalCourses = courseService.getAllPublishedCourses().size(); // Temp
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalCourses", totalCourses);
        return ApiResponse.<Map<String, Long>>builder()
                .code(200)
                .message("Lấy thống kê thành công")
                .data(stats)
                .build();
    }
}
