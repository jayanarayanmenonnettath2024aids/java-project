package com.digitalreceiptcollector.controller;

import com.digitalreceiptcollector.dto.MessageResponse;
import com.digitalreceiptcollector.dto.ReceiptRequest;
import com.digitalreceiptcollector.dto.ReceiptResponse;
import com.digitalreceiptcollector.service.ReceiptService;
import com.digitalreceiptcollector.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/receipts")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Receipt", description = "Receipt management API")
public class ReceiptController {

    private final ReceiptService receiptService;
    private final UserService userService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload a new receipt", description = "Create a new receipt with optional file upload (PDF or image)")
    public ResponseEntity<ReceiptResponse> createReceipt(
            @Valid @RequestPart("receipt") ReceiptRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file,
            Authentication authentication) {
        Long userId = userService.getCurrentUserId(authentication);
        ReceiptResponse response = receiptService.createReceipt(userId, request, file);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all receipts", description = "Retrieve all receipts for the logged-in user with pagination")
    public ResponseEntity<Page<ReceiptResponse>> getAllReceipts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir,
            Authentication authentication) {
        Long userId = userService.getCurrentUserId(authentication);
        Sort sort = sortDir.equalsIgnoreCase("ASC") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ReceiptResponse> receipts = receiptService.getUserReceipts(userId, pageable);
        return ResponseEntity.ok(receipts);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get receipt by ID", description = "Retrieve a specific receipt by its ID")
    public ResponseEntity<ReceiptResponse> getReceiptById(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = userService.getCurrentUserId(authentication);
        ReceiptResponse response = receiptService.getReceiptById(id, userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Update a receipt", description = "Update an existing receipt with optional file replacement")
    public ResponseEntity<ReceiptResponse> updateReceipt(
            @PathVariable Long id,
            @Valid @RequestPart("receipt") ReceiptRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file,
            Authentication authentication) {
        Long userId = userService.getCurrentUserId(authentication);
        ReceiptResponse response = receiptService.updateReceipt(id, userId, request, file);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a receipt", description = "Delete a receipt and its associated file")
    public ResponseEntity<MessageResponse> deleteReceipt(
            @PathVariable Long id,
            Authentication authentication) {
        Long userId = userService.getCurrentUserId(authentication);
        receiptService.deleteReceipt(id, userId);
        return ResponseEntity.ok(new MessageResponse("Receipt deleted successfully"));
    }

    @GetMapping("/search")
    @Operation(summary = "Search receipts", description = "Search and filter receipts by store name, category, and date range")
    public ResponseEntity<Page<ReceiptResponse>> searchReceipts(
            @Parameter(description = "Store name to search for") @RequestParam(required = false) String storeName,
            @Parameter(description = "Category to filter by") @RequestParam(required = false) String category,
            @Parameter(description = "Start date (yyyy-MM-dd)") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @Parameter(description = "End date (yyyy-MM-dd)") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir,
            Authentication authentication) {
        Long userId = userService.getCurrentUserId(authentication);
        Sort sort = sortDir.equalsIgnoreCase("ASC") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ReceiptResponse> receipts = receiptService.searchReceipts(userId, storeName, category, startDate, endDate, pageable);
        return ResponseEntity.ok(receipts);
    }
}
