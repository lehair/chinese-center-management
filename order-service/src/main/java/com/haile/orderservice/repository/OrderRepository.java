package com.haile.orderservice.repository;

import com.haile.orderservice.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStudentIdOrderByCreatedAtDesc(Long studentId);

    @org.springframework.data.jpa.repository.Query("SELECT EXTRACT(MONTH FROM o.createdAt), SUM(o.totalPrice) FROM Order o WHERE o.status = 'COMPLETED' AND EXTRACT(YEAR FROM o.createdAt) = :year GROUP BY EXTRACT(MONTH FROM o.createdAt)")
    List<Object[]> getMonthlyRevenue(@org.springframework.data.repository.query.Param("year") int year);
}
