CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    position ENUM('junior', 'senior', 'manager') NOT NULL,
    status ENUM('active', 'inactive', 'on_leave') DEFAULT 'active',
    hire_date DATE NOT NULL
);
