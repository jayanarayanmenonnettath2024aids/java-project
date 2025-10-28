package com.digitalreceiptcollector.service;

import com.digitalreceiptcollector.dto.AnalyticsResponse;
import com.digitalreceiptcollector.repository.ReceiptRepository;
import com.digitalreceiptcollector.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ReceiptRepository receiptRepository;

    public AnalyticsResponse getAnalytics() {
        AnalyticsResponse analytics = new AnalyticsResponse();

        // Total users and receipts
        analytics.setTotalUsers(userRepository.count());
        analytics.setTotalReceipts(receiptRepository.count());

        // Total spending
        BigDecimal totalSpending = receiptRepository.findAll().stream()
                .map(receipt -> receipt.getTotalAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        analytics.setTotalSpending(totalSpending);

        // Receipts by category
        Map<String, Long> receiptsByCategory = new HashMap<>();
        List<Object[]> categoryData = receiptRepository.countReceiptsByCategory();
        for (Object[] data : categoryData) {
            String category = data[0] != null ? (String) data[0] : "Uncategorized";
            Long count = (Long) data[1];
            receiptsByCategory.put(category, count);
        }
        analytics.setReceiptsByCategory(receiptsByCategory);

        // Spending by category
        Map<String, BigDecimal> spendingByCategory = new HashMap<>();
        List<Object[]> spendingData = receiptRepository.sumAmountByCategory();
        for (Object[] data : spendingData) {
            String category = data[0] != null ? (String) data[0] : "Uncategorized";
            BigDecimal amount = (BigDecimal) data[1];
            spendingByCategory.put(category, amount);
        }
        analytics.setSpendingByCategory(spendingByCategory);

        // Receipts by payment method
        Map<String, Long> receiptsByPaymentMethod = new HashMap<>();
        List<Object[]> paymentData = receiptRepository.countReceiptsByPaymentMethod();
        for (Object[] data : paymentData) {
            String method = data[0] != null ? (String) data[0] : "Unknown";
            Long count = (Long) data[1];
            receiptsByPaymentMethod.put(method, count);
        }
        analytics.setReceiptsByPaymentMethod(receiptsByPaymentMethod);

        // Monthly receipt count
        Map<String, Long> monthlyReceiptCount = new HashMap<>();
        List<Object[]> monthlyCountData = receiptRepository.countReceiptsByMonth();
        for (Object[] data : monthlyCountData) {
            String month = (String) data[0];
            Long count = (Long) data[1];
            monthlyReceiptCount.put(month, count);
        }
        analytics.setMonthlyReceiptCount(monthlyReceiptCount);

        // Monthly spending
        Map<String, BigDecimal> monthlySpending = new HashMap<>();
        List<Object[]> monthlySpendingData = receiptRepository.sumAmountByMonth();
        for (Object[] data : monthlySpendingData) {
            String month = (String) data[0];
            BigDecimal amount = (BigDecimal) data[1];
            monthlySpending.put(month, amount);
        }
        analytics.setMonthlySpending(monthlySpending);

        return analytics;
    }
}
