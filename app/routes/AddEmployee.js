const router = require('express').Router();
const {db} = require('../../server.js');
const mysql = require('mysql2');
const inquirer = require('inquirer');

function addEmp(callback) {
    db.query(`
    SELECT
        id,
        title 
    FROM
        role
    `, (err, roles) => {
        if (err) {
            console.error("Error getting results from Role table: ", err.message);
            return;
        }
        
        const roleChoices = roles.map(role => ({
            name: role.title,
            value: role.id
        }));

        inquirer.prompt([
            {        
                //Ask User for First Name 
                type:'input',
                message:'ENTER FIRST NAME',
                name:'emp_fName'
            },
            {
                //Ask User for Last Name
                type:'input',
                message:'ENTER LAST NAME',
                name:'emp_lName'
            },
            {
                //Ask user for Employee Role
                type:'list',
                message: 'SELECT EMPLOYEE ROLE',
                name: 'emp_role',
                choices: roleChoices
            },
            {
                //Ask user if they want to link a manager
                type:'confirm',
                message:'DO YOU WANT TO LINK A MANAGER?',
                name:'linkManager'
            }
        ]).then(response => {
            //If the user wants to link a manager ... 
            if (response.linkManager) {
                //get employees from the database
                db.query(`
                SELECT 
                    id,
                    CONCAT(first_name, " ", last_name) AS employee_name
                FROM
                    employee
                `, (err,managers) => {
                    //error handling
                    if(err) {
                        console.error("Error getting results from Employee table: ", err.message);
                        return;
                    }
                    //Manager list
                    const managerChoices = managers.map(manager => ({
                        name: manager.employee_name,
                        value: manager.id
                    }));
                    //Ask user for Manager
                    inquirer.prompt([
                        {
                            type: 'list',
                            message: 'SELECT A MANAGER',
                            name: 'manager_id',
                            choices: managerChoices
                        }
                    ])
                    .then(managerResponse => {
                        //link responses from both prompts
                        const finalResponse = Object.assign({}, response, managerResponse);
                        console.log(finalResponse);

                        //write to DB
                        return new Promise((resolve, reject) => {                        
                        db.query(`
                        INSERT INTO employee
                            (first_name, last_name, manager_id, role_id)
                            VALUES (?,?,?,?)
                            `,[response.emp_fName,response.emp_lName, managerResponse.manager_id, response.emp_role],
                            (err)=>{
                                if (err){
                                    reject(err);
                                    return;
                                }

                                db.query(`
                                SELECT 
                                    e.id, 
                                    CONCAT(e.first_name, " ", e.last_name) AS employee_name, 
                                    role.title AS role_name, 
                                    CONCAT(m.first_name, " ", m.last_name) AS manager_name
                                FROM 
                                    employee e
                                JOIN 
                                    role ON e.role_id = role.id
                                LEFT JOIN 
                                    employee m ON e.manager_id = m.id
                                ORDER BY 
                                    e.id DESC
                            `, (err, employees) => {
                                if (err) {
                                    console.error("Error fetching data: ", err.message);
                                    return;
                                }
                                    console.log(`${response.emp_fName} ${response.emp_lName} successfully added! \n`);
                                    console.table(employees);
    
                                    inquirer.prompt([
                                        {
                                            name: 'continue',
                                            type: 'confirm',
                                            message: 'WOULD YOU LIKE TO ADD ANOTHER EMPLOYEE?'
                                        }
                                    ]).then((continueResponse) => {
                                        if (continueResponse.continue) {
                                            addEmp(callback);
                                        } else {
                                            callback(); 
                                        }
                                        });
                                        resolve();
                                });
                            })
                        })
                    })
                })
            } else {
                //write to DB
                return new Promise((resolve, reject) => {                        
                    db.query(`
                    INSERT INTO employee
                        (first_name, last_name, role_id)
                        VALUES (?,?,?)
                        `,[response.emp_fName,response.emp_lName, response.emp_role],
                        (err)=>{
                            if (err){
                                reject(err);
                                return;
                            }

                            db.query(`
                            SELECT 
                                e.id, 
                                CONCAT(e.first_name, " ", e.last_name) AS employee_name, 
                                role.title AS role_name, 
                                CONCAT(m.first_name, " ", m.last_name) AS manager_name
                            FROM 
                                employee e
                            JOIN 
                                role ON e.role_id = role.id
                            LEFT JOIN 
                                employee m ON e.manager_id = m.id
                            ORDER BY 
                                e.id DESC
                        `, (err, employees) => {
                            if (err) {
                                console.error("Error fetching data: ", err.message);
                                return;
                            }
                                console.log(`${response.emp_fName} ${response.emp_lName} successfully added! \n`);
                                console.table(employees);

                                inquirer.prompt([
                                    {
                                        name: 'continue',
                                        type: 'confirm',
                                        message: 'WOULD YOU LIKE TO ADD ANOTHER EMPLOYEE?'
                                    }
                                ]).then((continueResponse) => {
                                    if (continueResponse.continue) {
                                        addEmp(callback);
                                    } else {
                                        callback(); 
                                    }
                                    });
                                    resolve();
                            });
                        })
                    })
            }
        })
    })
}

module.exports = addEmp;