package com.haile.courseservice.controller;

import com.haile.common.dto.response.ApiResponse;
import com.haile.common.dto.request.LiveSessionRequest;
import com.haile.common.dto.response.LiveSessionResponse;
import com.haile.courseservice.service.LiveSessionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/live-sessions")
@RequiredArgsConstructor
public class LiveSessionController {

    private final LiveSessionService liveSessionService;

    @PostMapping
    public ResponseEntity<ApiResponse<LiveSessionResponse>> createLiveSession(@RequestBody @Valid LiveSessionRequest request) {
        LiveSessionResponse response = liveSessionService.createLiveSession(request);
        return ResponseEntity.status(201).body(ApiResponse.<LiveSessionResponse>builder()
                .code(201)
                .message("Tạo lịch học trực tuyến thành công")
                .data(response)
                .build());
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<List<LiveSessionResponse>>> getLiveSessionsByCourse(@PathVariable Long courseId) {
        List<LiveSessionResponse> responses = liveSessionService.getLiveSessionsByCourse(courseId);
        return ResponseEntity.ok(ApiResponse.<List<LiveSessionResponse>>builder()
                .code(200)
                .message("Lấy danh sách lịch học thành công")
                .data(responses)
                .build());
    }
}
