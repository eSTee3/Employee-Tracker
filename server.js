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
        pageSize: 12,
        name: 'task',
        message: 'Please choose an action:',
        choices: [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Add a new Role",
            "Add a new Department",
            "Add a new Employee",
            "Update an Employee's Role",
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
            
            case "Add a new Department":
                addNewDepartment();
                break;

            case "Add a new Employee":
                addNewEmployee();
                break;

            case "Update an Employee's Role":
                updateEmployeeRole();
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

    let query = `
        SELECT name as "Department",
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

    let query = `
        SELECT role.title AS "Job Title",
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

    let query =`
        SELECT emp.id AS "Employee ID",
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

const addNewDepartment = () => {
    // Starts the question/answer process for creation of a new department
    inquirer.prompt([
      {
        type: 'input',
        name: 'deptName',
        message:"Department Name:",
      }
    ])
      .then(answer => {
        let crit = [answer.deptName]
            let sql = `
                INSERT INTO departments (name)
                VALUES (?)
                `;
            connection.query(sql, crit, (error) => {
            if (error) throw error;

            // Validation message, confirming department has bee added
            console.log("\n ==> Department added successfully <== \n");
  
            initialList();
                });
            });

};


const addNewRole = () => {
    // Provides a list of roles in the system, for help with choosing a role
    var query = `
        SELECT dept.id,
            dept.name 
        FROM departments dept
        `;
      
        connection.query(query, function (err, res) {
          if (err) throw err;
      
          let deptChoices = res.map(({ id, name }) => ({
            value: id, name: `${name}`
          }));
    
          console.log("\n\n\n");  
          console.table(res);
          console.log("NOTE: Please reference the above table when selecting a Department.\n")

          promptRoles(deptChoices);
        });
    }
    // Starts the question/answer process for creation of a new employee
    function promptRoles(deptChoices) {
    inquirer.prompt([
      {
        type: 'input',
        name: 'roleName',
        message:"Role Name:",
      },
      {
        type: 'input',
        name: 'roleSalary',
        message:"Role's Salary:",
      }
    ])
      .then(answer => {
        let crit = [answer.roleName, answer.roleSalary]
        let deptSQL = `
            SELECT * FROM departments
            `;
      connection.query(deptSQL, (error, data) => {
        if (error) throw error; 
        let dept = data.map(({ id, name }) => ({ name: name, value: id }));
        inquirer.prompt([
              {
                type: 'list',
                pageSize: 12,
                name: 'dept',
                message:"Select Department:",
                choices: dept
              }
            ])
        // Provides the list of Role ID's to choose from
            .then(deptChoice => {
                let depts = deptChoice.dept;
            crit.push(depts);

        

            let sql =   `INSERT INTO roles (title, salary, department_id)
                        VALUES (?, ?, ?)`;
            connection.query(sql, crit, (error) => {
            if (error) throw error;

            // Validation message, confirming role has bee added
            console.log("\n ==> Role added successfully <== \n");
  
            initialList();
                });
            });
        });
    });
};



// Add a new Employee
const addNewEmployee = () => {
    // Provides a list of roles in the system, for help with choosing a role
    var query = `
        SELECT role.id,
            role.title,
            role.salary 
        FROM roles role
        `;
      
        connection.query(query, function (err, res) {
          if (err) throw err;
      
          let roleChoices = res.map(({ id, title, salary }) => ({
            value: id, title: `${title}`, salary: `${salary}`
          }));
    
        console.log("\n");  

          promptInsert(roleChoices);
        });
    }
    // Starts the question/answer process for creation of a new employee
    function promptInsert(roleChoices) {
    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message:"First Name:",
      },
      {
        type: 'input',
        name: 'lastName',
        message:"Last Name:",
      }
    ])
      .then(answer => {
        let crit = [answer.firstName, answer.lastName]
        let roleSql = `
            SELECT * FROM roles
            `;
      connection.query(roleSql, (error, res) => {
        if (error) throw error; 
        let roles = res.map(({ id, title }) => ({ name: title, value: id }));
        inquirer.prompt([
              {
                type: 'list',
                pageSize: 12,
                name: 'role',
                message:"Select Role:",
                choices: roles
              }
            ])

            .then(roleChoice => {
                let role = roleChoice.role;
            crit.push(role);
            let sql =  `
                SELECT * FROM employees
                `;
            connection.query(sql, (error, res) => {
                if (error) throw error;
                let managers = res.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
                inquirer.prompt([
                {
                    type: 'list',
                    pageSize: 12,
                    name: 'manager',
                    message:"Select Manager:",
                    choices: managers
                }
                ])
                //   Insterst the new Employee into the employees table
                    .then(managerChoice => {
                        let manager = managerChoice.manager;
                      crit.push(manager);
                      let sql =   `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                      connection.query(sql, crit, (error) => {
                      if (error) throw error;
            
            // Validation message, confirming employee has bee added
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

const updateEmployeeRole = () => {
    let sql0 = `
        SELECT employees.id,
            employees.first_name,
            employees.last_name,
            roles.id AS "role_id"
        FROM employees,
            roles,
            departments
        WHERE departments.id = roles.department_id
            AND roles.id = employees.role_id
        `;

    connection.query(sql0, (error, response) => {
      if (error) throw error;
      let employeeNamesArray = [];
      response.forEach((employee) => {
        employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);
    });

      let sql1 = `
        SELECT roles.id,
        roles.title
        FROM roles
        `;
      connection.query(sql1, (error, response) => {
        if (error) throw error;
        let rolesArray = [];
        response.forEach((role) => {rolesArray.push(role.title);});

        inquirer
          .prompt([
            {
              name: 'chosenEmployee',
              type: 'list',
              message: 'Choose Employee to update:',
              choices: employeeNamesArray
            },
            {
              name: 'chosenRole',
              type: 'list',
              pageSize: 12,
              message: 'Choose new Role:',
              choices: rolesArray
            }
          ])
          .then((answer) => {
            let newTitleId, employeeId;

            response.forEach((role) => {
              if (answer.chosenRole === role.title) {
                newTitleId = role.id;
              }
            });

            response.forEach((employee) => {
              if (
                answer.chosenEmployee ===
                `${employee.first_name} ${employee.last_name}`
              ) {
                employeeId = employee.id;
              }
            });

            let sql2 = `
                UPDATE employees
                SET employees.role_id = ?
                WHERE employees.id = ?
                `;
            connection.query(
                sql2,
              [newTitleId, employeeId],
              (error) => {
                if (error) throw error;

                // Validation message, confirming employee role has been updated
                console.log("\n ==> Employee Role updated successfully <== \n");


                initialList();
            }
        );
        });
    });
});
};