const router = require('express').Router();
const {db} = require('../../server.js');
const mysql = require('mysql2');
const inquirer = require('inquirer');

function updateEmp(){
    db.query(`
    SELECT
        CONCAT(first_name, last_name) AS employee_name,
        role.title as role_name FROM employee JOIN role ON employee.role_id = role.id
    `, (err) => {
        if(err) {
            console.log(err);
        }
    })
}

module.exports = updateEmp;