package com.haile.userservice.service;

import com.haile.common.dto.request.ChangePasswordRequest;
import com.haile.common.dto.request.UpdateProfileRequest;
import com.haile.common.dto.request.TeacherRequest;
import com.haile.common.dto.response.UserProfileResponse;
import com.haile.userservice.entity.User;
import com.haile.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 1. Lấy thông tin tài khoản hiện tại
    public UserProfileResponse getMyProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new com.haile.common.exception.AppException(com.haile.common.exception.ErrorCode.USER_NOT_FOUND));
        return mapToResponse(user);
    }

    // 2. Cập nhật thông tin cá nhân
    @Transactional
    public UserProfileResponse updateProfile(String username, UpdateProfileRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new com.haile.common.exception.AppException(com.haile.common.exception.ErrorCode.USER_NOT_FOUND));

        user.setFullName(request.getFullName());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setPhoneNumber(request.getPhoneNumber());
        if (request.getAvatarUrl() != null) user.setAvatarUrl(request.getAvatarUrl());
        userRepository.save(user);

        return mapToResponse(user);
    }

    // 3. Đổi mật khẩu
    @Transactional
    public String changePassword(String username, ChangePasswordRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new com.haile.common.exception.AppException(com.haile.common.exception.ErrorCode.USER_NOT_FOUND));

        // Kiểm tra mật khẩu cũ có khớp không
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Mật khẩu cũ không chính xác");
        }

        // Kiểm tra hai mật khẩu mới có giống nhau không
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Mật khẩu xác nhận không khớp");
        }

        // Mã hóa và lưu mật khẩu mới
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return "Đổi mật khẩu thành công";
    }

    // Hàm phụ trợ map từ Entity sang DTO
    private UserProfileResponse mapToResponse(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .dateOfBirth(user.getDateOfBirth())
                .phoneNumber(user.getPhoneNumber())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }

    @Transactional
    public void updateAvatar(String username, String avatarUrl) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new com.haile.common.exception.AppException(com.haile.common.exception.ErrorCode.USER_NOT_FOUND));
        user.setAvatarUrl(avatarUrl);
        userRepository.save(user);
    }

    // Admin: Get all users
    public java.util.List<UserProfileResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(java.util.stream.Collectors.toList());
    }

    // Admin: Change user role
    @Transactional
    public void changeUserRole(Long id, String role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new com.haile.common.exception.AppException(com.haile.common.exception.ErrorCode.USER_NOT_FOUND));
        user.setRole(role);
        userRepository.save(user);
    }

    public UserProfileResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new com.haile.common.exception.AppException(com.haile.common.exception.ErrorCode.USER_NOT_FOUND));
        return mapToResponse(user);
    }

    // Admin: Get stats
    public java.util.Map<String, Long> getDashboardStats() {
        long totalStudents = userRepository.findAll().stream().filter(u -> "STUDENT".equals(u.getRole())).count();
        long totalTeachers = userRepository.findAll().stream().filter(u -> "TEACHER".equals(u.getRole())).count();
        java.util.Map<String, Long> stats = new java.util.HashMap<>();
        stats.put("totalStudents", totalStudents);
        stats.put("totalTeachers", totalTeachers);
        return stats;
    }

    public java.util.List<java.util.Map<String, Object>> getMonthlyRegistrations(int year) {
        java.util.List<Object[]> rawStats = userRepository.getMonthlyRegistrations(year);
        java.util.List<java.util.Map<String, Object>> result = new java.util.ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            java.util.Map<String, Object> monthData = new java.util.HashMap<>();
            monthData.put("name", "Tháng " + i);
            monthData.put("users", 0L);
            result.add(monthData);
        }
        for (Object[] row : rawStats) {
            int month = ((Number) row[0]).intValue();
            long count = ((Number) row[1]).longValue();
            if (month >= 1 && month <= 12) {
                result.get(month - 1).put("users", count);
            }
        }
        return result;
    }

    // Admin: Get all active teachers
    public java.util.List<UserProfileResponse> getActiveTeachers() {
        return userRepository.findByRoleAndIsActiveTrue("TEACHER").stream()
                .map(this::mapToResponse)
                .collect(java.util.stream.Collectors.toList());
    }

    // Admin: Create teacher
    @Transactional
    public UserProfileResponse createTeacher(TeacherRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new com.haile.common.exception.AppException(com.haile.common.exception.ErrorCode.USER_EXISTED);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new com.haile.common.exception.AppException(com.haile.common.exception.ErrorCode.USER_EXISTED);
        }
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .fullName(request.getFullName())
                .password(passwordEncoder.encode("123456"))
                .role("TEACHER")
                .isActive(true)
                .phoneNumber(request.getPhoneNumber())
                .dateOfBirth(request.getDateOfBirth())
                .avatarUrl(request.getAvatarUrl())
                .build();
        userRepository.save(user);
        return mapToResponse(user);
    }

    // Admin: Update teacher
    @Transactional
    public UserProfileResponse updateTeacher(Long id, TeacherRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new com.haile.common.exception.AppException(com.haile.common.exception.ErrorCode.USER_NOT_FOUND));
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setDateOfBirth(request.getDateOfBirth());
        if (!user.getEmail().equals(request.getEmail())) {
             if (userRepository.existsByEmail(request.getEmail())) {
                 throw new com.haile.common.exception.AppException(com.haile.common.exception.ErrorCode.USER_EXISTED);
             }
             user.setEmail(request.getEmail());
        }
        if (request.getAvatarUrl() != null) {
             user.setAvatarUrl(request.getAvatarUrl());
        }
        userRepository.save(user);
        return mapToResponse(user);
    }

    // Admin: Soft delete teacher
    @Transactional
    public void deleteTeacher(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new com.haile.common.exception.AppException(com.haile.common.exception.ErrorCode.USER_NOT_FOUND));
        user.setIsActive(false);
        userRepository.save(user);
    }
}
