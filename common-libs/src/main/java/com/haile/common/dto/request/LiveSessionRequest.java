package com.haile.common.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LiveSessionRequest {
    @NotBlank(message = "Tiêu đề buổi học không được để trống")
    private String title;

    @NotNull(message = "Thời gian bắt đầu không được để trống")
    private LocalDateTime startTime;

    @NotNull(message = "Thời gian kết thúc không được để trống")
    private LocalDateTime endTime;

    @NotBlank(message = "Link học (Google Meet/Zoom) không được để trống")
    private String meetingLink;

    @NotNull(message = "ID của khóa học không được để trống")
    private Long courseId;
}