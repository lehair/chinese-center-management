package com.haile.courseservice.repository;

import com.haile.courseservice.entity.CourseLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseLessonRepository extends JpaRepository<CourseLesson, Long> {
    List<CourseLesson> findByModuleIdOrderByOrderIndexAsc(Long moduleId);
}
