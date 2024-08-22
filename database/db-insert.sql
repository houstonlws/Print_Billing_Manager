USE print_billing_db;

INSERT INTO auth (email, password) VALUES ('dev@dev.dev', 'pass');
INSERT INTO users (id, email, type, department_id) SELECT id, email, 'ADMIN', 0 FROM auth  WHERE email = 'dev@dev.dev';

INSERT INTO prices (name, bw_price, color_price, paper_price, is_active) VALUES ('default', .05, .10, .12, 1);

INSERT INTO printers (serial_number, model, brand, location, installation_date, 
warranty_expiry_date, ip_address, mac_address, firmware_version, department_id)
VALUES 
('SN123456', 'HP LaserJet Pro M404dw', 'HP', 'Office 1, Floor 2', '2022-01-15', '2024-01-15', '192.168.1.101', '00:1A:2B:3C:4D:5E', '2023.04.01', 1),
('SN789012', 'Brother HL-L2390DW', 'Brother', 'Office 1, Floor 2', '2022-02-10', '2024-02-10', '192.168.1.102', '00:1A:2B:3C:4D:5F', '2023.05.01', 1),
('SN345678', 'Canon imageCLASS MF267dw', 'Canon', 'Lab 1, Floor 3', '2022-03-20', '2024-03-20', '192.168.1.103', '00:1A:2B:3C:4D:6E', '2023.06.01', 2),
('SN901234', 'Epson EcoTank ET-4760', 'Epson', 'Lab 1, Floor 3', '2022-04-25', '2024-04-25', '192.168.1.104', '00:1A:2B:3C:4D:7F', '2023.07.01', 2),
('SN567890', 'Samsung Xpress M2020W', 'Samsung', 'Office 2, Floor 1', '2022-05-15', '2024-05-15', '192.168.1.105', '00:1A:2B:3C:4D:8G', '2023.08.01', 3),
('SN234567', 'Lexmark MB2236adw', 'Lexmark', 'Office 2, Floor 1', '2022-06-30', '2024-06-30', '192.168.1.106', '00:1A:2B:3C:4D:9H', '2023.09.01', 3),
('SN890123', 'Dell Color Laser Printer 1320c', 'Dell', 'Office 3, Floor 2', '2022-07-10', '2024-07-10', '192.168.1.107', '00:1A:2B:3C:4D:0I', '2023.10.01', 4),
('SN456789', 'Ricoh SP C261SFNw', 'Ricoh', 'Office 3, Floor 2', '2022-08-20', '2024-08-20', '192.168.1.108', '00:1A:2B:3C:4D:1J', '2023.11.01', 4),
('SN012345', 'Brother MFC-L2750DW', 'Brother', 'Lab 2, Floor 4', '2022-09-05', '2024-09-05', '192.168.1.109', '00:1A:2B:3C:4D:2K', '2023.12.01', 5),
('SN678901', 'HP OfficeJet Pro 8025', 'HP', 'Lab 2, Floor 4', '2022-10-15', '2024-10-15', '192.168.1.110', '00:1A:2B:3C:4D:3L', '2024.01.01', 5),
('SN234567', 'Canon PIXMA TR8520', 'Canon', 'Clinic 1, Floor 5', '2022-11-20', '2024-11-20', '192.168.1.111', '00:1A:2B:3C:4D:4M', '2024.02.01', 6),
('SN890123', 'Xerox Phaser 6510', 'Xerox', 'Clinic 1, Floor 5', '2022-12-30', '2024-12-30', '192.168.1.112', '00:1A:2B:3C:4D:5N', '2024.03.01', 6),
('SN123789', 'HP LaserJet Pro M402n', 'HP', 'Office 1, Floor 2', '2023-01-15', '2025-01-15', '192.168.1.113', '00:1A:2B:3C:4D:6O', '2024.04.01', 1),
('SN456890', 'Brother HL-L2370DW', 'Brother', 'Office 1, Floor 2', '2023-02-10', '2025-02-10', '192.168.1.114', '00:1A:2B:3C:4D:7P', '2024.05.01', 1),
('SN678901', 'Canon imageCLASS D1620', 'Canon', 'Lab 1, Floor 3', '2023-03-20', '2025-03-20', '192.168.1.115', '00:1A:2B:3C:4D:8Q', '2024.06.01', 2),
('SN234567', 'Epson WorkForce Pro WF-3720', 'Epson', 'Lab 1, Floor 3', '2023-04-25', '2025-04-25', '192.168.1.116', '00:1A:2B:3C:4D:9R', '2024.07.01', 2),
('SN789012', 'Samsung ProXpress M4583FX', 'Samsung', 'Office 2, Floor 1', '2023-05-15', '2025-05-15', '192.168.1.117', '00:1A:2B:3C:4D:0S', '2024.08.01', 3),
('SN345678', 'Lexmark MC2535adwe', 'Lexmark', 'Office 2, Floor 1', '2023-06-30', '2025-06-30', '192.168.1.118', '00:1A:2B:3C:4D:1T', '2024.09.01', 3),
('SN12345', 'Model X', 'Brand A', 'Building A, Room 101', '2022-01-15', '2023-01-15', '192.168.1.10', '00:14:22:01:23:45', '1.0.0', 1),
('SN67890', 'Model Y', 'Brand B', 'Building B, Room 202', '2022-02-20', '2023-02-20', '192.168.1.20', '00:14:22:02:34:56', '1.1.0', 2),
('SN54321', 'Model Z', 'Brand C', 'Building C, Room 303', '2022-03-25', '2023-03-25', '192.168.1.30', '00:14:22:03:45:67', '1.2.0', 3),
('SN23456', 'Model W', 'Brand D', 'Building D, Room 404', '2022-04-10', '2023-04-10', '192.168.1.40', '00:14:22:04:56:78', '1.3.0', 4),
('SN78901', 'Model V', 'Brand E', 'Building E, Room 505', '2022-05-15', '2023-05-15', '192.168.1.50', '00:14:22:05:67:89', '1.4.0', 5),
('SN65432', 'Model U', 'Brand F', 'Building F, Room 606', '2022-06-20', '2023-06-20', '192.168.1.60', '00:14:22:06:78:90', '1.5.0', 6),
('SN34567', 'Model T', 'Brand G', 'Building G, Room 707', '2022-07-25', '2023-07-25', '192.168.1.70', '00:14:22:07:89:01', '1.6.0', 7),
('SN89012', 'Model S', 'Brand H', 'Building H, Room 808', '2022-08-30', '2023-08-30', '192.168.1.80', '00:14:22:08:90:12', '1.7.0', 8),
('SN32109', 'Model R', 'Brand I', 'Building I, Room 909', '2022-09-05', '2023-09-05', '192.168.1.90', '00:14:22:09:01:23', '1.8.0', 9),
('SN87654', 'Model Q', 'Brand J', 'Building J, Room 1010', '2022-10-10', '2023-10-10', '192.168.1.100', '00:14:22:10:12:34', '1.9.0', 10),
('SN56789', 'Model P', 'Brand K', 'Building K, Room 1111', '2022-11-15', '2023-11-15', '192.168.1.110', '00:14:22:11:23:45', '2.0.0', 11),
('SN43210', 'Model O', 'Brand L', 'Building L, Room 1212', '2022-12-20', '2023-12-20', '192.168.1.120', '00:14:22:12:34:56', '2.1.0', 12),
('SN21098', 'Model N', 'Brand M', 'Building M, Room 1313', '2023-01-25', '2024-01-25', '192.168.1.130', '00:14:22:13:45:67', '2.2.0', 13),
('SN87632', 'Model M', 'Brand N', 'Building N, Room 1414', '2023-02-01', '2024-02-01', '192.168.1.140', '00:14:22:14:56:78', '2.3.0', 14),
('SN67854', 'Model L', 'Brand O', 'Building O, Room 1515', '2023-03-10', '2024-03-10', '192.168.1.150', '00:14:22:15:67:89', '2.4.0', 15);
   
