package com.haile.enrollmentservice.controller;

import com.haile.common.dto.response.ApiResponse;
import com.haile.common.dto.response.EnrollmentResponse;
import com.haile.enrollmentservice.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import com.haile.common.client.CourseClient;
import com.haile.common.dto.response.CourseResponse;

@RestController
@RequestMapping("/api/v1/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseClient courseClient;

    // Xem danh sách các khóa học học viên đang sở hữu
    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<EnrollmentResponse>>> getStudentEnrollments(@PathVariable Long studentId) {

        List<EnrollmentResponse> responses = enrollmentRepository.findByStudentIdOrderByEnrolledAtDesc(studentId)
                .stream()
                .map(e -> {
                    String courseTitle = "Đang cập nhật";
                    try {
                        CourseResponse course = courseClient.getCourseById(e.getCourseId()).getData();
                        if (course != null) {
                            courseTitle = course.getTitle();
                        }
                    } catch (Exception ex) {
                        // Ignore or log error
                    }
                    
                    return EnrollmentResponse.builder()
                        .id(e.getId())
                        .courseId(e.getCourseId())
                        .courseTitle(courseTitle)
                        .progress(e.getProgress())
                        .enrolledAt(e.getEnrolledAt())
                        .build();
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.<List<EnrollmentResponse>>builder()
                .code(200)
                .message("Lấy danh sách khóa học của tôi thành công")
                .data(responses)
                .build());
    }

    @GetMapping("/check")
    public ApiResponse<Boolean> checkEnrollmentExists(@RequestParam("studentId") Long studentId, @RequestParam("courseId") Long courseId) {
        boolean exists = enrollmentRepository.existsByStudentIdAndCourseId(studentId, courseId);
        return ApiResponse.<Boolean>builder().code(200).data(exists).build();
    }

    @PostMapping("/create")
    public ApiResponse<Void> createEnrollment(@RequestParam("studentId") Long studentId, @RequestParam("courseId") Long courseId) {
        if (!enrollmentRepository.existsByStudentIdAndCourseId(studentId, courseId)) {
            com.haile.enrollmentservice.entity.Enrollment enrollment = com.haile.enrollmentservice.entity.Enrollment.builder()
                    .studentId(studentId)
                    .courseId(courseId)
                    .progress(0)
                    .enrolledAt(java.time.LocalDateTime.now())
                    .build();
            enrollmentRepository.save(enrollment);
        }
        return ApiResponse.<Void>builder().code(200).message("Created successfully").build();
    }
}
