USE company_db;

INSERT INTO departments(name)
VALUES('Hospitality'),
('Food Service'),
('Cleaning Service');

INSERT INTO roles(title, salary, department_id)
VALUES('Manager', 89612.61, 1),
('Door Attendant', 51254.30, 1),
('Head Chef', 78558.44, 2),
('Sous Chef', 39714.20, 2),
('Technician', 44255.83, 3),
('Coordinator', 60122.05, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES('Gill', 'Bates', 1, NULL),
('Darnald', 'Sportsinegger', 2, 1),
('Boaty', 'McBoatface', 2, 1),
('Kneelahn', 'Crust', 3, NULL),
('Troll', 'Bridges', 4, 4),
('Gary', 'Pills', 4, 4),
('Marsha', 'Stewort', 5, NULL),
('Shy', 'Freeharry', 6, 7),
('Dough', 'Boyd', 6, 7);