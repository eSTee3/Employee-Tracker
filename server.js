// Add dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

// Configure the MySQL connection properties
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '-_-eSTee3-_-',
    database: 'company_db'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected as user: ' + connection.threadId);
    initialList();
});

function initialList() {
    inquirer
    .prompt({
        type: 'list',
        name: 'task',
        message: 'Please choose an action:',
        choices: [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "I don't need anything else."
        ]
    }).then(function ({ task }) {
        switch(task) {
            case "View all Departments":
                showAllDepartments();
                break;
            
            case "View all Roles":
                showAllRoles();
                break;

            case "View all Employees":
                showAllEmployees();
                break;
           
            case "I don't need anything else.":
                connection.end();
                break;
        }
    })
}

// ShowAllDepartments function
function showAllDepartments() {
    console.log('Here are all the Departments I have:\n');

    let query =
        `SELECT name as "Department",
        id as "Department ID"
        FROM departments
        ;`
        
        connection.query(query, function (err, res) {
            if (err) throw err;
        
            console.table(res);        
            initialList();
    });
        
}

// ShowAllRoles function
function showAllRoles() {
    console.log('Here are all the Roles I have:\n');

    let query =
        `SELECT role.title AS "Job Title",
            role.id AS "Job ID",
            dept.name AS "Department",
            role.salary AS "Salary"
        FROM roles role
        JOIN departments dept
        ON role.department_id=dept.id
        ;`
        
        connection.query(query, function (err, res) {
            if (err) throw err;
        
            console.table(res);        
            initialList();
    });
        
}

// ShowAllEmployees function with a CASE statement that ensures "Self" is displayed for any managers (with NULL empty manager_id)
function showAllEmployees() {
    console.log('Here are all the employees I have:\n');

    let query =
        `SELECT emp.id AS "Employee ID",
            emp.first_name AS "First Name",
            emp.last_name AS "Last Name",
            role.title AS "Job Title",
            dept.name AS "Department",
            role.salary AS "Salary",
            CASE WHEN emp.manager_id IS NULL THEN "Self"
             ELSE CONCAT(man.first_name," ", man.last_name)
             END AS "Manager"
        FROM employees emp
        LEFT JOIN roles role
            ON emp.role_id=role.id
        LEFT JOIN departments dept
            ON role.department_id=dept.id
        LEFT JOIN employees man
            ON man.id=emp.manager_id
        GROUP BY emp.id,
            CASE WHEN emp.manager_id IS NULL THEN "Self"
            ELSE CONCAT(man.first_name," ",man.last_name)
            END
        ;`
        
        connection.query(query, function (err, res) {
            if (err) throw err;
        
            console.table(res);        
            initialList();
    });
        
}

// TODO: WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

// TODO: WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// TODO: WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// TODO: WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database