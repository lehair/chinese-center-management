package com.haile.common.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    @NotNull(message = "ID của học viên không được để trống")
    private Long studentId; // Trong thực tế sẽ lấy từ Token JWT, nhưng để test Postman ta truyền tạm vào đây

    @NotEmpty(message = "Danh sách khóa học không được để trống")
    private List<Long> courseIds;

    @NotNull(message = "Phương thức thanh toán không được để trống")
    private String paymentMethod; // Ví dụ: "VNPAY", "MOMO", "BANK_TRANSFER"
}