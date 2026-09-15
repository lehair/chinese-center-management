package com.haile.common.client;

import com.haile.common.dto.response.ApiResponse;
import com.haile.common.dto.response.CourseResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "course-service")
public interface CourseClient {

    @GetMapping("/api/v1/courses/{id}")
    ApiResponse<CourseResponse> getCourseById(@PathVariable("id") Long id);

    @GetMapping("/api/v1/courses")
    ApiResponse<java.util.List<CourseResponse>> getAllCourses();
}
