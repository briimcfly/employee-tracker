const inquirer = require('inquirer');

//Main Menu Options
const addRole = require('./routes/AddRole');
const addEmp = require('./routes/AddEmployee');
const addDept = require('./routes/AddDepartment');
const updateEmp = require('./routes/UpdateEmployee');
const viewRole = require('./routes/ViewRole');
const viewDept = require('./routes/ViewDepartment');
const viewEmp = require('./routes/ViewEmployee');


//Main Menu Function 
function mainMenu() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'WHAT WOULD YOU LIKE TO DO?: ',
            name: 'main_menu',
            choices: [
                //---------------------Separator  
                new inquirer.Separator('---View'),
                //View Departments 
                {
                    value: 'view_dept',
                    name: 'View All Departments'
                },
                //View Roles 
                {
                    value: 'view_roles',
                    name: 'View All Roles'
                },
                //View Employees 
                {
                    value: 'view_emp',
                    name: 'View All Employees'
                },
                //---------------------Separator 
                new inquirer.Separator('---Add'),
                //Add Departments 
                {
                    value: 'add_dept',
                    name: 'Add New Department'
                },
                //Add Roles 
                {
                    value: 'add_role',
                    name: 'Add New Role'
                },
                //Add Employees
                {
                    value: 'add_emp',
                    name: 'Add New Employee'
                },
                //---------------------Separator 
                new inquirer.Separator('---Update'),
                //Update Employee Role 
                {
                    value: 'update_emp',
                    name: 'Update an Employee Role'
                }
            ]
        }
    ])
    //Main Menu Option Handling 
    .then((response) => {
        if (response.main_menu == 'add_role') {
            addRole(mainMenu);
        } 
        else if (response.main_menu == 'view_dept') {
            viewDept(mainMenu);
        } 
        else if (response.main_menu == 'view_roles') {
            viewRole(mainMenu);
        } 
        else if (response.main_menu == 'view_emp') {
            viewEmp(mainMenu);
        } 
        else if (response.main_menu == 'add_dept') {
            addDept(mainMenu);
        } 
        else if (response.main_menu == 'add_emp') {
            addEmp(mainMenu);
        } 
        else {
            updateEmp(mainMenu);
        }
        
    }) 
}

mainMenu();
