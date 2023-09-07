const router = require('express').Router();
const {db} = require('../../server.js');
const mysql = require('mysql2');
const inquirer = require('inquirer');

function addDept(callback){
    inquirer.prompt([
        {
            type:'input',
            message:'ENTER DEPARTMENT NAME',
            name:'dept_name'
        }
    ])
    .then(response => {
        const deptName = response.dept_name;

        db.query(`
        INSERT INTO
            department (name)
        VALUES
            (?)
        `,[deptName],
        (err) => {
            if(err){
                console.log(err);
            }

            db.query(`SELECT * FROM department`, (err, departments) => {
                if(err){
                    console.log(err);
                }
                console.log(`${deptName} succesfully added! \n`);
                console.table(departments);
    
                inquirer.prompt([
                    {
                        name: 'continue',
                        type: 'confirm',
                        message: 'WOULD YOU LIKE TO ADD ANOTHER DEPARTMENT?'
                    }
                ]).then((continueResponse) => {
                    if (continueResponse.continue) {
                        addDept(callback);
                    } else {
                        callback(); 
                    }
                });
            })

        }
        
        )
    })
}

module.exports = addDept;