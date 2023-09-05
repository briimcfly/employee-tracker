const {readFile, writeFile} = require('fs');
const inquirer = require('inquirer');

inquirer
.prompt([
    {
        type: 'list',
        message: 'WHAT WOULD YOU LIKE TO DO?: ',
        name: 'test_input',
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
    if (response.test_input == 'add_role') {
        require('./routes/AddRole');
    } else {
        console.log('nope');
    }
}) 