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
            "Show all Departments",
            "Show all Employees",
            "I don't need anything else."
        ]
    }).then(function ({ task }) {
        switch(task) {
            case "Show all Departments":
                showAllDepartments();
                break;

            case "Show all Employees":
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
        FROM departments`
        
        connection.query(query, function (err, res) {
            if (err) throw err;
        
            console.table(res);        
            initialList();
    });
        
}

// ShowAllEmployees function
function showAllEmployees() {
    console.log('Here are all the employees I have:\n');

    let query =
        `SELECT CONCAT(emp.first_name," ",emp.last_name) AS "EmployeeName"
        FROM employees emp`
        
        connection.query(query, function (err, res) {
            if (err) throw err;
        
            console.table(res);        
            initialList();
    });
        
}