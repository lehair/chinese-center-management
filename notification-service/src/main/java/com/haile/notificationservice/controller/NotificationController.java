package com.haile.notificationservice.controller;

import com.haile.common.dto.response.ApiResponse;
import com.haile.notificationservice.entity.Notification;
import com.haile.common.dto.request.NotificationRequest;
import com.haile.notificationservice.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository notificationRepository;

    @GetMapping("/banners")
    public ApiResponse<List<Notification>> getBanners() {
        return ApiResponse.<List<Notification>>builder()
                .code(200)
                .message("Lấy danh sách banner thành công")
                .data(notificationRepository.findByTypeOrderByIdDesc("BANNER"))
                .build();
    }

    @PostMapping("/internal/admin-alert")
    public ApiResponse<Void> createAdminAlert(@RequestBody NotificationRequest request) {
        Notification notification = Notification.builder()
                .title(request.getTitle())
                .message(request.getMessage())
                .type("ADMIN")
                .build();
        notificationRepository.save(notification);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Tạo thông báo admin thành công")
                .build();
    }
}