INSERT INTO metrics (
printer_id, total_pages_printed, monthly_print_volume, total_print_jobs, 
monthly_print_jobs, toner_levels, toner_usage_monthly, paper_levels, 
paper_usage_monthly, total_color_pages_printed, total_color_pages_last_billing, 
total_bw_pages_printed, total_bw_pages_last_billing)
VALUES
(1, 5000, 1000, 200, 50, '75% cyan, 50% magenta, 80% yellow, 20% black', '1200 pages', '200 sheets', 500, 1500, 200, 350, 100),
(2, 3000, 800, 150, 40, '60% cyan, 40% magenta, 70% yellow, 30% black', '1000 pages', '150 sheets', 400, 1000, 180, 300, 80),
(3, 7000, 1500, 300, 60, '80% cyan, 60% magenta, 90% yellow, 10% black', '1500 pages', '250 sheets', 600, 2000, 250, 500, 120),
(4, 4500, 900, 180, 45, '70% cyan, 55% magenta, 75% yellow, 25% black', '1100 pages', '180 sheets', 450, 1200, 190, 320, 90),
(5, 5500, 1200, 250, 55, '85% cyan, 65% magenta, 95% yellow, 15% black', '1300 pages', '220 sheets', 550, 1700, 220, 400, 110),
(6, 4000, 850, 160, 35, '65% cyan, 45% magenta, 65% yellow, 35% black', '900 pages', '160 sheets', 380, 900, 160, 280, 70),
(7, 6000, 1300, 270, 50, '90% cyan, 70% magenta, 100% yellow, 10% black', '1400 pages', '240 sheets', 600, 1800, 230, 450, 100),
(8, 4800, 1000, 190, 48, '72% cyan, 52% magenta, 78% yellow, 22% black', '1150 pages', '190 sheets', 480, 1300, 210, 360, 85),
(9, 5200, 1100, 210, 42, '82% cyan, 58% magenta, 85% yellow, 18% black', '1250 pages', '210 sheets', 520, 1500, 200, 380, 95),
(10, 6800, 1400, 290, 65, '95% cyan, 75% magenta, 110% yellow, 12% black', '1600 pages', '260 sheets', 700, 2200, 270, 500, 130),
(11, 3600, 900, 180, 45, '65% cyan, 40% magenta, 75% yellow, 25% black', '1100 pages', '200 sheets', 450, 1000, 190, 320, 90),
(12, 5000, 1000, 250, 50, '80% cyan, 60% magenta, 90% yellow, 20% black', '1300 pages', '220 sheets', 550, 1500, 220, 400, 110),
(13, 4200, 850, 160, 40, '60% cyan, 50% magenta, 70% yellow, 30% black', '900 pages', '170 sheets', 380, 1200, 180, 280, 70),
(14, 6300, 1300, 270, 55, '85% cyan, 70% magenta, 95% yellow, 15% black', '1400 pages', '250 sheets', 600, 1700, 230, 450, 100),
(15, 4700, 1000, 190, 48, '75% cyan, 55% magenta, 85% yellow, 25% black', '1150 pages', '210 sheets', 480, 1400, 210, 360, 85);
    
