package com.haile.common.client;

import com.haile.common.dto.request.NotificationRequest;
import com.haile.common.dto.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service")
public interface NotificationClient {

    @PostMapping("/api/v1/notifications/internal/admin-alert")
    ApiResponse<Void> createAdminNotification(@RequestBody NotificationRequest request);
}
