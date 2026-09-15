package com.haile.courseservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "course_lessons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseLesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private CourseModule module;

    @Column(nullable = false)
    private String title;

    @Column(length = 20)
    private String duration; // e.g., "12:45"

    @Column(name = "lesson_type", length = 20)
    private String lessonType; // VIDEO, TEXT, QUIZ

    @Column(name = "video_url", length = 1024)
    private String videoUrl;

    @Column(name = "order_index")
    private Integer orderIndex;

    @Column(name = "is_preview")
    private Boolean isPreview;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
