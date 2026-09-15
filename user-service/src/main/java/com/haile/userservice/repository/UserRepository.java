package com.haile.userservice.repository;

import com.haile.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    
    java.util.List<User> findByRoleAndIsActiveTrue(String role);

    @org.springframework.data.jpa.repository.Query("SELECT EXTRACT(MONTH FROM u.createdAt), COUNT(u.id) FROM User u WHERE EXTRACT(YEAR FROM u.createdAt) = :year GROUP BY EXTRACT(MONTH FROM u.createdAt)")
    java.util.List<Object[]> getMonthlyRegistrations(@org.springframework.data.repository.query.Param("year") int year);
}
