const router = require('express').Router();
const {db} = require('../../server.js');
const mysql = require('mysql2');
const inquirer = require('inquirer');

db.query('SHOW DATABASES', function (err,results) {
    console.log(results);
})

inquirer
.prompt([
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
    }
    // {
    //     //Ask user for the name
    //     type: 'input',
    //     message: 'ENTER THE ROLE DEPARTMENT',
    //     name: 'role_dept',
    // },
])
.then((response)=> {
    const {role_name, role_salary } = response;
    
    db.query('INSERT INTO role (title, salary) VALUES (?,?)',[role_name, role_salary], (err,results)=>{
        if (err) {
            console.error("Error inserting data:", err.message);
            return;
        }
        console.log("row inserted", results);
    })

}) 