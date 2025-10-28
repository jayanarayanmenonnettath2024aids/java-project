-- Sample receipts data for testing
-- First, create a test user if not exists (password: password123)
INSERT INTO users (name, email, password, role, created_at) 
VALUES ('Test User', 'test@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', NOW())
ON DUPLICATE KEY UPDATE id=id;

-- Get the user ID
SET @user_id = (SELECT id FROM users WHERE email = 'test@example.com' LIMIT 1);

-- Add Walmart receipt
INSERT INTO receipts (user_id, store_name, purchase_date, total_amount, category, payment_method, file_url, created_at, updated_at)
VALUES (@user_id, 'WALMART', '2025-10-28', 1221.00, 'SHOPPING', 'CREDIT_CARD', 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop', NOW(), NOW());

-- Add Amazon receipt
INSERT INTO receipts (user_id, store_name, purchase_date, total_amount, category, payment_method, file_url, created_at, updated_at)
VALUES (@user_id, 'AMAZON', '2025-10-28', 120.00, 'FOOD', 'DEBIT_CARD', 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=300&fit=crop', NOW(), NOW());

-- Add more sample receipts for better dashboard
INSERT INTO receipts (user_id, store_name, purchase_date, total_amount, category, payment_method, file_url, created_at, updated_at)
VALUES 
(@user_id, 'Target', '2025-10-25', 85.50, 'SHOPPING', 'CREDIT_CARD', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop', NOW(), NOW()),
(@user_id, 'Starbucks', '2025-10-27', 15.75, 'FOOD', 'UPI', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop', NOW(), NOW()),
(@user_id, 'Shell Gas Station', '2025-10-26', 65.00, 'TRANSPORTATION', 'DEBIT_CARD', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop', NOW(), NOW()),
(@user_id, 'CVS Pharmacy', '2025-10-24', 42.30, 'HEALTHCARE', 'CASH', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop', NOW(), NOW());
