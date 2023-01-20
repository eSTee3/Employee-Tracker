USE company_db;

INSTERT INTO department(name)
VALUES ('Information Technology'),
('Human Resources'),
('Sales Transaction Management'),
('Purchasing and Procurement'),
('Loss Prevention'),
('Shipping and Receiving');

INSTERT INTO role(title, salary, department_id)
VALUES ('IT Manager', 134340.23, 1),
('Reliability Engineer', 111150.87, 1),
('IT Director', 351520.54, 1),
('HR Manager', 121410.20, 2),
('HR Team Lead', 64133.29, 2),
('Product Manager', 112335.03, 3),
('Assistant Buyer', 74430.84, 4),
('3rd Shift LP Lead', 59214.97, 5),
('Corporate LP Guard', 41856.36, 5);

INSTERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Mr.', 'Krabs', 3, NULL),
('SpongeBob', 'Squarepants', 1, 2),
('Mr.', 'Krabs', 3, NULL),
