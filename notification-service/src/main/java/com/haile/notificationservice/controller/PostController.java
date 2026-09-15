package com.haile.notificationservice.controller;

import com.haile.common.dto.response.ApiResponse;
import com.haile.common.exception.AppException;
import com.haile.common.exception.ErrorCode;
import com.haile.notificationservice.entity.Post;
import com.haile.notificationservice.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;

    @GetMapping
    public ApiResponse<List<Post>> getAllPosts() {
        return ApiResponse.<List<Post>>builder()
                .code(200)
                .message("Lấy danh sách bài viết thành công")
                .data(postRepository.findAllByOrderByIdDesc())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<Post> getPostById(@PathVariable Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION)); // Should map to NOT_FOUND
        return ApiResponse.<Post>builder()
                .code(200)
                .message("Lấy bài viết thành công")
                .data(post)
                .build();
    }
}
