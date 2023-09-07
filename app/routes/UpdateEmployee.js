const router = require('express').Router();
const {db} = require('../../server.js');
const mysql = require('mysql2');
const inquirer = require('inquirer');

function updateEmp(callback){
    db.query(`
    SELECT
        CONCAT(first_name," ",last_name) AS employee_name,
        role.title as role_name,
        employee.id AS employee_id
    FROM 
        employee JOIN role ON employee.role_id = role.id
    `, (err, employees) => {
        if(err) {
            console.log(err);
        }
        const employeeChoices = employees.map(employee => ({
            name: `${employee.employee_name} || ${employee.role_name} `,
            value: employee.employee_id
        }));

        inquirer.prompt([
            {
                //Ask user to Select an Employee
                type:'list',
                message:'SELECT AN EMPLOYEE',
                name:'emp_name',
                choices: employeeChoices
            }
        ]).then(response => {
            const selectedEmpId = response.emp_name;

            db.query(`
            SELECT
                id,
                title
            FROM
                role
            `, (err, roles) => {
                if(err) {
                    console.log(err);
                }
                const roleChoices = roles.map(role => ({
                    name: role.title,
                    value: role.id
                }));
                inquirer.prompt([
                    {
                        type:'list',
                        message:'SELECT A NEW ROLE FOR THIS EMPLOYEE',
                        name:'new_role',
                        choices:roleChoices
                    }
                ]).then((newRoleResponse) => {
                    const newRole = newRoleResponse.new_role;

                    db.query(`
                    UPDATE 
                        employee 
                    SET 
                        role_id = ?
                    WHERE
                        id = ?
                    `, [newRole, selectedEmpId],
                    (err) => {
                        if (err) {
                            console.log(err)
                        }else {
                            db.query('SELECT * from employee', (err, employees) => {
                                if (err) {
                                    console.error("Error getting results from Employee table: ", err.message);
                                    return;
                                }
                                console.log("Succesfully Updated")
                                console.table(employees); 

                                inquirer.prompt([
                                    {
                                        name: 'continue',
                                        type: 'confirm',
                                        message: 'WOULD YOU LIKE TO UPDATE ANOTHER EMPLOYEE ROLE?'
                                    }
                                ]).then((continueResponse) => {
                                    if (continueResponse.continue) {
                                        updateEmp(callback);
                                    } else {
                                        callback(); 
                                    }
                                    });
                            })
                                
                        }
                    })
                })
            })
        })
    })
}

module.exports = updateEmp;