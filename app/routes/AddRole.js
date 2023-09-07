const router = require('express').Router();
const {db} = require('../../server.js');
const mysql = require('mysql2');
const inquirer = require('inquirer');

function addRole(callback) {
    db.query('SELECT id, name FROM department', (err, departments) => {
        if (err) {
            console.error("Error getting results from department table: ", err.message);
            return;
        }
    
        const departmentChoices = departments.map(department => ({
            name: department.name,
            value: department.id
        }));
    
        inquirer.prompt([
        {
            //Ask user for the name
            type: 'input',
            message: 'ENTER THE ROLE NAME',
            name: 'role_name',
        },
        {
            //Ask user for the name
            type: 'input',
            message: 'ENTER THE ROLE SALARY',
            name: 'role_salary',
        },
        {
            //Ask user for the name
            type: 'list',
            message: 'ENTER THE ROLE DEPARTMENT',
            name: 'role_dept',
            choices: departmentChoices
        }
    ])
    .then((response)=> {
        const {role_name, role_salary, role_dept } = response;
        
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
            [role_name, role_salary, role_dept],
             (err)=>{
                if (err) {
                    reject(err);
                    return;
                }
    
                db.query(`
                SELECT
                    role.id, 
                    role.title, 
                    role.salary, 
                    department.name as department_name FROM role JOIN department ON role.department_id = department.id
                ORDER BY 
                    role.id 
                DESC
                `,(err,roles) => {
                    if(err) {
                        reject(err);
                        return;
                    }
    
                    console.log(`${role_name} succesfully added! \n`);
                    console.table(roles);
        
                    inquirer.prompt([
                        {
                            name: 'continue',
                            type: 'confirm',
                            message: 'WOULD YOU LIKE TO ADD ANOTHER ROLE?'
                        }
                    ]).then((continueResponse) => {
                        if (continueResponse.continue) {
                            addRole(callback);
                        } else {
                            callback(); 
                        }
                        });
                        resolve();
                    });
                });
            });
        });
    });
}

module.exports = addRole;






