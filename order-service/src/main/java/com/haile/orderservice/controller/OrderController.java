package com.haile.orderservice.controller;

import com.haile.common.dto.response.ApiResponse;
import com.haile.common.dto.request.OrderRequest;
import com.haile.orderservice.config.VNPayConfig;
import com.haile.orderservice.entity.Order;
import com.haile.orderservice.repository.OrderRepository;
import com.haile.orderservice.service.OrderService;
import com.haile.orderservice.service.PaymentService;
import com.haile.orderservice.service.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final PaymentService paymentService;
    private final OrderRepository orderRepository;
    private final VNPayConfig vnPayConfig;

    // 1. Tạo đơn hàng mới
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Order>> createOrder(@RequestBody @Valid OrderRequest request) {
        Order order = orderService.createOrder(request);
        return ResponseEntity.status(201).body(ApiResponse.<Order>builder()
                .code(201)
                .message("Tạo đơn hàng thành công")
                .data(order)
                .build());
    }

    // 2. Tạo VNPay Payment URL
    @PostMapping("/{orderId}/pay")
    public ResponseEntity<ApiResponse<String>> createPayment(@PathVariable Long orderId, HttpServletRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
                
        String paymentUrl = paymentService.createVNPayPaymentUrl(order, request);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .code(200)
                .message("Tạo URL thanh toán thành công")
                .data(paymentUrl)
                .build());
    }

    // 3. Webhook / Return URL từ VNPay
    @GetMapping("/vnpay-return")
    public void vnPayReturn(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Map<String, String> fields = new HashMap<>();
        for (Enumeration<String> params = request.getParameterNames(); params.hasMoreElements(); ) {
            String fieldName = URLEncoder.encode(params.nextElement(), StandardCharsets.US_ASCII);
            String fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                fields.put(fieldName, fieldValue);
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }
        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }
        
        String signValue = VNPayUtil.hmacSHA512(vnPayConfig.getHashSecret(), hashAllFields(fields));
        String txnRef = request.getParameter("vnp_TxnRef");
        
        if (signValue.equals(vnp_SecureHash)) {
            if ("00".equals(request.getParameter("vnp_TransactionStatus"))) {
                // Success
                orderService.processPaymentSuccess(Long.parseLong(txnRef));
                response.sendRedirect("http://localhost:3000/payment-success");
            } else {
                // Failed
                response.sendRedirect("http://localhost:3000/payment-failed");
            }
        } else {
            // Invalid signature
            response.sendRedirect("http://localhost:3000/payment-failed?error=invalid_signature");
        }
    }
    
    private String hashAllFields(Map<String, String> fields) {
        java.util.List<String> fieldNames = new java.util.ArrayList<>(fields.keySet());
        java.util.Collections.sort(fieldNames);
        StringBuilder sb = new StringBuilder();
        java.util.Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String fieldValue = fields.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                sb.append(fieldName);
                sb.append("=");
                sb.append(fieldValue);
            }
            if (itr.hasNext()) {
                sb.append("&");
            }
        }
        return sb.toString();
    }

    // 4. Giả lập webhook nhận thông báo thanh toán thành công (API cũ)
    @PutMapping("/{orderId}/pay-success")
    public ResponseEntity<ApiResponse<String>> processPayment(@PathVariable Long orderId) {
        String result = orderService.processPaymentSuccess(orderId);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .code(200)
                .message(result)
                .build());
    }

    // 5. Thống kê doanh thu theo tháng
    @GetMapping("/admin/revenue-stats")
    public ResponseEntity<ApiResponse<java.util.List<java.util.Map<String, Object>>>> getRevenueStats(@RequestParam(defaultValue = "2024") int year) {
        return ResponseEntity.ok(ApiResponse.<java.util.List<java.util.Map<String, Object>>>builder()
                .code(200)
                .message("Lấy thống kê doanh thu thành công")
                .data(orderService.getMonthlyRevenue(year))
                .build());
    }
}
