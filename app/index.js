const {readFile, writeFile} = require('fs');
const inquirer = require('inquirer');

const addRole = require('./routes/AddRole');
// const addEmp = require('./routes/AddEmployee');
// const addDept = require('./routes/AddDepartment');
// const updateEmp = require('./routes/UpdateEmployee');
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
                {
                    value: 'view_dept',
                    name: 'view all departments'
                },
                {
                    value: 'view_roles',
                    name: 'view all roles'
                },
                {
                    value: 'view_emp',
                    name: 'view all employees'
                },
                {
                    value: 'add_dept',
                    name: 'add a department'
                },
                {
                    value: 'add_role',
                    name: 'add a role'
                },
                {
                    value: 'add_emp',
                    name: 'add an employee'
                },
                {
                    value: 'update_emp',
                    name: 'update an employee'
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
        // else if (response.main_menu = 'add_emp') {
        //     addEmp(mainMenu);
        // } 
        // else {
        //     updateEmp(mainMenu);
        // }
        
    }) 
}

mainMenu();