INSERT INTO maintenance_requests (printer_id, department_id, request_date, maintenance_type, description, status, resolved_date) VALUES
(1, 1, '2022-06-01', 'Routine Check', 'Routine maintenance check and toner replacement', 'Resolved', '2022-06-02'),
(2, 1, '2022-06-15', 'Repair', 'Printer jam and paper feed issue', 'Pending', NULL),
(3, 2, '2022-07-01', 'Firmware Update', 'Update printer firmware to version 1.3.0', 'Resolved', '2022-07-02'),
(4, 2, '2022-07-10', 'Toner Replacement', 'Replace toner cartridges', 'Resolved', '2022-07-11'),
(5, 3, '2022-07-20', 'Paper Jam', 'Clear paper jam in tray 2', 'Resolved', '2022-07-21'),
(6, 3, '2022-08-01', 'Routine Check', 'Routine maintenance check and toner replacement', 'Pending', NULL),
(7, 4, '2022-08-10', 'Repair', 'Fix issue with printer not connecting to network', 'Resolved', '2022-08-11'),
(8, 4, '2022-08-20', 'Firmware Update', 'Update printer firmware to version 1.4.0', 'Resolved', '2022-08-21'),
(9, 5, '2022-09-01', 'Toner Replacement', 'Replace toner cartridges', 'Pending', NULL),
(10, 5, '2022-09-10', 'Paper Jam', 'Clear paper jam in tray 1', 'Resolved', '2022-09-11'),
(11, 6, '2022-09-20', 'Routine Check', 'Routine maintenance check and toner replacement', 'Pending', NULL),
(12, 6, '2022-10-01', 'Repair', 'Fix issue with printer not printing color', 'Resolved', '2022-10-02'),
(13, 1, '2022-10-10', 'Firmware Update', 'Update printer firmware to version 1.5.0', 'Resolved', '2022-10-11'),
(14, 1, '2022-10-20', 'Toner Replacement', 'Replace toner cartridges', 'Pending', NULL),
(15, 2, '2022-11-01', 'Paper Jam', 'Clear paper jam in tray 3', 'Resolved', '2022-11-02');

INSERT INTO notifications (notification_date, department_id, maintenance_id, message, is_read) VALUES
('2022-06-01 10:00:00', 1, 1,'Routine maintenance scheduled for Printer SN12345.', FALSE),
('2022-06-15 14:00:00', 2, 2, 'Repair request submitted for Printer SN67890.', FALSE),
('2022-07-01 09:00:00', 3, 3, 'Firmware update available for Printer SN54321.', TRUE),
('2022-07-10 11:00:00', 4, 4, 'Toner replacement scheduled for Printer SN23456.', FALSE),
('2022-07-20 13:00:00', 5, 5, 'Paper jam reported for Printer SN78901.', TRUE),
('2022-08-01 10:00:00', 6, 6, 'Routine maintenance scheduled for Printer SN65432.', FALSE),
('2022-11-01 13:00:00', 7, 7, 'Paper jam reported for Printer SN67854.', TRUE);

INSERT INTO billing (department_id, billing_cycle_start, billing_cycle_end, total_charges, total_paper, total_color_pages, total_bw_pages, color_pages_charge, bw_pages_charge) VALUES
(1, '2022-05-01', '2022-05-31', 500.00, 500, 300, 200, 0.10, 0.05),
(2, '2022-05-01', '2022-05-31', 300.00, 300, 180, 120, 0.10, 0.05),
(3, '2022-05-01', '2022-05-31', 700.00, 700, 420, 280, 0.10, 0.05),
(4, '2022-06-01', '2022-06-30', 450.00, 450, 270, 180, 0.10, 0.05),
(5, '2022-06-01', '2022-06-30', 550.00, 550, 330, 220, 0.10, 0.05),
(6, '2022-06-01', '2022-06-30', 250.00, 250, 150, 100, 0.10, 0.05),
(7, '2022-07-01', '2022-07-31', 600.00, 600, 360, 240, 0.10, 0.05),
(8, '2022-07-01', '2022-07-31', 480.00, 480, 290, 190, 0.10, 0.05),
(9, '2022-07-01', '2022-07-31', 520.00, 520, 310, 210, 0.10, 0.05),
(10, '2022-08-01', '2022-08-31', 680.00, 680, 410, 270, 0.10, 0.05),
(11, '2022-08-01', '2022-08-31', 360.00, 360, 220, 140, 0.10, 0.05),
(12, '2022-08-01', '2022-08-31', 500.00, 500, 300, 200, 0.10, 0.05),
(13, '2022-09-01', '2022-09-30', 420.00, 420, 250, 170, 0.10, 0.05),
(14, '2022-09-01', '2022-09-30', 630.00, 630, 370, 260, 0.10, 0.05),
(15, '2022-09-01', '2022-09-30', 470.00, 470, 280, 190, 0.10, 0.05),
(1, '2023-01-01', '2023-01-31', 100, 60, 40, 1000, 400, 600),
(1, '2023-02-01', '2023-02-28', 110, 70, 40, 1100, 500, 600),
(1, '2023-03-01', '2023-03-31', 90, 50, 40, 900, 300, 600),
(1, '2023-04-01', '2023-04-30', 120, 80, 40, 1200, 600, 600),
(1, '2023-05-01', '2023-05-31', 105, 65, 40, 1050, 450, 600),
(1, '2023-06-01', '2023-06-30', 95, 55, 40, 950, 350, 600),
(1, '2023-07-01', '2023-07-31', 130, 90, 40, 1300, 700, 600),
(1, '2023-08-01', '2023-08-31', 125, 85, 40, 1250, 650, 600),
(1, '2023-09-01', '2023-09-30', 100, 60, 40, 1000, 400, 600),
(1, '2023-10-01', '2023-10-31', 110, 70, 40, 1100, 500, 600),
(1, '2023-11-01', '2023-11-30', 115, 75, 40, 1150, 550, 600),
(1, '2023-12-01', '2023-12-31', 90, 50, 40, 900, 300, 600),
(1, '2024-01-01', '2024-01-31', 120, 80, 40, 1200, 600, 600),
(1, '2024-02-01', '2024-02-29', 105, 65, 40, 1050, 450, 600),
(1, '2024-03-01', '2024-03-31', 100, 60, 40, 1000, 400, 600),
(1, '2024-04-01', '2024-04-30', 110, 70, 40, 1100, 500, 600),
(1, '2024-05-01', '2024-05-31', 95, 55, 40, 950, 350, 600),
(1, '2024-06-01', '2024-06-30', 130, 90, 40, 1300, 700, 600),
(1, '2024-07-01', '2024-07-31', 130, 90, 40, 1300, 700, 600);

