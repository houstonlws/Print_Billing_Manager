USE print_billing_db;

SELECT id, category, name FROM departments;
SELECT * FROM printers;
SELECT * FROM users;
SELECT * FROM auth;
SELECT * FROM notifications;

UPDATE users SET department_id=2  WHERE id=1;
DELETE FROM auth WHERE id=2;
DELETE FROM users WHERE email='houstonhvrd@gmail.com';

UPDATE printers
SET
serial_number = ?,
model =?,
brand = ?,
location = ?,
installation_date = ?,
warranty_expiry_date = ?,
ip_address = ?,
mac_address = ?,
firmware_version = ?
WHERE id = ?;

SELECT 
    id,
    serial_number,
    model,
    brand,
    location,
    DATE_FORMAT(installation_date, '%Y-%m-%d') as installation_date,
    DATE_FORMAT(warranty_expiry_date, '%Y-%m-%d') as warranty_expiry_date,
    ip_address,
    mac_address,
    firmware_version,
    department_id
FROM
    printers;
    
DELETE FROM printers WHERE id = ?;

INSERT INTO printers
(serial_number,
model,
brand,
location,
installation_date,
warranty_expiry_date,
ip_address,
mac_address,
firmware_version, 
department_id)
VALUES
(?,?,?,?,?,?,?,?,?,?);

SELECT 
    id,
    serial_number,
    model,
    brand,
    location,
    DATE_FORMAT(installation_date, '%Y-%m-%d'),
    DATE_FORMAT(warranty_expiry_date, '%Y-%m-%d'),
    ip_address,
    mac_address,
    firmware_version,
    department_id
FROM
    printers;

SELECT id
    printer_id,
    DATE_FORMAT(request_date, '%Y-%m-%d') as request_date,
    maintenance_type,
    description,
    status,
    DATE_FORMAT(resolved_date, '%Y-%m-%d') as resolved_date
FROM maintenance_requests;

INSERT INTO maintenance_requests
(printer_id,
request_date,
maintenance_type,
description,
status,
resolved_date)
VALUES
(?,?,?,?,?,?);

SELECT id,
    department_id,
    DATE_FORMAT(billing_cycle_start, '%Y-%m-%d') as billing_cycle_start,
    DATE_FORMAT(billing_cycle_end, '%Y-%m-%d') as billing_cycle_end, 
    total_charges,
    total_paper,
    total_color_pages,
    total_bw_pages,
    color_pages_charge,
    bw_pages_charge
FROM billing;

SELECT id,
    user_id,
    DATE_FORMAT(notification_date, '%Y-%m-%d') as notification_date,
    message,
    is_read
FROM notifications;




    