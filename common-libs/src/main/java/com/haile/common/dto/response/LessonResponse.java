package com.haile.common.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonResponse {
    private Long id;
    private String title;
    private String duration; // "12:45"
    private String lessonType; // VIDEO, TEXT, QUIZ
    private String videoUrl;
    private Integer orderIndex;
    private Boolean isPreview;
}