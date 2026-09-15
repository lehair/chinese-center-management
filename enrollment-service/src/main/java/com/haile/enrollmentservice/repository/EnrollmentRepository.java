package com.haile.enrollmentservice.repository;

import com.haile.enrollmentservice.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudentIdOrderByEnrolledAtDesc(Long studentId);

    // Kiểm tra xem học viên đã sở hữu khóa học này chưa
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);
}
