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
            "Add a new Role",
            "Add a new Employee",
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

            case "Add a new Role":
                addNewRole();
                break;

            case "Add a new Employee":
                addNewEmployee();
                break;
           
            case "I don't need anything else.":
                console.log("\nApplication exited.  Have a great day!")
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

// Add a New Role
const addNewRole = () => {
    const sql = 'SELECT * FROM departments'
    connection.query(sql, (error, response) => {
        if (error) throw error;
        let deptNamesArray = [];
        response.forEach((department) => {deptNamesArray.push(department.department_name);});
        deptNamesArray.push('Create Department');
        inquirer
          .prompt([
            {
              name: 'departmentName',
              type: 'list',
              message: 'Select a Department for New Role: ',
              choices: deptNamesArray
            }
          ])
          .then((answer) => {
            if (answer.departmentName === 'Create Department') {
              this.addDepartment();
            } else {
              addRoleResume(answer);
            }
          });
  
        const addRoleResume = (departmentData) => {
          inquirer
            .prompt([
              {
                name: 'newRole',
                type: 'input',
                message: 'Provide a name for the New Role: ',
                validate: validate.validateString
              },
              {
                name: 'salary',
                type: 'input',
                message: 'Provide Salary for Role: ',
                validate: validate.validateSalary
              }
            ])
            .then((answer) => {
              let createdRole = answer.newRole;
              let departmentId;
  
              response.forEach((department) => {
                if (departmentData.departmentName === department.department_name) {departmentId = department.id;}
              });
  
              let sql =   `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
              let crit = [createdRole, answer.salary, departmentId];
  
              connection.promise().query(sql, crit, (error) => {
                if (error) throw error;

                initialList();
              });
            });
        };
      });
    };

// Add a new Employee
const addNewEmployee = () => {
    // Provides a list of roles in the system, for help with choosing a role
    var query =
          `SELECT role.id, role.title, role.salary 
            FROM roles role`
      
        connection.query(query, function (err, res) {
          if (err) throw err;
      
          const roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
          }));
    
          console.log("\n\n\n");  
          console.table(res);
          console.log("NOTE: Please reference the above table when selecting a role.\n")

          promptInsert(roleChoices);
        });
    }
    // Starts the question/answer process for creation of a new employee
    function promptInsert(roleChoices) {
    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "First Name: ",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Last Name: ",
      }
    ])
      .then(answer => {
      const crit = [answer.firstName, answer.lastName]
      const roleSql = `SELECT * FROM roles`;
      connection.query(roleSql, (error, data) => {
        if (error) throw error; 
        const roles = data.map(({ id, name }) => ({ name: name, value: id }));
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "Select Role: ",
                choices: roles
              }
            ])
        // Provides the list of Role ID's to choose from
            .then(roleChoice => {
            const role = roleChoice.role;
            crit.push(role);
            const managerSql =  `SELECT * FROM employees`;
            connection.query(managerSql, (error, data) => {
                if (error) throw error;
                const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                inquirer.prompt([
                {
                    type: 'list',
                    name: 'manager',
                    message: "Select Manager: ",
                    choices: managers
                }
                ])
                //   Insterst the new Employee into the employees table
                    .then(managerChoice => {
                      const manager = managerChoice.manager;
                      crit.push(manager);
                      const sql =   `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                      connection.query(sql, crit, (error) => {
                      if (error) throw error;
            console.log("\n ==> Employee added successfully <== \n");
  
            initialList();
                });
              });
            });
          });
       });
    });
};


// TODO: WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database