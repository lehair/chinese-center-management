package com.haile.courseservice.repository;

import com.haile.courseservice.entity.LiveSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LiveSessionRepository extends JpaRepository<LiveSession, Long> {
    // Lấy danh sách lịch học trực tuyến của một khóa học, sắp xếp theo thời gian bắt đầu tăng dần
    List<LiveSession> findByCourseIdOrderByStartTimeAsc(Long courseId);
}
