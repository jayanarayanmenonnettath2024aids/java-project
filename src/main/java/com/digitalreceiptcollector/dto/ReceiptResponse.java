package com.digitalreceiptcollector.dto;

import com.digitalreceiptcollector.model.Receipt;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceiptResponse {
    private Long id;
    private String storeName;
    private LocalDate purchaseDate;
    private BigDecimal totalAmount;
    private String category;
    private String paymentMethod;
    private String fileUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserSummary user;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserSummary {
        private Long id;
        private String name;
        private String email;
    }

    public static ReceiptResponse fromReceipt(Receipt receipt) {
        UserSummary userSummary = new UserSummary(
            receipt.getUser().getId(),
            receipt.getUser().getName(),
            receipt.getUser().getEmail()
        );

        return new ReceiptResponse(
            receipt.getId(),
            receipt.getStoreName(),
            receipt.getPurchaseDate(),
            receipt.getTotalAmount(),
            receipt.getCategory(),
            receipt.getPaymentMethod(),
            receipt.getFileUrl(),
            receipt.getCreatedAt(),
            receipt.getUpdatedAt(),
            userSummary
        );
    }
}
