package com.haile.common.client;

import com.haile.common.dto.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "enrollment-service")
public interface EnrollmentClient {

    @GetMapping("/api/v1/enrollments/check")
    ApiResponse<Boolean> checkEnrollmentExists(@RequestParam("studentId") Long studentId, @RequestParam("courseId") Long courseId);

    @PostMapping("/api/v1/enrollments/create")
    ApiResponse<Void> createEnrollment(@RequestParam("studentId") Long studentId, @RequestParam("courseId") Long courseId);
}
