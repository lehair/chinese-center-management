package com.haile.courseservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    // VIDEO, LIVE
    @Column(name = "course_type", length = 20)
    private String courseType;

    // Changed from User entity reference to Long ID for microservice bounded context
    @Column(name = "instructor_id", nullable = false)
    private Long instructorId;

    // DRAFT, PUBLISHED
    @Column(length = 20)
    private String status;

    @Column(length = 100)
    private String category;

    @Column(length = 1024)
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String features;

    @Column(length = 50)
    private String level;

    @Column(length = 100)
    private String schedule;

    @Column(name = "original_price", precision = 10, scale = 2)
    private BigDecimal originalPrice;

    @Column(name = "what_you_will_learn", columnDefinition = "TEXT")
    private String whatYouWillLearn;

    @Column(precision = 2, scale = 1)
    private BigDecimal rating;

    @Column(name = "student_count")
    private Integer studentCount;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    @Builder.Default
    private java.util.List<CourseModule> modules = new java.util.ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
