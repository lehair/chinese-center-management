package com.haile.common.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class UserProfileResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String role;
    private java.time.LocalDate dateOfBirth;
    private String phoneNumber;
    private String avatarUrl;
    private LocalDateTime createdAt;
}