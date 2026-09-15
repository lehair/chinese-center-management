package com.haile.common.dto.request;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CourseRequest {
    private String title;
    private String description;
    private BigDecimal price;
    private String courseType; // Used for "Thể loại" e.g., Video Course, Live Online
    private Long instructorId;
    private String status;
    private String category; // e.g., Tiếng Trung Giao Tiếp, Luyện Thi HSK
    private String imageUrl;
    private String features; // Comma or newline separated
    private String level;
    private String schedule; // Lịch học
    private java.math.BigDecimal originalPrice;
    private String whatYouWillLearn;
    private java.util.List<ModuleRequest> modules;
}