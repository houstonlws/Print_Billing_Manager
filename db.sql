USE print_billing_db;

CREATE TABLE auth (
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE, 
	password VARCHAR(255) NOT NULL
);

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    user_id INT 
);

CREATE TABLE types (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE users (
    id INT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    department_id INT,
    phone VARCHAR(255),
    type VARCHAR(255),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (id) REFERENCES auth(id),
    FOREIGN KEY (type) REFERENCES types(name)
);

CREATE TABLE printers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serial_number VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    installation_date DATE NOT NULL,
    warranty_expiry_date DATE NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    mac_address VARCHAR(17) NOT NULL,
    firmware_version VARCHAR(255) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    printer_id INT UNIQUE,
    total_pages_printed INT NOT NULL,
    monthly_print_volume INT NOT NULL,
    total_print_jobs INT NOT NULL,
    monthly_print_jobs INT NOT NULL,
    toner_levels VARCHAR(255) NOT NULL,
    toner_usage_monthly VARCHAR(255) NOT NULL,
    paper_levels VARCHAR(255) NOT NULL,
    paper_usage_monthly INT NOT NULL,
    total_color_pages_printed INT NOT NULL,
    total_color_pages_last_billing INT NOT NULL,
    total_bw_pages_printed INT NOT NULL,
    total_bw_pages_last_billing INT NOT NULL,
    FOREIGN KEY (printer_id) REFERENCES printers(id)
);

CREATE TABLE maintenance_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    printer_id INT NOT NULL,
    request_date DATE NOT NULL,
    maintenance_type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(255) NOT NULL,
    resolved_date DATE,
    FOREIGN KEY (printer_id) REFERENCES printers(id)
);

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    notification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE billing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    billing_cycle_start DATE NOT NULL,
    billing_cycle_end DATE NOT NULL,
    total_charges DECIMAL(10, 2) NOT NULL,
    total_paper INT NOT NULL,
    total_color_pages INT NOT NULL,
    total_bw_pages INT NOT NULL,
    color_pages_charge DECIMAL(10, 2) NOT NULL,
    bw_pages_charge DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE bill_payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    billing_id INT NOT NULL,
    payment_date DATE NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    payment_status ENUM('Paid', 'Pending', 'Late') NOT NULL,
    FOREIGN KEY (billing_id) REFERENCES billing(id)
);