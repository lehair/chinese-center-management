package com.haile.courseservice.repository;

import com.haile.courseservice.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // Tự động generate câu query tìm khóa học theo trạng thái
    List<Course> findByStatus(String status);
    List<Course> findByInstructorId(Long instructorId);
}
