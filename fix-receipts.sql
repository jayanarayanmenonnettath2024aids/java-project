-- Update receipts for user_id 2 (jaya@gmail.com) with proper image URLs
UPDATE receipts 
SET file_url = 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=300&fit=crop'
WHERE id = 1 AND user_id = 2;

UPDATE receipts 
SET file_url = 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop'
WHERE id = 2 AND user_id = 2;

-- Add more receipts for user_id 2 for better dashboard
INSERT INTO receipts (user_id, store_name, purchase_date, total_amount, category, payment_method, file_url, created_at, updated_at)
VALUES 
(2, 'Target', '2025-10-25', 85.50, 'SHOPPING', 'CREDIT_CARD', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop', NOW(), NOW()),
(2, 'Starbucks', '2025-10-27', 15.75, 'FOOD', 'UPI', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop', NOW(), NOW()),
(2, 'Shell Gas Station', '2025-10-26', 65.00, 'TRANSPORTATION', 'DEBIT_CARD', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop', NOW(), NOW()),
(2, 'CVS Pharmacy', '2025-10-24', 42.30, 'HEALTHCARE', 'CASH', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop', NOW(), NOW()),
(2, 'McDonald''s', '2025-10-23', 28.50, 'FOOD', 'UPI', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop', NOW(), NOW()),
(2, 'Best Buy', '2025-10-22', 450.00, 'SHOPPING', 'CREDIT_CARD', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop', NOW(), NOW());
