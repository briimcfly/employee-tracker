const inquirer = require('inquirer');

const addRole = require('./routes/AddRole');
const addEmp = require('./routes/AddEmployee');
// const addDept = require('./routes/AddDepartment');
const updateEmp = require('./routes/UpdateEmployee');
const viewRole = require('./routes/ViewRole');
const viewDept = require('./routes/ViewDepartment');
const viewEmp = require('./routes/ViewEmployee');


function mainMenu() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'WHAT WOULD YOU LIKE TO DO?: ',
            name: 'main_menu',
            choices: [
                new inquirer.Separator('---View'),
                {
                    value: 'view_dept',
                    name: 'View All Departments'
                },
                {
                    value: 'view_roles',
                    name: 'View All Roles'
                },
                {
                    value: 'view_emp',
                    name: 'View All Employees'
                },
                new inquirer.Separator('---Add'),
                {
                    value: 'add_dept',
                    name: 'Add New Department'
                },
                {
                    value: 'add_role',
                    name: 'Add New Role'
                },
                {
                    value: 'add_emp',
                    name: 'Add New Employee'
                },
                new inquirer.Separator('---Update'),
                {
                    value: 'update_emp',
                    name: 'Update an Employee Role'
                }
            ]
        }
    ])
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
        // else if (response.main_menu = 'add_dept') {
        //     addDept(mainMenu);
        // } 
        else if (response.main_menu = 'add_emp') {
            addEmp(mainMenu);
        } 
        else {
            updateEmp(mainMenu);
        }
        
    }) 
}

mainMenu();
