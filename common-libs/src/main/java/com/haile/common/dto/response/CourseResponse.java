package com.haile.common.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class CourseResponse {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private String courseType;
    private String status;
    private Long instructorId;
    private String instructorName; // Chỉ lấy tên giảng viên, không lấy nguyên object User
    private String category;
    private String imageUrl;
    private String features;
    private String level;
    private String schedule;
    private java.math.BigDecimal originalPrice;
    private String whatYouWillLearn;
    private java.math.BigDecimal rating;
    private Integer studentCount;
    private java.util.List<ModuleResponse> modules;
}