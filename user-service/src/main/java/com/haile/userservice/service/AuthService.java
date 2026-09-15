package com.haile.userservice.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.haile.common.security.JwtService;
import com.haile.common.dto.queue.EmailMessage;
import com.haile.common.dto.request.GoogleLoginRequest;
import com.haile.common.dto.request.LoginRequest;
import com.haile.common.dto.request.RegisterRequest;
import com.haile.common.dto.response.TokenResponse;
import com.haile.userservice.entity.User;
import com.haile.common.exception.AppException;
import com.haile.common.exception.ErrorCode;
import com.haile.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthService {

    // --- CÁC DEPENDENCY INJECTION ---
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final StringRedisTemplate redisTemplate;
    private final RabbitTemplate rabbitTemplate; // Đã đưa vào trong class

    // --- CÁC BIẾN MÔI TRƯỜNG (@Value) ---
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${app.rabbitmq.exchange}")
    private String exchangeName; // Đã đưa vào trong class

    @Value("${app.rabbitmq.routing-key}")
    private String routingKey; // Đã đưa vào trong class

    private static final long REFRESH_TOKEN_EXPIRATION_DAYS = 7;

    // 1. Luồng đăng nhập bằng tài khoản thông thường
    public TokenResponse login(LoginRequest request) {
        String identifier = request.getUsername(); // Có thể là email hoặc username
        
        User user = userRepository.findByUsername(identifier)
                .orElseGet(() -> userRepository.findByEmail(identifier)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return generateAuthenticationResult(user);
    }

    // 2. Luồng đăng nhập bằng Google OAuth2
    public TokenResponse loginWithGoogle(GoogleLoginRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getIdToken());
            if (idToken == null) {
                throw new AppException(ErrorCode.UNAUTHENTICATED);
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String fullName = (String) payload.get("name");
            String picture = (String) payload.get("picture");

            // Lấy user theo email, nếu chưa có thì tạo mới
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user == null) {
                user = User.builder()
                        .username(email) // Dùng email làm username mặc định
                        .email(email)
                        .fullName(fullName)
                        .avatarUrl(picture)
                        .password(passwordEncoder.encode(UUID.randomUUID().toString())) // Mật khẩu ngẫu nhiên bảo mật
                        .role("STUDENT") // Mặc định là học viên mới
                        .isActive(true)
                        .build();
                user = userRepository.save(user);
            } else {
                // Cập nhật thông tin từ Google nếu đang bị trống
                boolean updated = false;
                if (user.getAvatarUrl() == null && picture != null) {
                    user.setAvatarUrl(picture);
                    updated = true;
                }
                if (user.getFullName() == null || user.getFullName().equals("Người dùng tiếng trung 5s") || user.getFullName().isEmpty()) {
                    user.setFullName(fullName);
                    updated = true;
                }
                if (updated) {
                    user = userRepository.save(user);
                }
            }

            return generateAuthenticationResult(user);

        } catch (Exception e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }

    // 3. Xử lý Đăng ký và gửi Mail qua RabbitMQ
    public void register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername()) || userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .fullName(request.getFullName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("STUDENT")
                .isActive(true)
                .build();

        userRepository.save(user);

        // Bắn tin nhắn ngầm vào RabbitMQ
        EmailMessage emailMessage = EmailMessage.builder()
                .toEmail(user.getEmail())
                .fullName(user.getFullName())
                .subject("Chào mừng bạn đến với Trung tâm Tiếng Trung!")
                .content("Chúc mừng học viên " + user.getFullName() + " đã đăng ký tài khoản thành công.")
                .build();

        rabbitTemplate.convertAndSend(exchangeName, routingKey, emailMessage);
    }

    // 4. Xử lý Đăng xuất - Xóa dữ liệu phiên trong Redis
    public void logout(String username) {
        String redisKey = "RT_" + username;
        redisTemplate.delete(redisKey);
    }

    // 5. Làm mới Token
    public TokenResponse refreshToken(String refreshToken) {
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        String username = jwtService.extractUsername(refreshToken);
        if (username == null) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        String redisKey = "RT_" + username;
        String savedToken = redisTemplate.opsForValue().get(redisKey);

        if (savedToken == null || !savedToken.equals(refreshToken) || !jwtService.isTokenValid(refreshToken, username)) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        User user = userRepository.findByUsername(username)
                .orElseGet(() -> userRepository.findByEmail(username)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));

        String newAccessToken = jwtService.generateAccessToken(user.getUsername(), user.getRole());

        return TokenResponse.builder()
                .accessToken(newAccessToken)
                .role(user.getRole())
                .fullName(user.getFullName())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }

    // --- CÁC HÀM PHỤ TRỢ (PRIVATE METHODS) ---

    // Hàm phụ trợ sinh cặp token và lưu Refresh Token vào Redis
    private TokenResponse generateAuthenticationResult(User user) {
        String accessToken = jwtService.generateAccessToken(user.getUsername(), user.getRole());
        String refreshToken = jwtService.generateRefreshToken(user.getUsername());

        // Lưu trữ Refresh Token vào Redis để quản lý phiên
        String redisKey = "RT_" + user.getUsername();
        redisTemplate.opsForValue().set(
                redisKey,
                refreshToken,
                REFRESH_TOKEN_EXPIRATION_DAYS,
                TimeUnit.DAYS
        );

        return TokenResponse.builder()
                .accessToken(accessToken)
                .role(user.getRole())
                .fullName(user.getFullName())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }

    // Tạo cấu trúc ResponseCookie kiểu HttpOnly bảo mật cao chặn đứng XSS
    public ResponseCookie createHttpOnlyCookie(String username) {
        String redisKey = "RT_" + username;
        String refreshToken = redisTemplate.opsForValue().get(redisKey);

        return ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true) // Đặt thành true khi chạy trên môi trường HTTPS (Production)
                .path("/")
                .maxAge(REFRESH_TOKEN_EXPIRATION_DAYS * 24 * 60 * 60)
                .sameSite("Lax") // Chống tấn công CSRF
                .build();
    }

    // Xóa Cookie khi đăng xuất
    public ResponseCookie createCleanCookie() {
        return ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();
    }
}
