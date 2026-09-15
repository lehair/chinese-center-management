package com.haile.courseservice.service;

import com.haile.common.client.UserClient;
import com.haile.common.dto.request.CourseRequest;
import com.haile.common.dto.request.LessonRequest;
import com.haile.common.dto.request.ModuleRequest;
import com.haile.common.dto.response.CourseResponse;
import com.haile.common.dto.response.LessonResponse;
import com.haile.common.dto.response.ModuleResponse;
import com.haile.common.dto.response.UserProfileResponse;
import com.haile.courseservice.entity.Course;
import com.haile.courseservice.entity.CourseLesson;
import com.haile.courseservice.entity.CourseModule;
import com.haile.courseservice.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserClient userClient;

    public List<CourseResponse> getAllPublishedCourses() {
        return courseRepository.findByStatus("PUBLISHED")
                .stream().map(this::mapToCourseResponse).collect(Collectors.toList());
    }

    public List<CourseResponse> getAllAdminCourses() {
        return courseRepository.findAll()
                .stream().map(this::mapToCourseResponse).collect(Collectors.toList());
    }

    public List<CourseResponse> getCoursesByInstructorId(Long instructorId) {
        return courseRepository.findByInstructorId(instructorId)
                .stream().map(this::mapToCourseResponse).collect(Collectors.toList());
    }

    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return mapToCourseResponse(course);
    }

    private CourseResponse mapToCourseResponse(Course course) {
        String instructorName = "Đang cập nhật";
        if (course.getInstructorId() != null) {
            try {
                UserProfileResponse userProfile = userClient.getUserById(course.getInstructorId()).getData();
                if (userProfile != null) {
                    instructorName = userProfile.getFullName();
                }
            } catch (Exception e) {
                // Log error or ignore
            }
        }

        List<ModuleResponse> moduleResponses = new ArrayList<>();
        if (course.getModules() != null) {
            moduleResponses = course.getModules().stream().map(module -> {
                List<LessonResponse> lessonResponses = new ArrayList<>();
                if (module.getLessons() != null) {
                    lessonResponses = module.getLessons().stream().map(lesson -> LessonResponse.builder()
                            .id(lesson.getId())
                            .title(lesson.getTitle())
                            .duration(lesson.getDuration())
                            .lessonType(lesson.getLessonType())
                            .videoUrl(lesson.getVideoUrl())
                            .orderIndex(lesson.getOrderIndex())
                            .isPreview(lesson.getIsPreview())
                            .build()).collect(Collectors.toList());
                }
                return ModuleResponse.builder()
                        .id(module.getId())
                        .title(module.getTitle())
                        .orderIndex(module.getOrderIndex())
                        .lessons(lessonResponses)
                        .build();
            }).collect(Collectors.toList());
        }
        
        return CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .price(course.getPrice())
                .courseType(course.getCourseType())
                .status(course.getStatus())
                .instructorId(course.getInstructorId())
                .instructorName(instructorName)
                .category(course.getCategory())
                .imageUrl(course.getImageUrl())
                .features(course.getFeatures())
                .level(course.getLevel())
                .schedule(course.getSchedule())
                .originalPrice(course.getOriginalPrice())
                .whatYouWillLearn(course.getWhatYouWillLearn())
                .rating(course.getRating())
                .studentCount(course.getStudentCount())
                .modules(moduleResponses)
                .build();
    }

    public CourseResponse createCourse(CourseRequest request) {
        Course course = Course.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .courseType(request.getCourseType())
                .status(request.getStatus() != null ? request.getStatus() : "DRAFT")
                .instructorId(request.getInstructorId() != null ? request.getInstructorId() : 1L)
                .category(request.getCategory())
                .imageUrl(request.getImageUrl())
                .features(request.getFeatures())
                .level(request.getLevel())
                .schedule(request.getSchedule())
                .originalPrice(request.getOriginalPrice())
                .whatYouWillLearn(request.getWhatYouWillLearn())
                .rating(java.math.BigDecimal.valueOf(5.0))
                .studentCount(0)
                .build();

        mapRequestToCourseModules(request, course);

        Course savedCourse = courseRepository.save(course);
        return mapToCourseResponse(savedCourse);
    }

    public CourseResponse updateCourse(Long id, CourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
                
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setPrice(request.getPrice());
        course.setCourseType(request.getCourseType());
        if (request.getStatus() != null) {
            course.setStatus(request.getStatus());
        }
        course.setInstructorId(request.getInstructorId());
        if (request.getCategory() != null) {
            course.setCategory(request.getCategory());
        }
        if (request.getImageUrl() != null) {
            course.setImageUrl(request.getImageUrl());
        }
        if (request.getFeatures() != null) {
            course.setFeatures(request.getFeatures());
        }
        if (request.getLevel() != null) {
            course.setLevel(request.getLevel());
        }
        course.setSchedule(request.getSchedule());
        if (request.getOriginalPrice() != null) {
            course.setOriginalPrice(request.getOriginalPrice());
        }
        if (request.getWhatYouWillLearn() != null) {
            course.setWhatYouWillLearn(request.getWhatYouWillLearn());
        }

        mapRequestToCourseModules(request, course);
        
        Course updatedCourse = courseRepository.save(course);
        return mapToCourseResponse(updatedCourse);
    }

    private void mapRequestToCourseModules(CourseRequest request, Course course) {
        if (request.getModules() != null) {
            List<CourseModule> modules = new ArrayList<>();
            for (ModuleRequest modReq : request.getModules()) {
                CourseModule module = CourseModule.builder()
                        .course(course)
                        .title(modReq.getTitle())
                        .orderIndex(modReq.getOrderIndex())
                        .build();

                if (modReq.getLessons() != null) {
                    List<CourseLesson> lessons = new ArrayList<>();
                    for (LessonRequest lesReq : modReq.getLessons()) {
                        CourseLesson lesson = CourseLesson.builder()
                                .module(module)
                                .title(lesReq.getTitle())
                                .duration(lesReq.getDuration())
                                .lessonType(lesReq.getLessonType())
                                .videoUrl(lesReq.getVideoUrl())
                                .orderIndex(lesReq.getOrderIndex())
                                .isPreview(lesReq.getIsPreview())
                                .build();
                        lessons.add(lesson);
                    }
                    module.setLessons(lessons);
                }
                modules.add(module);
            }
            if (course.getModules() != null) {
                course.getModules().clear();
                course.getModules().addAll(modules);
            } else {
                course.setModules(modules);
            }
        }
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
