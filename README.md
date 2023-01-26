# Employee-Tracker
## Technologies Used
![GitHub top language](https://img.shields.io/github/languages/top/eSTee3/Employee-Tracker?color=green&logo=github&logoColor=green)
![GitHub language count](https://img.shields.io/github/languages/count/eSTee3/Employee-Tracker?color=green&logo=github&logoColor=green)

## Coding Badges
![alt text](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![alt text](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![alt text](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![alt text](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![alt text](https://img.shields.io/badge/Inquirer-package-red)
![alt text](https://img.shields.io/badge/console.table-package-red)

### Table of Contents
- [Technologies Used](#technologies-used)
- [Coding Badges](#coding-badges)
- [Description](#description)
- [Start Here](#start-here)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage Process](#application-usage-process)
  - [Demo Video](#application-demo-video)
- [Application Features](#application-features)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
- [License](#license)
- [How to Contribute](#how-to-contribute)

# Description
I present you with a CLI-based application that will allow the end user to enact changes and extract data from an employee-based set of MySQL-based Database Tables. [Back to Top](#technologies-used)

# Start Here!
## Prerequisites:
- MySQL Installed and functional on your local device
- Visual Studio Installed and functional on your local device
- Basic understanding of utilizing a terminal/CLI interface

[Back to Top](#technologies-used)
## Installation
1. Download or clone this repo to your local machine
2. Launch/open the folder within Visual Studio Code (VS Code)
3. Locate the `server.js` file and input your root MySQL password (`rootpassword`) into line 11 (making sure to leave the single quotes in place).
4. Save your changes to the `server.js` file
5. Open a terminal within VS Code
6. Within the terminal, type `mysql -u root -p` and hit enter
7. Enter your MySQL root password and hit enter again
8. Type `source db/schema.sql` and hit enter
9. Type `source db/seeds.sql` and hit enter
10. Type `exit` and hit enter
11. Type `npm i` to install all the required packages for this applicaiton and wait for it to complete.

[Back to Top](#technologies-used)

## Application Usage Process
1. Open a terminal on your device and navigate to the folder that the application resides in
3. Type `npm start` to start the application!

[Back to Top](#technologies-used)

## Demo Video
![Demonstration Video](./resources/Application%20Demo.gif)
[Back to Top](#technologies-used)
# Application Features
- View all departments within your organization
- View all roles within your organization
- View all employees within your organization
- Add a new Role
- Add a new Department
- Add a new Employee
- Update a current Employee's Role
- View the total budget for each Department

[Back to Top](#technologies-used)
## User Story
**AS A** business owner... **I WANT** to be able to view and manage the departments, roles, and employees in my company... **SO THAT** I can organize and plan my business.

[Back to Top](#technologies-used)
## Acceptance Criteria

```
GIVEN a command-line application that accepts user input:

WHEN I start the application
┗►THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

WHEN I choose to view all departments
┗►THEN I am presented with a formatted table showing department names and department ids

WHEN I choose to view all roles
┗►THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

WHEN I choose to view all employees
┗►THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

WHEN I choose to add a department
┗►THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role
┗►THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
┗►THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role
┗►THEN I am prompted to select an employee to update and their new role and this information is updated in the database

```
[Back to Top](#technologies-used)
# License

MIT License

Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Back to Top](#technologies-used)

---

## How to Contribute

[Contributor Covenant](https://www.contributor-covenant.org/)

[Back to Top](#technologies-used)
