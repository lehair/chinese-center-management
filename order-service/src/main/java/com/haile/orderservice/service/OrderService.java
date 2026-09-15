package com.haile.orderservice.service;

import com.haile.common.client.CourseClient;
import com.haile.common.client.EnrollmentClient;
import com.haile.common.client.UserClient;
import com.haile.common.dto.request.OrderRequest;
import com.haile.common.dto.response.CourseResponse;
import com.haile.common.dto.response.UserProfileResponse;
import com.haile.common.client.NotificationClient;
import com.haile.common.dto.request.NotificationRequest;
import com.haile.common.exception.AppException;
import com.haile.common.exception.ErrorCode;
import com.haile.orderservice.entity.Order;
import com.haile.orderservice.entity.OrderItem;
import com.haile.orderservice.repository.OrderItemRepository;
import com.haile.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CourseClient courseClient;
    private final UserClient userClient;
    private final EnrollmentClient enrollmentClient;
    private final NotificationClient notificationClient;

    @Transactional
    public Order createOrder(OrderRequest request) {
        // Validate student
        UserProfileResponse student = userClient.getUserById(request.getStudentId()).getData();
        if (student == null) {
            throw new RuntimeException("Không tìm thấy học viên");
        }

        BigDecimal totalPrice = BigDecimal.ZERO;
        
        if (request.getCourseIds() == null || request.getCourseIds().isEmpty()) {
            throw new RuntimeException("Không có khóa học hợp lệ trong đơn hàng");
        }

        for (Long courseId : request.getCourseIds()) {
            // Check if course exists
            CourseResponse course = courseClient.getCourseById(courseId).getData();
            if (course == null) {
                throw new RuntimeException("Không tìm thấy khóa học với ID: " + courseId);
            }

            // Check if already enrolled
            Boolean isEnrolled = enrollmentClient.checkEnrollmentExists(student.getId(), courseId).getData();
            if (Boolean.TRUE.equals(isEnrolled)) {
                throw new RuntimeException("Bạn đã sở hữu khóa học: " + course.getTitle());
            }
            totalPrice = totalPrice.add(course.getPrice());
        }

        // Tạo Order cha
        Order order = Order.builder()
                .studentId(student.getId())
                .totalPrice(totalPrice)
                .paymentMethod(request.getPaymentMethod())
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .build();
        order = orderRepository.save(order);

        // Tạo các OrderItem con
        for (Long courseId : request.getCourseIds()) {
            CourseResponse course = courseClient.getCourseById(courseId).getData();
            OrderItem item = OrderItem.builder()
                    .order(order)
                    .courseId(courseId)
                    .price(course.getPrice())
                    .build();
            orderItemRepository.save(item);
        }

        return order;
    }

    @Transactional
    public String processPaymentSuccess(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        if (!order.getStatus().equals("PENDING")) {
            return "Đơn hàng này đã được xử lý!";
        }

        // Cập nhật trạng thái
        order.setStatus("COMPLETED");
        orderRepository.save(order);

        // Tự động Ghi danh (Enrollment) cho học viên
        List<OrderItem> items = orderItemRepository.findByOrderId(orderId);
        UserProfileResponse student = null;

        for (OrderItem item : items) {
            enrollmentClient.createEnrollment(order.getStudentId(), item.getCourseId());
            
            // Check if course is Live Online to send admin notification
            try {
                CourseResponse course = courseClient.getCourseById(item.getCourseId()).getData();
                if (course != null && "Live Online".equals(course.getCourseType())) {
                    if (student == null) {
                        student = userClient.getUserById(order.getStudentId()).getData();
                    }
                    if (student != null) {
                        String message = String.format("Học viên %s (SĐT: %s, Email: %s) vừa đăng ký thành công khóa học Live Online: %s", 
                            student.getFullName(), 
                            student.getPhoneNumber() != null ? student.getPhoneNumber() : "Không có", 
                            student.getEmail(), 
                            course.getTitle());
                        
                        NotificationRequest notifReq = NotificationRequest.builder()
                                .title("Đăng ký mới: Khóa Live Online")
                                .message(message)
                                .type("ADMIN")
                                .build();
                        notificationClient.createAdminNotification(notifReq);
                    }
                }
            } catch (Exception ex) {
                // Ignore failure in sending notification so it doesn't block payment success
                System.err.println("Failed to send admin notification: " + ex.getMessage());
            }
        }

        return "Thanh toán thành công. Khóa học đã được thêm vào tài khoản của bạn!";
    }

    public java.util.List<java.util.Map<String, Object>> getMonthlyRevenue(int year) {
        java.util.List<Object[]> rawStats = orderRepository.getMonthlyRevenue(year);
        java.util.List<java.util.Map<String, Object>> result = new java.util.ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            java.util.Map<String, Object> monthData = new java.util.HashMap<>();
            monthData.put("name", "Tháng " + i);
            monthData.put("revenue", 0L);
            result.add(monthData);
        }
        for (Object[] row : rawStats) {
            int month = ((Number) row[0]).intValue();
            long revenue = ((Number) row[1]).longValue();
            if (month >= 1 && month <= 12) {
                result.get(month - 1).put("revenue", revenue);
            }
        }
        return result;
    }
}
