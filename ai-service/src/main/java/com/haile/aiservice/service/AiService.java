package com.haile.aiservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.haile.common.client.CourseClient;
import com.haile.common.dto.response.CourseResponse;
import com.haile.common.dto.response.ApiResponse;

@Service
public class AiService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final CourseClient courseClient;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private static final String SYSTEM_PROMPT_BASE = "Bạn là trợ lý ảo thân thiện của Trung tâm tiếng Trung tên là 'trợ lý ảo tiếng trung 5s'. Bạn chuyên tư vấn về các khóa học tiếng Trung (như Giáo Trình Hán Ngữ, Luyện Thi HSK, Khóa học Giao tiếp), lịch khai giảng, và hỗ trợ học viên. Bạn luôn trả lời ngắn gọn, lịch sự, và nhiệt tình. Nếu khách hàng hỏi về khóa học, hãy sử dụng danh sách các khóa học hiện tại của trung tâm dưới đây để tư vấn cho phù hợp. Với mỗi khóa học, hãy đính kèm link trực tiếp để người dùng bấm vào (Link định dạng: /courses/{id}). Nếu không biết, hãy hướng dẫn học viên liên hệ hotline 0969 999 999.\n\nDANH SÁCH KHÓA HỌC HIỆN CÓ:\n";

    public AiService(RestTemplate restTemplate, CourseClient courseClient) {
        this.restTemplate = restTemplate;
        this.courseClient = courseClient;
        this.objectMapper = new ObjectMapper();
    }

    public String generateChatResponse(String userMessage) {
        try {
            String fullUrl = apiUrl + apiKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Fetch courses
            StringBuilder dynamicPrompt = new StringBuilder(SYSTEM_PROMPT_BASE);
            try {
                ApiResponse<List<CourseResponse>> response = courseClient.getAllCourses();
                if (response != null && response.getData() != null) {
                    for (CourseResponse course : response.getData()) {
                        dynamicPrompt.append("- [").append(course.getId()).append("] ").append(course.getTitle())
                                .append(" (Level: ").append(course.getLevel()).append(") ")
                                .append("- Giá: ").append(course.getPrice()).append(" VND ")
                                .append("- Link: http://localhost:5173/courses/").append(course.getId())
                                .append("\n");
                    }
                }
            } catch (Exception ex) {
                System.out.println("Could not fetch courses from CourseService: " + ex.getMessage());
            }

            // Constructing Gemini API JSON body
            Map<String, Object> systemInstruction = new HashMap<>();
            Map<String, Object> systemParts = new HashMap<>();
            systemParts.put("text", dynamicPrompt.toString());
            systemInstruction.put("parts", List.of(systemParts));

            Map<String, Object> userMessageMap = new HashMap<>();
            userMessageMap.put("role", "user");
            Map<String, Object> userParts = new HashMap<>();
            userParts.put("text", userMessage);
            userMessageMap.put("parts", List.of(userParts));

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("systemInstruction", systemInstruction);
            requestBody.put("contents", List.of(userMessageMap));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(fullUrl, entity, String.class);

            JsonNode rootNode = objectMapper.readTree(response.getBody());
            JsonNode textNode = rootNode.path("candidates").get(0)
                    .path("content").path("parts").get(0).path("text");
            
            return textNode.asText();
        } catch (Exception e) {
            e.printStackTrace();
            return "Xin lỗi, hiện tại tôi đang gặp chút sự cố kỹ thuật và không thể kết nối tới máy chủ. Vui lòng thử lại sau nhé!";
        }
    }
}
