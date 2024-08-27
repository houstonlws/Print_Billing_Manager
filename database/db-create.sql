USE print_billing_db;

CREATE TABLE auth (
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE, 
	password VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id INT UNIQUE,
    department_id INT,
	email VARCHAR(255) UNIQUE NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    phone VARCHAR(255),
    type VARCHAR(255),
    FOREIGN KEY (id) REFERENCES auth(id)
);

CREATE TABLE departments (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255)
);

CREATE TABLE printers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    serial_number VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    installation_date DATE NOT NULL,
    warranty_expiry_date DATE NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    mac_address VARCHAR(17) NOT NULL,
    firmware_version VARCHAR(255) NOT NULL
);
 
CREATE TABLE jobs (
	id INT AUTO_INCREMENT PRIMARY KEY,
    printer_id INT NOT NULL,
    department_id INT NOT NULL,
	date DATE NOT NULL,
    title VARCHAR(255) NOT NULL,
    pages INT NOT NULL,
    color_pages INT NOT NULL,
    black_and_white_pages INT NOT NULL
);

CREATE TABLE prices (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
	bw_price DECIMAL(10,2) NOT NULL,
    color_price DECIMAL(10,2) NOT NULL,
    paper_price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE maintenance_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    printer_id INT NOT NULL,
    department_id INT NOT NULL,
    request_date DATE NOT NULL,
    maintenance_type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(255) NOT NULL,
    resolved_date DATE,
    FOREIGN KEY (printer_id) REFERENCES printers(id)
);

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    maintenance_id INT,
    notification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (maintenance_id) REFERENCES maintenance_requests(id)
);

CREATE TABLE billing_periods(
	id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL
);

CREATE TABLE invoices (
	id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    bill_period_id VARCHAR(255) NOT NULL,
    price_profile_id INT NOT NULL,
    bw_charge DECIMAL(10,2) NOT NULL,
    color_charge DECIMAL(10,2) NOT NULL,
    paper_charge DECIMAL(10,2) NOT NULL,
    status ENUM('Paid', 'Pending', 'Late') DEFAULT 'Pending' NOT NULL,
    FOREIGN KEY (price_profile_id) REFERENCES prices(id)
);

CREATE TABLE bill_payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT NOT NULL,
    payment_date DATE NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
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

CREATE VIEW department_metrics AS 
	SELECT 
    metrics.id,
	printer_id ,
    total_pages_printed ,
    monthly_print_volume,
    total_print_jobs ,
    monthly_print_jobs ,
    toner_levels ,
    toner_usage_monthly,
    paper_levels,
    paper_usage_monthly,
    total_color_pages_printed,
    total_color_pages_last_billing,
    total_bw_pages_printed,
    total_bw_pages_last_billing ,
    department_id
    FROM metrics 
	JOIN printers 
    ON metrics.printer_id = printers.id;