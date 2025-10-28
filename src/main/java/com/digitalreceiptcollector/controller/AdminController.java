package com.digitalreceiptcollector.controller;

import com.digitalreceiptcollector.dto.AnalyticsResponse;
import com.digitalreceiptcollector.dto.MessageResponse;
import com.digitalreceiptcollector.dto.UserResponse;
import com.digitalreceiptcollector.service.AdminService;
import com.digitalreceiptcollector.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Admin", description = "Admin management API (Admin only)")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final AdminService adminService;

    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Admin: Retrieve all registered users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    @Operation(summary = "Get user by ID", description = "Admin: Retrieve a specific user by ID")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/users/{id}")
    @Operation(summary = "Delete user", description = "Admin: Delete a user and all their receipts")
    public ResponseEntity<MessageResponse> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(new MessageResponse("User deleted successfully"));
    }

    @GetMapping("/analytics")
    @Operation(summary = "Get analytics", description = "Admin: Retrieve comprehensive analytics including spending by category, payment methods, and monthly trends")
    public ResponseEntity<AnalyticsResponse> getAnalytics() {
        AnalyticsResponse analytics = adminService.getAnalytics();
        return ResponseEntity.ok(analytics);
    }
}
