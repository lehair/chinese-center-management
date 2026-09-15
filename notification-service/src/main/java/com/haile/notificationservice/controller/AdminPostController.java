package com.haile.notificationservice.controller;

import com.haile.common.dto.response.ApiResponse;
import com.haile.notificationservice.entity.Post;
import com.haile.notificationservice.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts/admin")
@RequiredArgsConstructor
public class AdminPostController {

    private final PostRepository postRepository;

    @PostMapping
    public ApiResponse<Post> createPost(@RequestBody Post post) {
        return ApiResponse.<Post>builder()
                .code(201)
                .message("Tạo bài viết thành công")
                .data(postRepository.save(post))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa bài viết thành công")
                .build();
    }
}
