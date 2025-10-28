package com.digitalreceiptcollector.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {
    private Long totalUsers;
    private Long totalReceipts;
    private BigDecimal totalSpending;
    private Map<String, Long> receiptsByCategory;
    private Map<String, BigDecimal> spendingByCategory;
    private Map<String, Long> receiptsByPaymentMethod;
    private Map<String, Long> monthlyReceiptCount;
    private Map<String, BigDecimal> monthlySpending;
}
