package com.haile.userservice.config;

import com.haile.userservice.entity.User;
import com.haile.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Kiểm tra xem đã có tài khoản admin chưa
        if (!userRepository.existsByUsername("admin")) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@haile.com")
                    .password(passwordEncoder.encode("admin123")) // Mật khẩu mặc định
                    .fullName("Quản Trị Viên")
                    .role("ADMIN")
                    .isActive(true)
                    .build();
            userRepository.save(admin);
            System.out.println("Đã tạo tài khoản admin mặc định: admin / admin123");
        }
    }
}
