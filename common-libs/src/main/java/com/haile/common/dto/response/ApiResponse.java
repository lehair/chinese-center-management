package com.haile.common.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // Nếu data bị null thì sẽ không hiển thị trường này trong chuỗi JSON
public class ApiResponse<T> {

    @Builder.Default
    private int code = 200; // Mã trạng thái tùy chỉnh (200: Thành công, 400: Lỗi dữ liệu...)

    private String message; // Thông báo (VD: "Lấy danh sách thành công")

    private T data; // Dữ liệu trả về (Có thể là List, Object, hoặc String)
}