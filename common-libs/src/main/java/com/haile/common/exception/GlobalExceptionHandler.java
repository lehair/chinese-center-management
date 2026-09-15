package com.haile.common.exception;

import com.haile.common.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // 1. Bắt các lỗi nghiệp vụ do chúng ta chủ động ném ra (AppException)
    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<ApiResponse<String>> handlingAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();

        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        // Có thể set HTTP status là 400 Bad Request cho những lỗi nghiệp vụ
        return ResponseEntity.badRequest().body(apiResponse);
    }

    // 2. Bắt lỗi validate DTO (@Valid)
    @ExceptionHandler(value = org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<String>> handlingValidationException(org.springframework.web.bind.MethodArgumentNotValidException exception) {
        String message = exception.getFieldError().getDefaultMessage();
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setCode(400);
        apiResponse.setMessage(message);
        return ResponseEntity.badRequest().body(apiResponse);
    }

    // 3. Bắt tất cả các lỗi còn lại (Ví dụ: Lỗi NullPointer, lỗi Database ngỏm...)
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ApiResponse<String>> handlingRuntimeException(Exception exception) {
        // Log lỗi ra console để dev biết đường sửa
        log.error("Uncategorized Exception: ", exception);

        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage() + " - Chi tiết: " + exception.getMessage());

        // Lỗi không lường trước được thì trả về 500 Internal Server Error
        return ResponseEntity.internalServerError().body(apiResponse);
    }
}