package com.haile.aiservice.controller;

import com.haile.aiservice.dto.ChatRequest;
import com.haile.aiservice.dto.ChatResponse;
import com.haile.aiservice.service.AiService;
import com.haile.common.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/chat")
    public ResponseEntity<ApiResponse<ChatResponse>> chat(@RequestBody ChatRequest request) {
        String reply = aiService.generateChatResponse(request.getMessage());
        ChatResponse response = new ChatResponse(reply);
        return ResponseEntity.ok(ApiResponse.<ChatResponse>builder()
                .code(200)
                .message("Phản hồi từ AI thành công")
                .data(response)
                .build());
    }
}
