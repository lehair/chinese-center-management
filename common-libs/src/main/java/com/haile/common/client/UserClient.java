package com.haile.common.client;

import com.haile.common.dto.response.UserProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.haile.common.dto.response.ApiResponse;

@FeignClient(name = "user-service")
public interface UserClient {

    @GetMapping("/api/v1/users/{id}/profile")
    ApiResponse<UserProfileResponse> getUserById(@PathVariable("id") Long id);
}