INSERT INTO bill_payments (billing_id, payment_date, amount_paid, payment_status) VALUES
(1, '2022-06-10', 500.00, 'Paid'),
(2, '2022-06-12', 300.00, 'Paid'),
(3, '2022-06-15', 700.00, 'Pending'),
(4, '2022-07-10', 450.00, 'Paid'),
(5, '2022-07-12', 550.00, 'Paid'),
(6, '2022-07-15', 250.00, 'Late'),
(7, '2022-08-10', 600.00, 'Paid'),
(8, '2022-08-12', 480.00, 'Paid'),
(9, '2022-08-15', 520.00, 'Pending'),
(10, '2022-09-10', 680.00, 'Paid'),
(11, '2022-09-12', 360.00, 'Paid'),
(12, '2022-09-15', 500.00, 'Late'),
(13, '2022-10-10', 420.00, 'Paid'),
(14, '2022-10-12', 630.00, 'Paid'),
(15, '2022-10-15', 470.00, 'Pending');

INSERT INTO jobs (printer_id, department_id, date, title, pages, color_pages, black_and_white_pages)
VALUES
(1, 1, '2023-02-05', 'Report Printing', 30, 10, 20),
(1, 1, '2023-04-15', 'Brochure Printing', 50, 30, 20),
(1, 1, '2023-06-10', 'Manual Printing', 75, 25, 50),
(1, 1, '2023-08-05', 'Flyer Printing', 40, 20, 20),
(1, 1, '2023-10-25', 'Newsletter Printing', 20, 10, 10),
(1, 1, '2024-01-10', 'Thesis Printing', 150, 60, 90),
(1, 1, '2024-03-15', 'Magazine Printing', 80, 50, 30),
(1, 1, '2024-05-20', 'Calendar Printing', 15, 5, 10),
(1, 1, '2024-07-10', 'Resume Printing', 25, 0, 25),
(1, 1, '2024-09-25', 'Syllabus Printing', 35, 15, 20),
(2, 1, '2023-02-20', 'Invitation Printing', 40, 20, 20),
(2, 1, '2023-04-05', 'Document Printing', 60, 30, 30),
(2, 1, '2023-06-30', 'Program Printing', 50, 25, 25),
(2, 1, '2023-09-15', 'Journal Printing', 35, 15, 20),
(2, 1, '2023-11-05', 'Presentation Printing', 20, 10, 10),
(2, 1, '2024-01-25', 'Booklet Printing', 100, 50, 50),
(2, 1, '2024-03-10', 'Certificate Printing', 10, 10, 0),
(2, 1, '2024-06-05', 'Research Paper Printing', 30, 10, 20),
(2, 1, '2024-08-20', 'Application Form Printing', 25, 0, 25),
(2, 1, '2024-11-15', 'Thesis Printing', 150, 60, 90),
(3, 2, '2023-03-10', 'Flyer Printing', 30, 20, 10),
(3, 2, '2023-05-25', 'Brochure Printing', 60, 40, 20),
(3, 2, '2023-07-05', 'Newsletter Printing', 25, 10, 15),
(3, 2, '2023-09-20', 'Proposal Printing', 50, 25, 25),
(3, 2, '2023-12-15', 'Program Printing', 30, 15, 15),
(3, 2, '2024-02-20', 'Magazine Printing', 80, 50, 30),
(3, 2, '2024-04-05', 'Research Paper Printing', 40, 20, 20),
(3, 2, '2024-06-10', 'Journal Printing', 35, 15, 20),
(3, 2, '2024-09-05', 'Thesis Printing', 150, 60, 90),
(3, 2, '2024-12-20', 'Manual Printing', 75, 25, 50),
(4, 2, '2023-03-15', 'Document Printing', 40, 20, 20),
(4, 2, '2023-06-01', 'Booklet Printing', 100, 50, 50),
(4, 2, '2023-08-10', 'Report Printing', 30, 10, 20),
(4, 2, '2023-11-01', 'Magazine Printing', 80, 50, 30),
(4, 2, '2023-12-20', 'Flyer Printing', 20, 10, 10),
(4, 2, '2024-02-15', 'Newsletter Printing', 25, 10, 15),
(4, 2, '2024-05-05', 'Presentation Printing', 20, 10, 10),
(4, 2, '2024-07-15', 'Syllabus Printing', 35, 15, 20),
(4, 2, '2024-09-01', 'Program Printing', 30, 15, 15),
(4, 2, '2024-11-20', 'Thesis Printing', 150, 60, 90),
(5, 3, '2023-03-25', 'Calendar Printing', 15, 5, 10),
(5, 3, '2023-06-15', 'Resume Printing', 25, 0, 25),
(5, 3, '2023-09-05', 'Proposal Printing', 50, 20, 30),
(5, 3, '2023-11-25', 'Research Paper Printing', 40, 20, 20),
(5, 3, '2023-12-15', 'Booklet Printing', 100, 50, 50),
(5, 3, '2024-02-05', 'Journal Printing', 35, 15, 20),
(5, 3, '2024-04-20', 'Flyer Printing', 30, 20, 10),
(5, 3, '2024-06-15', 'Manual Printing', 75, 25, 50),
(5, 3, '2024-09-10', 'Document Printing', 40, 20, 20),
(5, 3, '2024-11-30', 'Program Printing', 30, 15, 15),
(6, 3, '2023-04-05', 'Manual Printing', 75, 25, 50),
(6, 3, '2023-06-20', 'Syllabus Printing', 35, 15, 20),
(6, 3, '2023-08-05', 'Program Printing', 30, 15, 15),
(6, 3, '2023-10-10', 'Flyer Printing', 40, 20, 20),
(6, 3, '2023-12-05', 'Newsletter Printing', 25, 10, 15),
(6, 3, '2024-02-20', 'Proposal Printing', 50, 20, 30),
(6, 3, '2024-04-10', 'Thesis Printing', 150, 60, 90),
(6, 3, '2024-07-05', 'Document Printing', 40, 20, 20),
(6, 3, '2024-09-20', 'Booklet Printing', 100, 50, 50),
(6, 3, '2024-12-01', 'Magazine Printing', 80, 50, 30),
(7, 4, '2023-05-01', 'Invitation Printing', 45, 45, 0),
(7, 4, '2023-07-20', 'Presentation Printing', 20, 10, 10),
(7, 4, '2023-09-30', 'Certificate Printing', 10, 10, 0),
(7, 4, '2023-11-15', 'Research Paper Printing', 40, 20, 20),
(7, 4, '2024-01-10', 'Manual Printing', 75, 25, 50),
(7, 4, '2024-03-25', 'Calendar Printing', 15, 5, 10),
(7, 4, '2024-06-01', 'Resume Printing', 25, 0, 25),
(7, 4, '2024-08-10', 'Program Printing', 30, 15, 15),
(7, 4, '2024-10-25', 'Thesis Printing', 150, 60, 90),
(7, 4, '2024-12-15', 'Journal Printing', 35, 15, 20),
(8, 4, '2023-05-10', 'Syllabus Printing', 35, 15, 20),
(8, 4, '2023-07-05', 'Journal Printing', 35, 15, 20),
(8, 4, '2023-09-20', 'Manual Printing', 75, 25, 50),
(8, 4, '2023-12-01', 'Document Printing', 40, 20, 20),
(8, 4, '2024-02-15', 'Presentation Printing', 20, 10, 10),
(8, 4, '2024-04-20', 'Flyer Printing', 30, 20, 10),
(8, 4, '2024-06-10', 'Thesis Printing', 150, 60, 90),
(8, 4, '2024-08-05', 'Program Printing', 30, 15, 15),
(8, 4, '2024-10-30', 'Newsletter Printing', 25, 10, 15),
(8, 4, '2024-12-25', 'Booklet Printing', 100, 50, 50),
(9, 5, '2023-06-01', 'Proposal Printing', 50, 20, 30),
(9, 5, '2023-08-10', 'Thesis Printing', 150, 60, 90),
(9, 5, '2023-10-05', 'Flyer Printing', 30, 20, 10),
(9, 5, '2023-12-20', 'Document Printing', 40, 20, 20),
(9, 5, '2024-02-05', 'Manual Printing', 75, 25, 50),
(9, 5, '2024-05-10', 'Research Paper Printing', 40, 20, 20),
(9, 5, '2024-07-25', 'Journal Printing', 35, 15, 20),
(9, 5, '2024-09-15', 'Resume Printing', 25, 0, 25),
(9, 5, '2024-11-05', 'Invitation Printing', 45, 45, 0),
(9, 5, '2024-12-30', 'Program Printing', 30, 15, 15),
(10, 5, '2023-06-15', 'Syllabus Printing', 35, 15, 20),
(10, 5, '2023-08-25', 'Flyer Printing', 30, 20, 10),
(10, 5, '2023-10-20', 'Program Printing', 30, 15, 15),
(10, 5, '2023-12-10', 'Presentation Printing', 20, 10, 10),
(10, 5, '2024-02-25', 'Document Printing', 40, 20, 20),
(10, 5, '2024-05-15', 'Journal Printing', 35, 15, 20),
(10, 5, '2024-07-05', 'Thesis Printing', 150, 60, 90),
(10, 5, '2024-09-20', 'Booklet Printing', 100, 50, 50),
(10, 5, '2024-11-10', 'Magazine Printing', 80, 50, 30),
(10, 5, '2024-12-30', 'Manual Printing', 75, 25, 50),
(11, 6, '2023-07-10', 'Resume Printing', 25, 0, 25),
(11, 6, '2023-09-05', 'Research Paper Printing', 40, 20, 20),
(11, 6, '2023-11-25', 'Program Printing', 30, 15, 15),
(11, 6, '2024-01-05', 'Invitation Printing', 45, 45, 0),
(11, 6, '2024-03-15', 'Thesis Printing', 150, 60, 90),
(11, 6, '2024-05-05', 'Manual Printing', 75, 25, 50),
(11, 6, '2024-08-01', 'Flyer Printing', 30, 20, 10),
(11, 6, '2024-09-25', 'Document Printing', 40, 20, 20),
(11, 6, '2024-11-15', 'Journal Printing', 35, 15, 20),
(11, 6, '2024-12-05', 'Booklet Printing', 100, 50, 50),
(12, 6, '2023-07-25', 'Proposal Printing', 50, 20, 30),
(12, 6, '2023-09-15', 'Syllabus Printing', 35, 15, 20),
(12, 6, '2023-11-10', 'Research Paper Printing', 40, 20, 20),
(12, 6, '2024-01-20', 'Thesis Printing', 150, 60, 90),
(12, 6, '2024-03-05', 'Flyer Printing', 30, 20, 10),
(12, 6, '2024-06-10', 'Manual Printing', 75, 25, 50),
(12, 6, '2024-08-20', 'Journal Printing', 35, 15, 20),
(12, 6, '2024-10-05', 'Program Printing', 30, 15, 15),
(12, 6, '2024-11-30', 'Magazine Printing', 80, 50, 30),
(12, 6, '2024-12-20', 'Document Printing', 40, 20, 20),
(13, 1, '2023-02-15', 'Brochure Printing', 50, 30, 20),
(13, 1, '2023-04-20', 'Flyer Printing', 30, 20, 10),
(13, 1, '2023-06-25', 'Document Printing', 40, 20, 20),
(13, 1, '2023-09-10', 'Journal Printing', 35, 15, 20),
(13, 1, '2023-11-30', 'Program Printing', 30, 15, 15),
(13, 1, '2024-01-15', 'Syllabus Printing', 35, 15, 20),
(13, 1, '2024-03-10', 'Thesis Printing', 150, 60, 90),
(13, 1, '2024-06-20', 'Resume Printing', 25, 0, 25),
(13, 1, '2024-08-05', 'Research Paper Printing', 40, 20, 20),
(13, 1, '2024-10-15', 'Booklet Printing', 100, 50, 50),
(14, 1, '2023-02-25', 'Manual Printing', 75, 25, 50),
(14, 1, '2023-04-15', 'Resume Printing', 25, 0, 25),
(14, 1, '2023-07-05', 'Journal Printing', 35, 15, 20),
(14, 1, '2023-09-25', 'Syllabus Printing', 35, 15, 20),
(14, 1, '2023-11-20', 'Program Printing', 30, 15, 15),
(14, 1, '2024-02-01', 'Flyer Printing', 30, 20, 10),
(14, 1, '2024-04-05', 'Thesis Printing', 150, 60, 90),
(14, 1, '2024-06-15', 'Research Paper Printing', 40, 20, 20),
(14, 1, '2024-08-25', 'Booklet Printing', 100, 50, 50),
(14, 1, '2024-10-30', 'Document Printing', 40, 20, 20),
(15, 2, '2023-03-20', 'Resume Printing', 25, 0, 25),
(15, 2, '2023-05-10', 'Brochure Printing', 50, 30, 20),
(15, 2, '2023-07-05', 'Flyer Printing', 30, 20, 10),
(15, 2, '2023-09-20', 'Document Printing', 40, 20, 20),
(15, 2, '2023-11-15', 'Thesis Printing', 150, 60, 90),
(15, 2, '2024-01-25', 'Manual Printing', 75, 25, 50),
(15, 2, '2024-03-05', 'Journal Printing', 35, 15, 20),
(15, 2, '2024-05-15', 'Program Printing', 30, 15, 15),
(15, 2, '2024-07-10', 'Syllabus Printing', 35, 15, 20),
(15, 2, '2024-09-25', 'Booklet Printing', 100, 50, 50),
(16, 2, '2023-04-10', 'Research Paper Printing', 40, 20, 20),
(16, 2, '2023-06-15', 'Journal Printing', 35, 15, 20),
(16, 2, '2023-08-05', 'Program Printing', 30, 15, 15),
(16, 2, '2023-11-01', 'Document Printing', 40, 20, 20),
(16, 2, '2024-01-20', 'Flyer Printing', 30, 20, 10),
(16, 2, '2024-03-15', 'Manual Printing', 75, 25, 50),
(16, 2, '2024-05-25', 'Thesis Printing', 150, 60, 90),
(16, 2, '2024-08-01', 'Brochure Printing', 50, 30, 20),
(16, 2, '2024-10-20', 'Resume Printing', 25, 0, 25),
(16, 2, '2024-12-10', 'Syllabus Printing', 35, 15, 20),
(17, 3, '2023-05-15', 'Flyer Printing', 30, 20, 10),
(17, 3, '2023-07-25', 'Document Printing', 40, 20, 20),
(17, 3, '2023-09-15', 'Manual Printing', 75, 25, 50),
(17, 3, '2023-11-10', 'Research Paper Printing', 40, 20, 20),
(17, 3, '2024-02-15', 'Thesis Printing', 150, 60, 90),
(17, 3, '2024-04-25', 'Program Printing', 30, 15, 15),
(17, 3, '2024-06-05', 'Resume Printing', 25, 0, 25),
(17, 3, '2024-08-20', 'Journal Printing', 35, 15, 20),
(17, 3, '2024-10-05', 'Proposal Printing', 50, 20, 30),
(17, 3, '2024-12-25', 'Brochure Printing', 50, 30, 20),
(18, 3, '2023-01-15', 'Report Printing', 25, 10, 15),
(18, 3, '2023-02-20', 'Flyer Printing', 50, 50, 0),
(18, 3, '2023-03-12', 'Booklet Printing', 100, 40, 60),
(18, 3, '2023-05-18', 'Presentation Printing', 20, 20, 0),
(18, 3, '2023-08-22', 'Document Printing', 35, 5, 30),
(18, 3, '2023-10-02', 'Resume Printing', 10, 0, 10),
(18, 3, '2023-11-11', 'Poster Printing', 5, 5, 0),
(18, 3, '2024-02-05', 'Brochure Printing', 60, 30, 30),
(18, 3, '2024-04-15', 'Thesis Printing', 150, 60, 90),
(18, 3, '2024-06-28', 'Newsletter Printing', 40, 20, 20),
(19, 1, '2023-01-10', 'Syllabus Printing', 15, 5, 10),
(19, 1, '2023-04-05', 'Research Paper Printing', 30, 10, 20),
(19, 1, '2023-06-18', 'Invitation Printing', 45, 45, 0),
(19, 1, '2023-08-25', 'Certificate Printing', 10, 10, 0),
(19, 1, '2023-11-20', 'Manual Printing', 60, 20, 40),
(19, 1, '2024-01-05', 'Journal Printing', 35, 15, 20),
(19, 1, '2024-03-17', 'Application Form Printing', 25, 0, 25),
(19, 1, '2024-05-22', 'Magazine Printing', 80, 50, 30),
(19, 1, '2024-07-15', 'Newsletter Printing', 40, 20, 20),
(19, 1, '2024-09-29', 'Calendar Printing', 15, 15, 0),
(20, 2, '2023-02-12', 'Lecture Notes Printing', 25, 10, 15),
(20, 2, '2023-04-09', 'Handout Printing', 40, 10, 30),
(20, 2, '2023-06-15', 'Proposal Printing', 20, 5, 15),
(20, 2, '2023-09-08', 'Flyer Printing', 50, 50, 0),
(20, 2, '2023-11-23', 'Poster Printing', 5, 5, 0),
(20, 2, '2024-02-19', 'Agenda Printing', 15, 5, 10),
(20, 2, '2024-04-03', 'Program Printing', 30, 10, 20),
(20, 2, '2024-06-21', 'Pamphlet Printing', 60, 30, 30),
(20, 2, '2024-08-27', 'Summary Printing', 35, 5, 30),
(20, 2, '2024-11-11', 'Report Printing', 25, 10, 15),
(21, 3, '2023-01-25', 'Article Printing', 20, 10, 10),
(21, 3, '2023-03-15', 'Resume Printing', 10, 0, 10),
(21, 3, '2023-05-30', 'Poster Printing', 5, 5, 0),
(21, 3, '2023-07-12', 'Brochure Printing', 60, 30, 30),
(21, 3, '2023-09-19', 'Thesis Printing', 150, 60, 90),
(21, 3, '2023-12-03', 'Flyer Printing', 50, 50, 0),
(21, 3, '2024-01-18', 'Manual Printing', 60, 20, 40),
(21, 3, '2024-03-24', 'Newsletter Printing', 40, 20, 20),
(21, 3, '2024-05-29', 'Magazine Printing', 80, 50, 30),
(21, 3, '2024-07-07', 'Certificate Printing', 10, 10, 0),
(22, 4, '2023-02-02', 'Lecture Notes Printing', 25, 10, 15),
(22, 4, '2023-03-28', 'Proposal Printing', 20, 5, 15),
(22, 4, '2023-05-19', 'Flyer Printing', 50, 50, 0),
(22, 4, '2023-07-04', 'Booklet Printing', 100, 40, 60),
(22, 4, '2023-09-14', 'Document Printing', 35, 5, 30),
(22, 4, '2023-11-22', 'Brochure Printing', 60, 30, 30),
(22, 4, '2024-01-03', 'Thesis Printing', 150, 60, 90),
(22, 4, '2024-03-14', 'Report Printing', 25, 10, 15),
(22, 4, '2024-06-09', 'Pamphlet Printing', 60, 30, 30),
(22, 4, '2024-08-30', 'Manual Printing', 60, 20, 40),
(23, 5, '2023-02-11', 'Flyer Printing', 30, 30, 0),
(23, 5, '2023-04-22', 'Report Printing', 40, 20, 20),
(23, 5, '2023-06-01', 'Resume Printing', 15, 0, 15),
(23, 5, '2023-08-13', 'Brochure Printing', 50, 30, 20),
(23, 5, '2023-10-27', 'Manual Printing', 75, 25, 50),
(23, 5, '2023-12-07', 'Newsletter Printing', 40, 20, 20),
(23, 5, '2024-02-19', 'Program Printing', 30, 15, 15),
(23, 5, '2024-04-04', 'Booklet Printing', 60, 30, 30),
(23, 5, '2024-06-18', 'Thesis Printing', 100, 60, 40),
(23, 5, '2024-08-22', 'Document Printing', 35, 5, 30),
(24, 6, '2023-02-25', 'Presentation Printing', 25, 15, 10),
(24, 6, '2023-05-07', 'Booklet Printing', 80, 40, 40),
(24, 6, '2023-07-19', 'Manual Printing', 60, 20, 40),
(24, 6, '2023-09-23', 'Flyer Printing', 50, 50, 0),
(24, 6, '2023-11-02', 'Newsletter Printing', 30, 15, 15),
(24, 6, '2024-01-14', 'Report Printing', 45, 20, 25),
(24, 6, '2024-03-09', 'Document Printing', 20, 10, 10),
(24, 6, '2024-05-15', 'Resume Printing', 15, 0, 15),
(24, 6, '2024-07-20', 'Invitation Printing', 35, 20, 15),
(24, 6, '2024-09-28', 'Calendar Printing', 10, 5, 5),
(25, 1, '2023-03-15', 'Thesis Printing', 150, 60, 90),
(25, 1, '2023-06-02', 'Manual Printing', 50, 20, 30),
(25, 1, '2023-08-14', 'Report Printing', 35, 10, 25),
(25, 1, '2023-10-05', 'Magazine Printing', 80, 50, 30),
(25, 1, '2023-12-20', 'Resume Printing', 10, 0, 10),
(25, 1, '2024-02-02', 'Brochure Printing', 60, 30, 30),
(25, 1, '2024-04-08', 'Flyer Printing', 50, 50, 0),
(25, 1, '2024-06-19', 'Program Printing', 30, 15, 15),
(25, 1, '2024-08-31', 'Document Printing', 40, 20, 20),
(25, 1, '2024-11-15', 'Newsletter Printing', 25, 10, 15),
(26, 2, '2023-03-22', 'Invitation Printing', 45, 45, 0),
(26, 2, '2023-06-03', 'Booklet Printing', 60, 30, 30),
(26, 2, '2023-08-16', 'Presentation Printing', 20, 20, 0),
(26, 2, '2023-10-28', 'Certificate Printing', 10, 10, 0),
(26, 2, '2023-12-30', 'Journal Printing', 35, 15, 20),
(26, 2, '2024-02-10', 'Application Form Printing', 25, 0, 25),
(26, 2, '2024-04-21', 'Pamphlet Printing', 60, 30, 30),
(26, 2, '2024-06-30', 'Newsletter Printing', 40, 20, 20),
(26, 2, '2024-09-08', 'Calendar Printing', 15, 15, 0),
(26, 2, '2024-11-22', 'Program Printing', 30, 15, 15),
(27, 3, '2023-03-28', 'Article Printing', 20, 10, 10),
(27, 3, '2023-06-12', 'Report Printing', 35, 10, 25),
(27, 3, '2023-08-20', 'Invitation Printing', 45, 45, 0),
(27, 3, '2023-11-03', 'Resume Printing', 15, 0, 15),
(27, 3, '2023-12-27', 'Manual Printing', 75, 25, 50),
(27, 3, '2024-01-15', 'Magazine Printing', 80, 50, 30),
(27, 3, '2024-03-22', 'Booklet Printing', 100, 50, 50),
(27, 3, '2024-05-28', 'Document Printing', 40, 20, 20),
(27, 3, '2024-07-14', 'Newsletter Printing', 25, 10, 15),
(27, 3, '2024-09-23', 'Brochure Printing', 60, 30, 30),
(28, 4, '2023-03-30', 'Syllabus Printing', 15, 5, 10),
(28, 4, '2023-06-18', 'Research Paper Printing', 30, 10, 20),
(28, 4, '2023-08-29', 'Manual Printing', 50, 20, 30),
(28, 4, '2023-11-13', 'Program Printing', 30, 15, 15),
(28, 4, '2023-12-31', 'Calendar Printing', 10, 5, 5),
(28, 4, '2024-01-20', 'Lecture Notes Printing', 25, 10, 15),
(28, 4, '2024-03-31', 'Document Printing', 35, 5, 30),
(28, 4, '2024-06-04', 'Proposal Printing', 20, 5, 15),
(28, 4, '2024-08-26', 'Booklet Printing', 100, 50, 50),
(28, 4, '2024-11-15', 'Thesis Printing', 150, 60, 90),
(29, 11, '2023-01-15', 'Report 1', 50, 20, 30),
(29, 11, '2023-02-20', 'Report 2', 75, 35, 40),
(29, 11, '2023-03-25', 'Manual 1', 120, 60, 60),
(29, 11, '2023-04-10', 'Flyer 1', 30, 25, 5),
(29, 11, '2023-05-15', 'Brochure 1', 40, 30, 10),
(29, 11, '2023-06-20', 'Newsletter 1', 60, 25, 35),
(29, 11, '2023-07-25', 'Report 3', 90, 45, 45),
(29, 11, '2023-08-30', 'Manual 2', 150, 80, 70),
(29, 11, '2023-09-05', 'Flyer 2', 35, 30, 5),
(29, 11, '2023-10-10', 'Brochure 2', 55, 45, 10),
(29, 11, '2024-01-15', 'Report 4', 65, 30, 35),
(29, 11, '2024-02-20', 'Report 5', 80, 50, 30),
(29, 11, '2024-03-25', 'Manual 3', 110, 55, 55),
(29, 11, '2024-04-10', 'Flyer 3', 25, 20, 5),
(29, 11, '2024-05-15', 'Brochure 3', 45, 35, 10),
(29, 11, '2024-06-20', 'Newsletter 2', 70, 40, 30),
(29, 11, '2024-07-25', 'Report 6', 95, 50, 45),
(29, 11, '2024-08-30', 'Manual 4', 140, 70, 70),
(29, 11, '2024-09-05', 'Flyer 4', 40, 35, 5),
(29, 11, '2024-10-10', 'Brochure 4', 60, 50, 10),
(30, 12, '2023-01-20', 'Report 1', 55, 25, 30),
(30, 12, '2023-02-25', 'Report 2', 70, 40, 30),
(30, 12, '2023-03-30', 'Manual 1', 130, 70, 60),
(30, 12, '2023-04-15', 'Flyer 1', 35, 28, 7),
(30, 12, '2023-05-20', 'Brochure 1', 50, 40, 10),
(30, 12, '2023-06-25', 'Newsletter 1', 65, 30, 35),
(30, 12, '2023-07-30', 'Report 3', 85, 45, 40),
(30, 12, '2023-08-05', 'Manual 2', 160, 90, 70),
(30, 12, '2023-09-10', 'Flyer 2', 40, 34, 6),
(30, 12, '2023-10-15', 'Brochure 2', 60, 50, 10),
(30, 12, '2024-01-20', 'Report 4', 70, 35, 35),
(30, 12, '2024-02-25', 'Report 5', 90, 55, 35),
(30, 12, '2024-03-30', 'Manual 3', 120, 60, 60),
(30, 12, '2024-04-15', 'Flyer 3', 30, 25, 5),
(30, 12, '2024-05-20', 'Brochure 3', 55, 45, 10),
(30, 12, '2024-06-25', 'Newsletter 2', 75, 40, 35),
(30, 12, '2024-07-30', 'Report 6', 100, 60, 40),
(30, 12, '2024-08-05', 'Manual 4', 145, 75, 70),
(30, 12, '2024-09-10', 'Flyer 4', 45, 40, 5),
(30, 12, '2024-10-15', 'Brochure 4', 65, 55, 10),
(31, 13, '2023-01-25', 'Report 1', 60, 30, 30),
(31, 13, '2023-02-28', 'Report 2', 80, 50, 30),
(31, 13, '2023-03-05', 'Manual 1', 140, 80, 60),
(31, 13, '2023-04-10', 'Flyer 1', 40, 35, 5),
(31, 13, '2023-05-15', 'Brochure 1', 45, 35, 10),
(31, 13, '2023-06-20', 'Newsletter 1', 80, 40, 40),
(31, 13, '2023-07-25', 'Report 3', 100, 50, 50),
(31, 13, '2023-08-30', 'Manual 2', 170, 90, 80),
(31, 13, '2023-09-05', 'Flyer 2', 50, 45, 5),
(31, 13, '2023-10-10', 'Brochure 2', 70, 60, 10),
(31, 13, '2024-01-25', 'Report 4', 75, 40, 35),
(31, 13, '2024-02-28', 'Report 5', 85, 55, 30),
(31, 13, '2024-03-05', 'Manual 3', 130, 70, 60),
(31, 13, '2024-04-10', 'Flyer 3', 35, 30, 5),
(31, 13, '2024-05-15', 'Brochure 3', 50, 40, 10),
(31, 13, '2024-06-20', 'Newsletter 2', 85, 45, 40),
(31, 13, '2024-07-25', 'Report 6', 110, 60, 50),
(31, 13, '2024-08-30', 'Manual 4', 160, 80, 80),
(31, 13, '2024-09-05', 'Flyer 4', 55, 50, 5),
(31, 13, '2024-10-10', 'Brochure 4', 75, 65, 10),
(32, 14, '2023-01-30', 'Report 1', 65, 35, 30),
(32, 14, '2023-02-28', 'Report 2', 95, 55, 40),
(32, 14, '2023-03-05', 'Manual 1', 150, 85, 65),
(32, 14, '2023-04-10', 'Flyer 1', 45, 40, 5),
(32, 14, '2023-05-15', 'Brochure 1', 60, 50, 10);