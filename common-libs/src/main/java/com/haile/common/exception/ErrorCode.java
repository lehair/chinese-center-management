package com.haile.common.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    // Lỗi hệ thống chung (1xxx)
    UNCATEGORIZED_EXCEPTION(1000, "Lỗi hệ thống không xác định"),
    INVALID_KEY(1001, "Lỗi cấu hình enum"),

    // Lỗi liên quan đến User (Auth) (2xxx)
    USER_EXISTED(2001, "Tên đăng nhập hoặc Email đã tồn tại"),
    USER_NOT_FOUND(2002, "Không tìm thấy người dùng"),
    UNAUTHENTICATED(2003, "Bạn chưa đăng nhập"),
    UNAUTHORIZED(2004, "Bạn không có quyền thực hiện chức năng này"),

    // Lỗi liên quan đến Course (3xxx)
    COURSE_NOT_FOUND(3001, "Không tìm thấy khóa học này");

    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}