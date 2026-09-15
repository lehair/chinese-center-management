package com.haile.courseservice.controller;

import com.haile.common.dto.response.ApiResponse;
import com.haile.common.dto.request.CourseRequest;
import com.haile.common.dto.response.CourseResponse;
import com.haile.courseservice.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ApiResponse<List<CourseResponse>> getCourses() {
        return ApiResponse.<List<CourseResponse>>builder()
                .code(200)
                .message("Lấy danh sách khóa học thành công")
                .data(courseService.getAllPublishedCourses())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<CourseResponse> getCourseById(@PathVariable Long id) {
        return ApiResponse.<CourseResponse>builder()
                .code(200)
                .message("Lấy thông tin khóa học thành công")
                .data(courseService.getCourseById(id))
                .build();
    }

    @GetMapping("/instructor/{instructorId}")
    public ApiResponse<List<CourseResponse>> getCoursesByInstructor(@PathVariable Long instructorId) {
        return ApiResponse.<List<CourseResponse>>builder()
                .code(200)
                .message("Lấy danh sách khóa học của giáo viên thành công")
                .data(courseService.getCoursesByInstructorId(instructorId))
                .build();
    }

}
