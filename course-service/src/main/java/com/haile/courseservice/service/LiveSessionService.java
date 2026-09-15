package com.haile.courseservice.service;

import com.haile.common.dto.request.LiveSessionRequest;
import com.haile.common.dto.response.LiveSessionResponse;
import com.haile.courseservice.entity.Course;
import com.haile.courseservice.entity.LiveSession;
import com.haile.common.exception.AppException;
import com.haile.common.exception.ErrorCode;
import com.haile.courseservice.repository.CourseRepository;
import com.haile.courseservice.repository.LiveSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LiveSessionService {

    private final LiveSessionRepository liveSessionRepository;
    private final CourseRepository courseRepository;

    public LiveSessionResponse createLiveSession(LiveSessionRequest request) {
        // Kiểm tra logic thời gian cơ bản
        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new IllegalArgumentException("Thời gian kết thúc không thể diễn ra trước thời gian bắt đầu");
        }

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        LiveSession session = LiveSession.builder()
                .title(request.getTitle())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .meetingLink(request.getMeetingLink())
                .course(course)
                .build();

        session = liveSessionRepository.save(session);
        return mapToResponse(session);
    }

    public List<LiveSessionResponse> getLiveSessionsByCourse(Long courseId) {
        return liveSessionRepository.findByCourseIdOrderByStartTimeAsc(courseId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private LiveSessionResponse mapToResponse(LiveSession session) {
        return LiveSessionResponse.builder()
                .id(session.getId())
                .title(session.getTitle())
                .startTime(session.getStartTime())
                .endTime(session.getEndTime())
                .meetingLink(session.getMeetingLink())
                .courseId(session.getCourse().getId())
                .build();
    }
}
