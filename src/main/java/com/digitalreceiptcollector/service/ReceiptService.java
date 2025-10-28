package com.digitalreceiptcollector.service;

import com.digitalreceiptcollector.dto.ReceiptRequest;
import com.digitalreceiptcollector.dto.ReceiptResponse;
import com.digitalreceiptcollector.exception.BadRequestException;
import com.digitalreceiptcollector.exception.ResourceNotFoundException;
import com.digitalreceiptcollector.model.Receipt;
import com.digitalreceiptcollector.model.User;
import com.digitalreceiptcollector.repository.ReceiptRepository;
import com.digitalreceiptcollector.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ReceiptService {

    private final ReceiptRepository receiptRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    @Transactional
    public ReceiptResponse createReceipt(Long userId, ReceiptRequest request, MultipartFile file) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Receipt receipt = new Receipt();
        receipt.setUser(user);
        receipt.setStoreName(request.getStoreName());
        receipt.setPurchaseDate(request.getPurchaseDate());
        receipt.setTotalAmount(request.getTotalAmount());
        receipt.setCategory(request.getCategory());
        receipt.setPaymentMethod(request.getPaymentMethod());

        if (file != null && !file.isEmpty()) {
            String fileName = fileStorageService.storeFile(file);
            receipt.setFileUrl(fileStorageService.getFileUrl(fileName));
        }

        Receipt savedReceipt = receiptRepository.save(receipt);
        return ReceiptResponse.fromReceipt(savedReceipt);
    }

    public Page<ReceiptResponse> getUserReceipts(Long userId, Pageable pageable) {
        return receiptRepository.findByUserId(userId, pageable)
                .map(ReceiptResponse::fromReceipt);
    }

    public ReceiptResponse getReceiptById(Long receiptId, Long userId) {
        Receipt receipt = receiptRepository.findById(receiptId)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt not found with id: " + receiptId));

        if (!receipt.getUser().getId().equals(userId)) {
            throw new BadRequestException("You don't have permission to access this receipt");
        }

        return ReceiptResponse.fromReceipt(receipt);
    }

    @Transactional
    public ReceiptResponse updateReceipt(Long receiptId, Long userId, ReceiptRequest request, MultipartFile file) {
        Receipt receipt = receiptRepository.findById(receiptId)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt not found with id: " + receiptId));

        if (!receipt.getUser().getId().equals(userId)) {
            throw new BadRequestException("You don't have permission to update this receipt");
        }

        receipt.setStoreName(request.getStoreName());
        receipt.setPurchaseDate(request.getPurchaseDate());
        receipt.setTotalAmount(request.getTotalAmount());
        receipt.setCategory(request.getCategory());
        receipt.setPaymentMethod(request.getPaymentMethod());

        if (file != null && !file.isEmpty()) {
            // Delete old file if exists
            if (receipt.getFileUrl() != null) {
                String oldFileName = receipt.getFileUrl().substring(receipt.getFileUrl().lastIndexOf("/") + 1);
                fileStorageService.deleteFile(oldFileName);
            }
            String fileName = fileStorageService.storeFile(file);
            receipt.setFileUrl(fileStorageService.getFileUrl(fileName));
        }

        Receipt updatedReceipt = receiptRepository.save(receipt);
        return ReceiptResponse.fromReceipt(updatedReceipt);
    }

    @Transactional
    public void deleteReceipt(Long receiptId, Long userId) {
        Receipt receipt = receiptRepository.findById(receiptId)
                .orElseThrow(() -> new ResourceNotFoundException("Receipt not found with id: " + receiptId));

        if (!receipt.getUser().getId().equals(userId)) {
            throw new BadRequestException("You don't have permission to delete this receipt");
        }

        // Delete associated file
        if (receipt.getFileUrl() != null) {
            String fileName = receipt.getFileUrl().substring(receipt.getFileUrl().lastIndexOf("/") + 1);
            fileStorageService.deleteFile(fileName);
        }

        receiptRepository.delete(receipt);
    }

    public Page<ReceiptResponse> searchReceipts(Long userId, String storeName, String category,
                                                 LocalDate startDate, LocalDate endDate, Pageable pageable) {
        return receiptRepository.searchReceipts(userId, storeName, category, startDate, endDate, pageable)
                .map(ReceiptResponse::fromReceipt);
    }
}
