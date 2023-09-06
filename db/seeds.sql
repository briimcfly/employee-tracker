-- Seed for department
INSERT INTO department (name) VALUES 
('Human Resources'),
('Engineering'),
('Marketing');

-- Seed for role
INSERT INTO role (title, salary) VALUES
('HR Manager', 70000.00),
('Software Engineer', 90000.00),
('Marketing Specialist', 55000.00);

-- Seed for employee
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES
('John', 'Doe', NULL, 1),
('Jane', 'Smith', 1, 2),
('Bob', 'Johnson', 1, 3);