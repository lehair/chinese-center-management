package com.haile.common.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateProfileRequest {
    @NotBlank(message = "Họ và tên không được để trống")
    private String fullName;

    private java.time.LocalDate dateOfBirth;
    private String phoneNumber;
    private String avatarUrl;
}