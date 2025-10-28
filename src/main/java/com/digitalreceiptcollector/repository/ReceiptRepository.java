package com.digitalreceiptcollector.repository;

import com.digitalreceiptcollector.model.Receipt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Long> {
    
    Page<Receipt> findByUserId(Long userId, Pageable pageable);
    
    List<Receipt> findByUserId(Long userId);
    
    @Query("SELECT r FROM Receipt r WHERE r.user.id = :userId AND " +
           "(:storeName IS NULL OR LOWER(r.storeName) LIKE LOWER(CONCAT('%', :storeName, '%'))) AND " +
           "(:category IS NULL OR LOWER(r.category) LIKE LOWER(CONCAT('%', :category, '%'))) AND " +
           "(:startDate IS NULL OR r.purchaseDate >= :startDate) AND " +
           "(:endDate IS NULL OR r.purchaseDate <= :endDate)")
    Page<Receipt> searchReceipts(
        @Param("userId") Long userId,
        @Param("storeName") String storeName,
        @Param("category") String category,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate,
        Pageable pageable
    );
    
    @Query("SELECT SUM(r.totalAmount) FROM Receipt r WHERE r.user.id = :userId")
    BigDecimal getTotalSpendingByUser(@Param("userId") Long userId);
    
    @Query("SELECT r.category, COUNT(r) FROM Receipt r GROUP BY r.category")
    List<Object[]> countReceiptsByCategory();
    
    @Query("SELECT r.category, SUM(r.totalAmount) FROM Receipt r GROUP BY r.category")
    List<Object[]> sumAmountByCategory();
    
    @Query("SELECT r.paymentMethod, COUNT(r) FROM Receipt r GROUP BY r.paymentMethod")
    List<Object[]> countReceiptsByPaymentMethod();
    
    @Query("SELECT FUNCTION('DATE_FORMAT', r.purchaseDate, '%Y-%m'), COUNT(r) FROM Receipt r GROUP BY FUNCTION('DATE_FORMAT', r.purchaseDate, '%Y-%m') ORDER BY FUNCTION('DATE_FORMAT', r.purchaseDate, '%Y-%m')")
    List<Object[]> countReceiptsByMonth();
    
    @Query("SELECT FUNCTION('DATE_FORMAT', r.purchaseDate, '%Y-%m'), SUM(r.totalAmount) FROM Receipt r GROUP BY FUNCTION('DATE_FORMAT', r.purchaseDate, '%Y-%m') ORDER BY FUNCTION('DATE_FORMAT', r.purchaseDate, '%Y-%m')")
    List<Object[]> sumAmountByMonth();
}
