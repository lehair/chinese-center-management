package com.haile.notificationservice.controller;

import com.haile.common.dto.response.ApiResponse;
import com.haile.notificationservice.entity.Notification;
import com.haile.notificationservice.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications/admin")
@RequiredArgsConstructor
public class AdminNotificationController {

    private final NotificationRepository notificationRepository;

    @GetMapping
    public ApiResponse<List<Notification>> getAllNotifications() {
        return ApiResponse.<List<Notification>>builder()
                .code(200)
                .message("Lấy danh sách thông báo thành công")
                .data(notificationRepository.findAll())
                .build();
    }

    @PostMapping
    public ApiResponse<Notification> createNotification(@RequestBody Notification notification) {
        return ApiResponse.<Notification>builder()
                .code(201)
                .message("Tạo thông báo thành công")
                .data(notificationRepository.save(notification))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteNotification(@PathVariable Long id) {
        notificationRepository.deleteById(id);
        return ApiResponse.<String>builder()
                .code(200)
                .message("Xóa thông báo thành công")
                .build();
    }
}
