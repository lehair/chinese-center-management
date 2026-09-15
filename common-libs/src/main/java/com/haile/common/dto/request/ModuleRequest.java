package com.haile.common.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModuleRequest {
    private Long id;
    private String title;
    private Integer orderIndex;
    private List<LessonRequest> lessons;
}
